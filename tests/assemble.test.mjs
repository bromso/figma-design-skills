import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { assemble, validate } from '../scripts/assemble.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

/** Creates a fresh temp project with src/skills and src/partials dirs. Caller must rm(dir). */
async function makeTempProject() {
  const dir = await mkdtemp(path.join(tmpdir(), 'assemble-test-'));
  const srcDir = path.join(dir, 'src');
  const distDir = path.join(dir, 'dist');
  await mkdir(path.join(srcDir, 'skills'), { recursive: true });
  await mkdir(path.join(srcDir, 'partials'), { recursive: true });
  return { dir, srcDir, distDir };
}

function frontmatter(name, description = 'A test skill.') {
  return `---\nname: ${name}\ndescription: ${description}\n---\n`;
}

test('expands a single include', async () => {
  const { dir, srcDir, distDir } = await makeTempProject();
  try {
    await writeFile(path.join(srcDir, 'partials', 'p.md'), 'P');
    const body = 'A\n<!-- include: partials/p.md -->\nB';
    await writeFile(path.join(srcDir, 'skills', 'foo.md'), frontmatter('foo') + body);

    const config = { maxBytes: 16000, published: ['foo'], pending: [] };
    const { written, errors } = await assemble(srcDir, distDir, config);

    assert.deepEqual(errors, []);
    assert.equal(written.length, 1);
    const out = await readFile(written[0], 'utf8');
    assert.ok(out.includes('A\nP\nB'), `expected expanded body, got: ${out}`);
    assert.ok(!out.includes('<!-- include'), 'include directive should be gone');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('expands nested includes', async () => {
  const { dir, srcDir, distDir } = await makeTempProject();
  try {
    await writeFile(path.join(srcDir, 'partials', 'q.md'), 'Q');
    await writeFile(path.join(srcDir, 'partials', 'p.md'), '<!-- include: partials/q.md -->');
    const body = 'Start\n<!-- include: partials/p.md -->\nEnd';
    await writeFile(path.join(srcDir, 'skills', 'foo.md'), frontmatter('foo') + body);

    const config = { maxBytes: 16000, published: ['foo'], pending: [] };
    const { written, errors } = await assemble(srcDir, distDir, config);

    assert.deepEqual(errors, []);
    assert.equal(written.length, 1);
    const out = await readFile(written[0], 'utf8');
    assert.ok(out.includes('Start\nQ\nEnd'), `expected both bodies present, got: ${out}`);
    assert.ok(!out.includes('<!-- include'), 'include directives should be gone');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('errors on missing include', async () => {
  const { dir, srcDir, distDir } = await makeTempProject();
  try {
    const body = 'A\n<!-- include: partials/missing.md -->\nB';
    await writeFile(path.join(srcDir, 'skills', 'foo.md'), frontmatter('foo') + body);

    const config = { maxBytes: 16000, published: ['foo'], pending: [] };
    const { written, errors } = await assemble(srcDir, distDir, config);

    assert.equal(written.length, 0);
    assert.ok(errors.length >= 1);
    assert.match(errors[0], /partials\/missing\.md/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('detects circular includes', async () => {
  const { dir, srcDir, distDir } = await makeTempProject();
  try {
    await writeFile(path.join(srcDir, 'partials', 'a.md'), '<!-- include: partials/b.md -->');
    await writeFile(path.join(srcDir, 'partials', 'b.md'), '<!-- include: partials/a.md -->');
    const body = '<!-- include: partials/a.md -->';
    await writeFile(path.join(srcDir, 'skills', 'foo.md'), frontmatter('foo') + body);

    const config = { maxBytes: 16000, published: ['foo'], pending: [] };
    const { written, errors } = await assemble(srcDir, distDir, config);

    assert.equal(written.length, 0);
    assert.ok(errors.length >= 1);
    assert.match(errors[0], /partials\/a\.md/);
    assert.match(errors[0], /partials\/b\.md/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('validate: frontmatter must have only name and description', () => {
  const md = '---\nname: foo\ndescription: Something.\nmodel: claude\n---\nBody text.';
  const errors = validate(md, { name: 'foo', maxBytes: 16000 });
  assert.ok(errors.length > 0);
  assert.ok(errors.some((e) => e.includes('model')), `expected an error naming "model", got: ${errors}`);
});

test('validate: name must equal basename', () => {
  const md = '---\nname: foo\ndescription: Something.\n---\nBody.';
  const errors = validate(md, { name: 'bar', maxBytes: 16000 });
  assert.ok(errors.length > 0);
  assert.ok(
    errors.some((e) => e.includes('foo') && e.includes('bar')),
    `expected an error naming both "foo" and "bar", got: ${errors}`,
  );
});

test('validate: description <= 1024 chars', () => {
  const longDescription = 'a'.repeat(1025);
  const md = `---\nname: foo\ndescription: ${longDescription}\n---\nBody.`;
  const errors = validate(md, { name: 'foo', maxBytes: 16000 });
  assert.ok(errors.length > 0);
  assert.ok(errors.some((e) => e.includes('1024')), `expected an error naming 1024, got: ${errors}`);
});

test('validate: file <= maxBytes', () => {
  const body = 'x'.repeat(200);
  const md = `---\nname: foo\ndescription: Short.\n---\n${body}`;
  const actualBytes = Buffer.byteLength(md, 'utf8');
  const errors = validate(md, { name: 'foo', maxBytes: 100 });
  assert.ok(errors.length > 0);
  assert.ok(
    errors.some((e) => e.includes('foo') && e.includes(String(actualBytes)) && e.includes('100')),
    `expected an error naming "foo", ${actualBytes}, and 100, got: ${errors}`,
  );
});

test('validate: rejects cross-skill loading phrases', () => {
  const loadMd = '---\nname: foo\ndescription: Short.\n---\nPlease load the skill before continuing.';
  const invokeMd = '---\nname: foo\ndescription: Short.\n---\nYou should Invoke The Skill now.';
  const cleanMd = '---\nname: foo\ndescription: Short.\n---\nThis is a perfectly normal body.';

  assert.ok(validate(loadMd, { name: 'foo', maxBytes: 16000 }).length > 0);
  assert.ok(validate(invokeMd, { name: 'foo', maxBytes: 16000 }).length > 0);
  assert.deepEqual(validate(cleanMd, { name: 'foo', maxBytes: 16000 }), []);
});

test('pending skills go to dist/pending', async () => {
  const { dir, srcDir, distDir } = await makeTempProject();
  try {
    await writeFile(path.join(srcDir, 'skills', 'foo.md'), frontmatter('foo') + 'Body.');

    const config = { maxBytes: 16000, published: [], pending: ['foo'] };
    const { written, errors } = await assemble(srcDir, distDir, config);

    assert.deepEqual(errors, []);
    assert.equal(written.length, 1);
    assert.equal(written[0], path.join(distDir, 'pending', 'foo.md'));
    const out = await readFile(written[0], 'utf8');
    assert.ok(out.includes('Body.'));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('cli exits 1 on errors', async () => {
  const { dir, srcDir, distDir } = await makeTempProject();
  try {
    // Invalid: extra frontmatter key triggers a validation error.
    await writeFile(
      path.join(srcDir, 'skills', 'broken.md'),
      '---\nname: broken\ndescription: Bad skill.\nmodel: claude\n---\nBody.',
    );

    const result = spawnSync(process.execPath, [path.join(repoRoot, 'scripts', 'assemble.mjs'), srcDir, distDir], {
      cwd: repoRoot,
      encoding: 'utf8',
    });

    assert.equal(result.status, 1);
    assert.ok(result.stderr.length > 0 || result.stdout.length > 0);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
