import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scenariosDir = path.join(__dirname, 'scenarios');

/** The thirteen scenario names: the twelve fixed by the task-11 brief, plus brief-continue. */
const SCENARIO_NAMES = [
  'empty-file-project',
  'library-file-project',
  'small-change',
  'no-spec',
  'wrong-status',
  'lean-project',
  'no-library',
  'motion-off',
  'standalone-tokens',
  'standalone-component',
  'standalone-view',
  'review-only',
  'brief-continue',
];

/** Exact headings every scenario file must contain, in this order. */
const REQUIRED_HEADINGS = [
  '## Prompt',
  '## File setup',
  '## Budget mode',
  '## Expected',
  '## Baseline (without skill)',
  '## Result (with skill)',
  '## Credits used',
];

/** Scenarios whose Baseline section records a real baseline run, not "not recorded". */
const BASELINE_REQUIRED = new Set(['empty-file-project', 'small-change', 'library-file-project']);

test('tests/scenarios contains exactly the thirteen fixed scenario files', async () => {
  const entries = await readdir(scenariosDir);
  const mdFiles = entries.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
  assert.deepEqual(
    [...mdFiles].sort(),
    [...SCENARIO_NAMES].sort(),
    `expected exactly the thirteen fixed scenario files, found: ${mdFiles.join(', ')}`,
  );
});

for (const name of SCENARIO_NAMES) {
  test(`scenario "${name}" has all seven required headings in order`, async () => {
    const filePath = path.join(scenariosDir, `${name}.md`);
    const content = await readFile(filePath, 'utf8');

    let searchFrom = 0;
    for (const heading of REQUIRED_HEADINGS) {
      const index = content.indexOf(heading, searchFrom);
      assert.ok(index !== -1, `${name}: missing or out-of-order heading "${heading}"`);
      searchFrom = index + heading.length;
    }
  });

  test(`scenario "${name}" has non-empty Prompt, File setup, Budget mode, and Expected`, async () => {
    const filePath = path.join(scenariosDir, `${name}.md`);
    const content = await readFile(filePath, 'utf8');
    const sections = sectionsOf(content);

    for (const heading of ['## Prompt', '## File setup', '## Budget mode', '## Expected']) {
      assert.ok(sections[heading]?.trim().length > 0, `${name}: section "${heading}" must not be empty`);
    }
  });

  test(`scenario "${name}" leaves Result and Credits used empty`, async () => {
    const filePath = path.join(scenariosDir, `${name}.md`);
    const content = await readFile(filePath, 'utf8');
    const sections = sectionsOf(content);

    assert.equal(sections['## Result (with skill)']?.trim(), '', `${name}: "## Result (with skill)" must be empty`);
    assert.equal(sections['## Credits used']?.trim(), '', `${name}: "## Credits used" must be empty`);
  });

  test(`scenario "${name}" marks Baseline correctly`, async () => {
    const filePath = path.join(scenariosDir, `${name}.md`);
    const content = await readFile(filePath, 'utf8');
    const sections = sectionsOf(content);
    const baseline = sections['## Baseline (without skill)']?.trim() ?? '';

    if (BASELINE_REQUIRED.has(name)) {
      assert.equal(baseline, '', `${name}: Baseline is required for this scenario, so it must be left empty for the tester to fill, not pre-filled`);
    } else {
      assert.equal(baseline, 'not recorded', `${name}: Baseline must read exactly "not recorded"`);
    }
  });
}

/** Splits markdown into a map of heading -> body text (up to the next heading). */
function sectionsOf(content) {
  const lines = content.split('\n');
  const sections = {};
  let currentHeading = null;
  let buffer = [];
  for (const line of lines) {
    if (REQUIRED_HEADINGS.includes(line.trim())) {
      if (currentHeading) sections[currentHeading] = buffer.join('\n');
      currentHeading = line.trim();
      buffer = [];
    } else if (currentHeading) {
      buffer.push(line);
    }
  }
  if (currentHeading) sections[currentHeading] = buffer.join('\n');
  return sections;
}

test('tests/README.md exists with the Probes, Tester access, How to run a scenario, and What to record sections', async () => {
  const readmePath = path.join(__dirname, 'README.md');
  const content = await readFile(readmePath, 'utf8');

  const required = [
    '## Probes',
    '### Probe 1: size limit',
    '### Probe 2: Specs',
    '### Probe 3: instruction persistence',
    '## Tester access',
    '## How to run a scenario',
    '## What to record',
  ];
  let searchFrom = 0;
  for (const heading of required) {
    const index = content.indexOf(heading, searchFrom);
    assert.ok(index !== -1, `tests/README.md: missing or out-of-order heading "${heading}"`);
    searchFrom = index + heading.length;
  }
});
