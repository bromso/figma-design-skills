#!/usr/bin/env node
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const INCLUDE_RE = /^<!-- include: (.+) -->$/;
const FORBIDDEN_PHRASES = ['load the skill', 'invoke the skill'];

/**
 * Splits markdown into frontmatter (an object of string key/value pairs, or
 * null if no valid "---" fenced block is present) and the remaining body.
 * Frontmatter is parsed by hand: `key: value` lines, no YAML library.
 */
function parseFrontmatter(markdown) {
  const lines = markdown.split('\n');
  if (lines[0] !== '---') {
    return { frontmatter: null, body: markdown };
  }
  const closingIndex = lines.indexOf('---', 1);
  if (closingIndex === -1) {
    return { frontmatter: null, body: markdown };
  }
  const frontmatter = {};
  for (const line of lines.slice(1, closingIndex)) {
    if (!line.trim()) continue;
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    frontmatter[key] = value;
  }
  const body = lines.slice(closingIndex + 1).join('\n');
  return { frontmatter, body };
}

/**
 * Recursively expands `<!-- include: path -->` directives, where path is
 * relative to srcDir. Throws on a missing file or a circular include,
 * naming the chain of include paths involved.
 */
async function expandIncludes(markdown, srcDir, chain) {
  const lines = markdown.split('\n');
  const outputLines = [];
  for (const line of lines) {
    const match = line.match(INCLUDE_RE);
    if (!match) {
      outputLines.push(line);
      continue;
    }
    const includePath = match[1].trim();
    if (chain.includes(includePath)) {
      throw new Error(`Circular include detected: ${[...chain, includePath].join(' -> ')}`);
    }
    let includedContent;
    try {
      includedContent = await readFile(path.join(srcDir, includePath), 'utf8');
    } catch {
      throw new Error(`Include not found: ${includePath}`);
    }
    const expanded = await expandIncludes(includedContent, srcDir, [...chain, includePath]);
    outputLines.push(expanded);
  }
  return outputLines.join('\n');
}

/**
 * Validates assembled skill markdown against the format rules. Returns an
 * array of error strings; empty means valid.
 */
export function validate(markdown, { name, maxBytes }) {
  const errors = [];
  const { frontmatter, body } = parseFrontmatter(markdown);

  if (!frontmatter) {
    errors.push('Missing or malformed frontmatter (expected "---" fences)');
  } else {
    const keys = Object.keys(frontmatter);
    const expectedKeys = ['name', 'description'];
    const hasExactKeys = keys.length === expectedKeys.length && expectedKeys.every((k) => keys.includes(k));
    if (!hasExactKeys) {
      errors.push(
        `Frontmatter must have exactly the keys "name" and "description", found: ${keys.join(', ') || '(none)'}`,
      );
    }
    if (frontmatter.name !== undefined && frontmatter.name !== name) {
      errors.push(`Frontmatter name "${frontmatter.name}" does not match expected name "${name}"`);
    }
    if (frontmatter.description !== undefined && frontmatter.description.length > 1024) {
      errors.push(
        `Frontmatter description is ${frontmatter.description.length} characters, exceeding the 1024 character limit`,
      );
    }
  }

  const byteLength = Buffer.byteLength(markdown, 'utf8');
  if (byteLength > maxBytes) {
    errors.push(`File "${name}" is ${byteLength} bytes, exceeding the maxBytes limit of ${maxBytes} bytes`);
  }

  const lowerBody = body.toLowerCase();
  if (FORBIDDEN_PHRASES.some((phrase) => lowerBody.includes(phrase))) {
    errors.push('Body contains a cross-skill loading phrase ("load the skill" or "invoke the skill")');
  }

  return errors;
}

/**
 * Reads every src/skills/*.md file, expands its includes, validates the
 * result, and writes valid output to dist/<name>.md (or dist/pending/<name>.md
 * when name is in config.pending). Never writes a file that failed validation.
 */
export async function assemble(srcDir, distDir, config) {
  const written = [];
  const errors = [];
  const skillsDir = path.join(srcDir, 'skills');

  let entries;
  try {
    entries = await readdir(skillsDir);
  } catch {
    entries = [];
  }
  const files = entries.filter((f) => f.endsWith('.md')).sort();

  for (const file of files) {
    const name = path.basename(file, '.md');
    const raw = await readFile(path.join(skillsDir, file), 'utf8');

    let expanded;
    try {
      expanded = await expandIncludes(raw, srcDir, []);
    } catch (err) {
      errors.push(`${name}: ${err.message}`);
      continue;
    }

    const validationErrors = validate(expanded, { name, maxBytes: config.maxBytes });
    if (validationErrors.length > 0) {
      for (const error of validationErrors) {
        errors.push(`${name}: ${error}`);
      }
      continue;
    }

    const outDir = config.pending.includes(name) ? path.join(distDir, 'pending') : distDir;
    const outPath = path.join(outDir, `${name}.md`);
    await mkdir(outDir, { recursive: true });
    await writeFile(outPath, expanded, 'utf8');
    written.push(outPath);
  }

  return { written, errors };
}

async function main() {
  const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
  const [srcArg, distArg] = process.argv.slice(2);
  const srcDir = srcArg ? path.resolve(process.cwd(), srcArg) : path.join(repoRoot, 'src');
  const distDir = distArg ? path.resolve(process.cwd(), distArg) : path.join(repoRoot, 'dist');

  const config = JSON.parse(await readFile(path.join(repoRoot, 'skills.config.json'), 'utf8'));
  const { written, errors } = await assemble(srcDir, distDir, config);

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(error);
    }
    process.exitCode = 1;
  } else {
    console.log(`Assembled ${written.length} skill(s).`);
  }
}

const isMainModule = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMainModule) {
  main();
}
