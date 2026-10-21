import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { assemble, validate } from '../scripts/assemble.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');

const config = JSON.parse(await readFile(path.join(repoRoot, 'skills.config.json'), 'utf8'));

/**
 * Required headings per assembled skill, keyed by skill name. A plain object
 * so later tasks can add a row per skill as its content is written, without
 * touching the test logic below. A skill with no row here gets no heading
 * assertions (beyond the ones every skill must satisfy, checked separately).
 */
const REQUIRED_HEADINGS = {
  'design-brief': [
    '## Budget modes',
    '## The Spec',
    '## If there is no Spec',
    '## Status',
    '## Discovery',
    '## Before you finish',
    '## Visual directions',
    '## Size the work',
    '## Interview',
    '## Play it back',
    '## Write the Spec',
    '## Approval gate',
  ],
  'design-plan': [
    '## Budget modes',
    '## The Spec',
    '## If there is no Spec',
    '## Status',
    '## Before you finish',
    '## Refuse unless Approved',
    '## Write the Plan',
    '## Split for budget',
  ],
  'design-build': [
    '## Budget modes',
    '## The Spec',
    '## If there is no Spec',
    '## Status',
    '## Before you finish',
    '## Tokens rules',
    '## Components rules',
    '## Views rules',
    '## Motion rules',
    '## Anti-generic rubric',
  ],
  'design-review': [
    '## Budget modes',
    '## The Spec',
    '## If there is no Spec',
    '## Status',
    '## Before you finish',
    '## Anti-generic rubric',
  ],
  'build-tokens': ['## Discovery', '## Budget modes', '## Before you finish', '## Tokens rules', '### Procedure'],
  'build-components': [
    '## Discovery',
    '## Budget modes',
    '## Before you finish',
    '## Components rules',
    '### Procedure',
  ],
  'build-views': ['## Discovery', '## Budget modes', '## Before you finish', '## Views rules', '### Procedure'],
  'add-motion': ['## Discovery', '## Budget modes', '## Before you finish', '## Motion rules', '### Procedure'],
  'add-prototype': [
    '## Discovery',
    '## Budget modes',
    '## Before you finish',
    '## Prototype rules',
    'Pending: the Figma agent does not support prototyping and interactions yet.',
  ],
};

/** Terms the medium (the Figma agent) must never see, per the spec's constraints. */
const FORBIDDEN_TERMS = ['Claude Code', 'MCP', 'Plugin API'];

let tempDir;
let distDir;
let result;

before(async () => {
  tempDir = await mkdtemp(path.join(tmpdir(), 'dist-test-'));
  distDir = path.join(tempDir, 'dist');
  result = await assemble(srcDir, distDir, config);
});

after(async () => {
  await rm(tempDir, { recursive: true, force: true });
});

test('every configured skill (published and pending) produces a written file', () => {
  const allNames = [...config.published, ...config.pending];
  for (const name of allNames) {
    const expectedPath = config.pending.includes(name)
      ? path.join(distDir, 'pending', `${name}.md`)
      : path.join(distDir, `${name}.md`);
    assert.ok(
      result.written.includes(expectedPath),
      `expected a written file for "${name}" at ${expectedPath}; ` +
        `assemble errors: ${result.errors.join('; ') || '(none)'}`,
    );
  }
});

test('every written skill has valid frontmatter, stays within maxBytes, and avoids cross-skill phrasing', async () => {
  assert.ok(result.written.length >= 0); // sanity: suite runs even with zero skills written
  for (const filePath of result.written) {
    const name = path.basename(filePath, '.md');
    const content = await readFile(filePath, 'utf8');
    const errors = validate(content, { name, maxBytes: config.maxBytes });
    assert.deepEqual(errors, [], `${name}: ${errors.join('; ')}`);
  }
});

test('every written skill contains its required headings', async () => {
  for (const filePath of result.written) {
    const name = path.basename(filePath, '.md');
    const content = await readFile(filePath, 'utf8');
    const requiredHeadings = REQUIRED_HEADINGS[name] ?? [];
    for (const heading of requiredHeadings) {
      assert.ok(content.includes(heading), `${name}: missing required heading "${heading}"`);
    }
  }
});

test('no written skill mentions Claude Code, MCP, or the Plugin API', async () => {
  for (const filePath of result.written) {
    const name = path.basename(filePath, '.md');
    const content = await readFile(filePath, 'utf8');
    for (const term of FORBIDDEN_TERMS) {
      assert.ok(!content.includes(term), `${name}: body mentions forbidden term "${term}"`);
    }
  }
});
