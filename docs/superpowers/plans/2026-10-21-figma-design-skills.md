# Figma Design Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship nine single-file Figma agent skills (four process, four domain, one pending) assembled from shared partials, with an assembler, content checks, test scenarios, and Community listing copy.

**Architecture:** `src/partials/` holds the shared rule blocks; `src/skills/` holds one template per skill that pulls partials in with an include directive; `scripts/assemble.mjs` writes the single-file skills to `dist/` and refuses any file that breaks the format or size rules. The skills are prose for the Figma agent, so the automated tests cover the assembler and the structure of the output; behaviour is proven by scenarios a person runs in Figma and records.

**Tech Stack:** Node 20+, ES modules, `node:test` (no dependencies). Markdown with Agent Skills frontmatter.

**Spec:** `docs/superpowers/specs/2026-10-21-figma-design-skills-design.md`

## Global Constraints

- One Markdown file per skill. Frontmatter has exactly two keys: `name`, `description`. No other top-level keys. No `references/`, `scripts/`, `assets/`.
- `name` is the slash command, kebab-case, equal to the file basename. Names: `design-brief`, `design-plan`, `design-build`, `design-review`, `build-tokens`, `build-components`, `build-views`, `add-motion`, `add-prototype` (pending, not published).
- `description` is third person, ≤ 1024 characters, says what the skill does and when to use it.
- Every assembled file must be ≤ `maxBytes` from `skills.config.json`. Provisional value 12000 until Task 2 records the real limit.
- One skill runs per prompt. No skill may instruct the agent to load or run another skill in the same prompt. Hand-offs are "run `/next-command`" lines at the end.
- Spec Status machine, exact strings: `Draft` → `Approved` → `Planned` → `Building` → `Built`.
- Spec sections, exact headings and order: Intent, Audience, Budget, Scope, Existing assets, Discovery, Visual direction, Foundations, Components, Screens, Flows, Motion, Acceptance criteria, Status, Plan, Build log.
- Budget modes, exact strings: `Lean`, `Standard`, `Generous`. Default `Standard`. Limits per mode: review findings 5 / 10 / 15; fix passes per step 1 / 1 / 2; screenshots: one at end / one per composed screen / one per composed screen; brief question rounds: ≤ 3 per message / ≤ 3 per message / 1 per message if instructions persist.
- Build order is fixed: tokens → components → views → motion.
- The build modifies or deletes existing nodes, variables, or styles only when the Spec's "Existing assets" section lists them under "in scope for change".
- Fonts recommended anywhere are Google Fonts only.
- Fallback container when a Spec cannot be created: a locked text frame named `Spec — <topic>` inside a section named `— Specs —` on the current page, same headings.
- Spec targeting when several exist: current selection, else most recent whose Status is not `Built`, else ask.
- Skill prose addresses the Figma agent in the imperative. No mention of Claude Code, MCP, or the Plugin API.

## Review Focus

1. A user runs `/design-plan`, `/design-build`, or `/design-review` in a file with no Spec: the skill must say there is no Spec and point to `/design-brief`, never build. Pinned by the "No Spec" heading check in Task 3 and scenario `no-spec` in Task 11.
2. A user runs `/design-build` while Status is `Draft` or `Approved`: the skill refuses and names the missing step. Pinned by the Status table check in Task 3 and scenario `wrong-status` in Task 11.
3. A user on a Starter seat runs a project: the brief must set `Lean` and `/design-plan` must split the build into runs small enough for the 150-a-day cap. Pinned by the Budget partial check in Task 3 and scenario `lean-project` in Task 11.
4. The file has no library connected but the org has one: the brief must ask the user to connect it before discovery, not silently design without it. Pinned by the Discovery partial check in Task 3 and scenario `no-library` in Task 11.
5. Motion is not enabled on the account: `/add-motion` and the motion step in `/design-build` must stop with a clear message and record "motion unavailable" in the Build log, never pretend. Pinned by the motion partial check in Task 4 and scenario `motion-off` in Task 11.

---

## File structure

```
figma-design-skills/
  package.json                 "type": "module"; scripts: assemble, test
  skills.config.json           { "maxBytes": 12000, "published": [...], "pending": ["add-prototype"] }
  scripts/assemble.mjs         assemble(srcDir, distDir, config) → { written: [], errors: [] }
  src/partials/
    credit-modes.md            §7.0 principles and mode table
    spec-format.md             Spec headings, Status machine, fallback container, targeting rule, "No Spec" response
    discovery.md               connect-library reminder, what to inventory, how to record it in Discovery
    handoff.md                 closing-line pattern: next command + rough cost
    directions.md              visual directions, type pairings, palettes, product patterns
    rubric.md                  anti-generic rubric + ranked UX rules
    tokens.md                  condensed rules       tokens.full.md    = include tokens.md + detail
    components.md              condensed             components.full.md
    views.md                   condensed             views.full.md
    motion.md                  condensed             motion.full.md
    prototype.full.md          pending
  src/skills/
    design-brief.md  design-plan.md  design-build.md  design-review.md
    build-tokens.md  build-components.md  build-views.md  add-motion.md
    add-prototype.md
  dist/                        generated, committed; dist/pending/add-prototype.md
  tests/
    assemble.test.mjs          assembler behaviour
    dist.test.mjs              every dist file: frontmatter, size, required headings per skill
    scenarios/<name>.md        prompt, file setup, expected behaviour, baseline, recorded cost
    README.md                  probe results, tester access, how to run scenarios
  publish/<skill>.md           tagline, description, category, support contact
  README.md
```

Include directive, one per line, path relative to `src/`: `<!-- include: partials/tokens.md -->`. Includes nest. A missing file is an error, not a warning.

---

### Task 1: Assembler

**Files:**
- Create: `package.json`, `skills.config.json`, `scripts/assemble.mjs`, `tests/assemble.test.mjs`, `.gitignore`
- Create: `src/skills/.gitkeep`, `src/partials/.gitkeep`, `dist/.gitkeep`

**Interfaces:**
- Produces: `export async function assemble(srcDir, distDir, config)` returning `{ written: string[], errors: string[] }`; `export function validate(markdown, { name, maxBytes })` returning `string[]` of error messages (empty = valid). CLI: `node scripts/assemble.mjs` assembles `src/` → `dist/`, exits 1 on any error and prints them.
- `config` shape: `{ maxBytes: number, published: string[], pending: string[] }`. Pending skills are written to `dist/pending/`.

- [ ] **Step 1: Write failing tests in `tests/assemble.test.mjs`**

Use a temp dir per test. Tests, with assertions:

```js
test('expands a single include', ...)           // "A\n<!-- include: partials/p.md -->\nB" → "A\nP\nB"
test('expands nested includes', ...)            // p.md includes q.md → both bodies present, directive gone
test('errors on missing include', ...)          // errors[0] matches /partials\/missing\.md/
test('validate: frontmatter must have only name and description', ...) // extra key "model" → error
test('validate: name must equal basename', ...) // name: foo in bar.md → error
test('validate: description ≤ 1024 chars', ...)
test('validate: file ≤ maxBytes', ...)          // maxBytes 100, body 200 bytes → error naming the file and both numbers
test('validate: rejects cross-skill loading phrases', ...) // body containing "load the skill" or "invoke the skill" → error
test('pending skills go to dist/pending', ...)
test('cli exits 1 on errors', ...)              // spawn node scripts/assemble.mjs with a bad src, expect code 1
```

- [ ] **Step 2: Run tests, confirm they fail**

Run: `node --test tests/`
Expected: FAIL, `assemble` is not exported / file not found.

- [ ] **Step 3: Implement `scripts/assemble.mjs`**

`assemble` reads every `src/skills/*.md`, expands includes recursively (detect cycles: error), runs `validate`, writes to `dist/` or `dist/pending/`. Frontmatter parsed by hand (two `---` fences, `key: value` lines); no YAML library. `package.json` scripts: `"assemble": "node scripts/assemble.mjs"`, `"test": "node --test tests/"`.

- [ ] **Step 4: Run tests, confirm they pass**

Run: `node --test tests/`
Expected: PASS, 10 tests.

- [ ] **Step 5: Commit**

```bash
git add package.json skills.config.json scripts tests src dist .gitignore
git commit -m "feat: skill assembler with include directive and format checks"
```

---

### Task 2: Figma probes (a person runs these in Figma)

**Files:**
- Create: `tests/README.md`
- Modify: `skills.config.json` (`maxBytes`)

This task needs a Figma account with the agent. Do it early, in parallel with Tasks 3–5; the results change Tasks 6 and 8. Until it is done, `maxBytes` stays at 12000 and `/design-brief` is written for the "instructions do not persist" branch (rounds of ≤ 3 questions), which is correct in every mode except `Generous`.

- [ ] **Step 1: Size probe.** Create three dummy skills of 10 000, 20 000 and 40 000 bytes (valid frontmatter, filler body) via *Add context → Skills → Add skill → Upload a file*. Record the largest accepted size, and the error text for the first rejected one, in `tests/README.md` under "Probe 1: size limit". Set `maxBytes` in `skills.config.json` to the largest accepted size minus 10 %.

- [ ] **Step 2: Spec probe.** In a Design file, prompt the agent: "Create a Spec titled `Spec — Probe` with the headings Intent, Audience, Status. Set Status to Draft." Record whether a Spec was created, where it appeared, and whether a second prompt "Set Status in `Spec — Probe` to Approved" updated it. Record under "Probe 2: Specs".

- [ ] **Step 3: Persistence probe.** Create a tiny skill `/probe-persist` whose instructions say "Ask the user one question at a time about their favourite colour, food, and city, one per message, then summarise." Invoke it, answer three times without re-typing the command. Record whether the agent kept following the skill. Record under "Probe 3: instruction persistence".

- [ ] **Step 4: Access and credits.** Record the tester's plan and seat, whether motion is enabled, and the credits available this month, under "Tester access".

- [ ] **Step 5: Commit**

```bash
git add tests/README.md skills.config.json
git commit -m "test: record Figma probe results"
```

---

### Task 3: Shared process partials

**Files:**
- Create: `src/partials/credit-modes.md`, `src/partials/spec-format.md`, `src/partials/discovery.md`, `src/partials/handoff.md`
- Create: `tests/dist.test.mjs` (first version; later tasks add rows)

**Interfaces:**
- Produces: four partials included by every process skill. Exact headings inside them, which `dist.test.mjs` asserts appear in the assembled process skills: `## Budget modes`, `## The Spec`, `## If there is no Spec`, `## Status`, `## Discovery`, `## Before you finish`.

- [ ] **Step 1: Write `tests/dist.test.mjs`**

Runs `assemble` into a temp dist, then for every file in `dist/` and `dist/pending/`: frontmatter valid, size ≤ `maxBytes`, and a per-skill table of required headings. Start the table with the four process skills requiring all six headings above. Also assert, for every skill: body does not contain `Claude Code`, `MCP`, or `Plugin API`.

- [ ] **Step 2: Run, confirm it fails** (no skills yet). Run: `node --test tests/dist.test.mjs`. Expected: FAIL, dist empty / headings missing.

- [ ] **Step 3: Write `credit-modes.md`**

Content from spec §7.0: the five principles as a numbered list, the mode table with the exact limits in Global Constraints, the sentence "Default is Standard when the user doesn't know", and the rule that the budget question is folded into the brief's first round. Under 1 800 bytes.

- [ ] **Step 4: Write `spec-format.md`**

Headings: `## The Spec` (the sixteen section headings in order, one line each saying what goes there), `## Status` (the five states and which command moves to which), `## If there is no Spec` (exact response: say no Spec was found in this file and ask the user to run `/design-brief`; do not build), the fallback container rule, and the targeting rule. Under 2 200 bytes.

- [ ] **Step 5: Write `discovery.md`**

`## Discovery`: first line tells the agent to ask the user to connect their library if none is connected and one exists; then what to inventory (connected libraries; local collections with modes and variable counts; local components and sets; text and effect styles; existing pages and screens; naming conventions) and to write the result into the Spec's Discovery section so later commands never re-scan. Under 1 200 bytes.

- [ ] **Step 6: Write `handoff.md`**

`## Before you finish`: the closing-line pattern, exact shape: one line summary, then `Next: run /<command>. Expect a <small|medium|large> run.` Include the rule that a skill never asks the user to send a second prompt for work the current run can finish. Under 600 bytes.

- [ ] **Step 7: Run `node --test tests/`**. Expected: `dist.test.mjs` still fails on missing skills (no process skills yet) but partials parse; `assemble.test.mjs` passes. Commit.

```bash
git add src/partials tests/dist.test.mjs
git commit -m "feat: shared process partials and dist structure test"
```

---

### Task 4: Domain partials

**Files:**
- Create: `src/partials/tokens.md`, `tokens.full.md`, `components.md`, `components.full.md`, `views.md`, `views.full.md`, `motion.md`, `motion.full.md`, `prototype.full.md`
- Modify: `tests/dist.test.mjs` (add headings rows for domain skills and `design-build`)

**Interfaces:**
- Produces: condensed partials each under 1 500 bytes with heading `## <Domain> rules` and a `### Verify` sub-heading listing the structural checks; full partials include their condensed sibling and add `### Procedure` and `### Common mistakes`.

Required content per condensed partial (from spec §6.1, §7.3, and Figma's library guidance):

- [ ] **Step 1: `tokens.md`.** Rules: reuse compatible existing collections before creating; architecture by size (< 50 tokens one collection with Light/Dark; 50–200 Primitives + Color(Light/Dark) + Spacing + Typography; 200+ multiple semantic collections); semantic aliases to primitives, never duplicated raw values; every variable scoped, never all scopes; slash-separated names (`color/bg/primary`, `spacing/md`, `radius/sm`); text and effect styles for repeated roles. Verify: collection and mode names, variable counts, alias resolution in each mode, no unscoped variable.

- [ ] **Step 2: `components.md`.** Rules: foundations first; variant naming `Property=Value`; cap a variant matrix at 30 combinations, split beyond; instance swap for icons, never a variant per icon; bind fills, strokes, padding, radius, gap to variables when a token exists; description on the component set; lay variants out in a grid, never stacked. Verify: variant count equals the matrix, properties present, bound properties, description present, none stacked at the same position.

- [ ] **Step 3: `views.md`.** Rules: compose from instances, not redrawn shapes; auto layout for every container with related children; real content, no lorem ipsum; one hero element per screen; type scale and spacing from tokens; breakpoints from the Spec; include empty, loading, error states listed in the Spec. Verify: no detached instances, no text overflow or clipping, fills bound where a token exists, every Spec state present.

- [ ] **Step 4: `motion.md`.** Rules: first check motion is available and stop with "Motion is not enabled on this account" if not, recording it in the Build log; animate meaning (state change, hierarchy, feedback), never decoration; durations 100–300 ms for micro-interactions, ease-out for entrances, ease-in for exits; reuse animation styles across components; never animate a top-level frame. Verify: the listed interactions exist, durations within range, styles reused.

- [ ] **Step 5: `prototype.full.md`.** Status line at top: "Pending: the Figma agent does not support prototyping and interactions yet." Rules: flow starting point per flow in the Spec, one reaction per listed trigger, smart animate between matching layers, overlays for dialogs, record intent only when unsupported. Verify: every Spec flow has a start point and its transitions exist.

- [ ] **Step 6: Full partials.** Each `*.full.md` includes its condensed file, then `### Procedure` (ordered steps the agent follows when the skill runs standalone, including discovery and the handoff) and `### Common mistakes` (what goes wrong and the fix, as a two-column table). Each full partial under 4 000 bytes.

- [ ] **Step 7: Add rows to `dist.test.mjs`**: `build-tokens` requires `## Tokens rules`, `### Procedure`; same pattern for the other three; `design-build` requires all four `## <Domain> rules` headings; `add-prototype` requires the Pending line.

- [ ] **Step 8: Run `node --test tests/`**, expect `dist.test.mjs` failing only on skills not yet written. Commit.

```bash
git add src/partials tests/dist.test.mjs
git commit -m "feat: domain rule partials, condensed and full"
```

---

### Task 5: Reference library partials

**Files:**
- Create: `src/partials/directions.md`, `src/partials/rubric.md`
- Modify: `tests/dist.test.mjs` (`design-brief` requires `## Visual directions`; `design-review` and `design-build` require `## Anti-generic rubric`)

- [ ] **Step 1: `directions.md`.** `## Visual directions`: a table of eight named directions (builder picks, e.g. Editorial, Swiss/grid, Soft and rounded, Dense pro tool, Brutalist, Playful, Luxury/minimal, Glass/translucent) with columns: mood, type character, palette character, density, radius, motion character, use when. `### Type pairings`: ten pairings, Google Fonts only, each with the role split and a one-line reason. `### Palette archetypes`: six, each with primary, neutral, accent, and the semantic roles for light and dark. `### Product patterns`: eight product types with the screens and components they usually need. Under 4 500 bytes total; tables, not prose.

- [ ] **Step 2: `rubric.md`.** `## Anti-generic rubric`: concrete, checkable failures, each one line, each a finding if present: a default-feeling typeface used for everything; gradients used as decoration; cards of equal weight with no hierarchy; a hero that is a big number with a gradient accent; placeholder content; colour as the only carrier of meaning; contrast below 4.5:1 for body text; touch targets under 44 px; text clipped or overflowing; spacing off the 4/8 rhythm; hover or pressed states missing; empty/error/loading states missing when the Spec lists them. `### UX rules by priority`: ten, ranked. Under 2 500 bytes.

- [ ] **Step 3: Add test rows, run tests, commit.**

```bash
git add src/partials tests/dist.test.mjs
git commit -m "feat: visual direction library and anti-generic rubric"
```

---

### Task 6: `/design-brief`

**Files:**
- Create: `src/skills/design-brief.md`
- Modify: `tests/dist.test.mjs` (`design-brief` requires `## Size the work`, `## Interview`, `## Play it back`, `## Write the Spec`, `## Approval gate`)

**Interfaces:**
- Consumes: `credit-modes.md`, `spec-format.md`, `discovery.md`, `directions.md`, `handoff.md`.
- Produces: a Spec with Status `Approved` and a filled Budget section, which `/design-plan` consumes.

- [ ] **Step 1: Write the frontmatter.** `name: design-brief`. Description: third person, says it interviews the user about a design task, discovers the file, settles a visual direction, and writes an approved Spec before anything is built; use when starting any new screen, flow, component, or design-system work.

- [ ] **Step 2: Write the body** with these headings in order, content from spec §7.1:
  - `## Size the work`: the three-row sizing table, said out loud; quick tasks end the skill with "just ask the agent directly".
  - `## Opening`: one line offering to skip the questions; one open question. Skip exit: state assumptions and direction, then write the Spec.
  - `## Interview`: the ground to cover as a bullet list, with the rule from §7.0 on rounds per message by Budget mode, the required visual-direction step (propose two or three directions from the table when the file is empty; flex within the system when one exists), and the "existing assets in scope for change" step that settles decision forks.
  - `## Play it back`: describe each part back, mark guesses, ask what's wrong.
  - `## Write the Spec`: write all sixteen sections; small changes get a Plan section filled with 1–3 steps and Status `Planned`; projects get Status `Draft`.
  - `## Approval gate`: never mutate the canvas except to create the Spec; on the user's approval set Status to `Approved` (or `Planned` for small changes) and hand off to `/design-plan` (or `/design-build`).
  - includes: credit-modes, spec-format, discovery, directions, handoff.

- [ ] **Step 3: Run `npm run assemble && node --test tests/`.** Expected: `design-brief` passes size and headings. If it exceeds `maxBytes`, trim `directions.md` first (fewer rows), never the gate text.

- [ ] **Step 4: Commit.**

```bash
git add src/skills/design-brief.md dist/design-brief.md tests/dist.test.mjs
git commit -m "feat: /design-brief skill"
```

---

### Task 7: `/design-plan`

**Files:**
- Create: `src/skills/design-plan.md`
- Modify: `tests/dist.test.mjs` (`design-plan` requires `## Refuse unless Approved`, `## Write the Plan`, `## Split for budget`)

**Interfaces:**
- Consumes: a Spec with Status `Approved`.
- Produces: the Spec's Plan section, Status `Planned`. Plan step format, exact: `N. [essential|optional] <domain>: <what it creates> — inputs: <names/@refs> — verify: <structural checks>; <visual check or none>`.

- [ ] **Step 1: Frontmatter.** Description: turns an approved Spec into an ordered build plan with verification per step; use after `/design-brief` and before `/design-build`.

- [ ] **Step 2: Body.** `## Refuse unless Approved` (use the "If there is no Spec" response; if Status is not `Approved`, say which step is missing); `## Write the Plan` (fixed order tokens → components → views → motion, omit excluded layers, step format above, mark essential/optional); `## Split for budget` (Lean: every run ≤ medium, split at layer boundaries; Standard: split when more than ~12 steps; Generous: one run), ends with size estimate and sets Status `Planned`. Includes: credit-modes, spec-format, handoff.

- [ ] **Step 3: Assemble, test, commit.** `git commit -m "feat: /design-plan skill"`

---

### Task 8: `/design-build`

**Files:**
- Create: `src/skills/design-build.md`
- Modify: `tests/dist.test.mjs` (`design-build` requires `## Refuse unless Planned`, `## Run the plan`, `## Build log`, `## Report`)

**Interfaces:**
- Consumes: Spec with Status `Planned` or `Building`; Plan steps in the Task 7 format.
- Produces: Build log entries, exact: `N. <done|blocked|skipped> — <asset names> — verify: <result> — screenshot: <yes|no>`; Status `Built`.

- [ ] **Step 1: Frontmatter.** Description: executes the whole plan in the Spec in one run, verifying each step, and reports once; use after `/design-plan`.

- [ ] **Step 2: Body.** `## Refuse unless Planned`; `## Run the plan` (read Plan and Build log, skip done steps, run in order, apply the domain rules, verify at the Budget mode's depth, fix before moving on, fail twice → `blocked` and continue with independent steps, skip `optional` in Lean, modify existing assets only when listed in Existing assets → in scope for change); `## Build log` (write the entry after every step so a second prompt resumes; set Status `Building` at start, `Built` at end); `## Report` (one summary: built, verified and how, blocked or unverifiable, Next: `/design-review`). Includes: credit-modes, spec-format, tokens, components, views, motion (condensed), rubric, handoff.

- [ ] **Step 3: Assemble and test.** This is the size test. If over `maxBytes`: trim `rubric.md` to the twelve failures, then compress condensed partials; record in the spec's §10 if a split becomes necessary.

- [ ] **Step 4: Commit.** `git commit -m "feat: /design-build skill"`

---

### Task 9: `/design-review`

**Files:**
- Create: `src/skills/design-review.md`
- Modify: `tests/dist.test.mjs` (`design-review` requires `## Read-only`, `## Check`, `## Pin findings`)

**Interfaces:**
- Consumes: Spec with Status `Built`, Build log.
- Produces: finding cards on the canvas. Card format, exact: title `<severity> — <root cause>`, body lines `Where:`, `Why:`, `Fix:`. Severity strings `HIGH`, `MEDIUM`, `LOW`.

- [ ] **Step 1: Frontmatter.** Description: reviews built work against its Spec and an anti-generic rubric and pins ranked findings beside it; use after `/design-build` or on any frame the user wants critiqued.

- [ ] **Step 2: Body.** `## Read-only` (never edit unless the user's prompt also says fix; "fix them" applies findings in one pass and re-verifies); `## Check` (every Acceptance criterion; rubric; structural rules from spec §7.4); `## Pin findings` (cards in a frame named `Review — <topic>` to the right of the work, one per root cause, severity order, capped by Budget mode 5/10/15, card format above). Includes: credit-modes, spec-format, rubric, handoff.

- [ ] **Step 3: Assemble, test, commit.** `git commit -m "feat: /design-review skill"`

---

### Task 10: Standalone domain skills

**Files:**
- Create: `src/skills/build-tokens.md`, `build-components.md`, `build-views.md`, `add-motion.md`, `add-prototype.md`

**Interfaces:**
- Each includes `discovery.md`, its `*.full.md` partial, `credit-modes.md`, `handoff.md`. Each body: `## Scope` (build only what was asked; never promote into a design system; if the request is clearly a project, suggest `/design-brief`), then the full partial, then `## Report`.

- [ ] **Step 1: Write the four published skills.** Descriptions: `build-tokens` — creates or extends variable collections, modes, and styles the right way; use when the user asks for tokens, variables, modes, or theming. `build-components` — builds a component or component set with variants, properties, and token bindings; use when the user asks for a component. `build-views` — composes a screen from the file's components and tokens with real content and states; use when the user asks for a screen, page, or view. `add-motion` — adds purposeful micro-interactions and animation using the file's tokens; use when the user asks for motion or animation.

- [ ] **Step 2: Write `add-prototype.md`** with the Pending line first and `name: add-prototype`; listed under `pending` in `skills.config.json`.

- [ ] **Step 3: Assemble, test, commit.** `git commit -m "feat: standalone domain skills"`

---

### Task 11: Test scenarios

**Files:**
- Create: `tests/scenarios/<name>.md` for: `empty-file-project`, `library-file-project`, `small-change`, `no-spec`, `wrong-status`, `lean-project`, `no-library`, `motion-off`, `standalone-tokens`, `standalone-component`, `standalone-view`, `review-only`
- Modify: `tests/README.md` (how to run a scenario, what to record)

Scenario file format, exact headings: `## Prompt`, `## File setup`, `## Budget mode`, `## Expected`, `## Baseline (without skill)`, `## Result (with skill)`, `## Credits used`. Baseline is required only for `empty-file-project` and `small-change` (brief) and `library-file-project` (build); other scenarios mark it "not recorded".

- [ ] **Step 1: Write the twelve scenario files** with Prompt, File setup, Budget mode, and Expected filled from the spec; leave the result sections empty.
- [ ] **Step 2: Add a test** in `dist.test.mjs` that every scenario file has the seven headings.
- [ ] **Step 3: Run tests, commit.** `git commit -m "test: Figma scenarios"`

---

### Task 12: Listing copy and README

**Files:**
- Create: `publish/<skill>.md` for the eight published skills; `README.md`

- [ ] **Step 1: `publish/*.md`.** Headings: `## Tagline` (≤ 80 chars), `## Description` (what it does, when to use it, the command sequence it belongs to, the Budget modes, rough credit cost once Task 13 records it), `## Category` (from Figma's set: generation, brand, design systems, handoff, review, orchestrate & prompt, research), `## Support` (placeholder for the user's contact).
- [ ] **Step 2: `README.md`.** What this is, the four-command workflow, the standalone skills, install steps (download from `dist/`, *Add context → Skills → Upload a file*, or save from Community once published), credit guidance with the plan table from spec §5, development (`npm run assemble`, `npm test`), and the pending prototyping note.
- [ ] **Step 3: Commit.** `git commit -m "docs: README and Community listing copy"`

---

### Task 13: Run the scenarios in Figma (a person runs these)

**Files:**
- Modify: `tests/scenarios/*.md` (results, credits), `src/partials/handoff.md` and `src/skills/*.md` (cost lines), `publish/*.md`

- [ ] **Step 1:** Upload the eight `dist/` skills to the tester's account.
- [ ] **Step 2:** Run the baseline scenarios first without the skills; record.
- [ ] **Step 3:** Run every scenario in `Lean`, then `empty-file-project` and `library-file-project` once in `Standard`; record results and the credit meter value per prompt.
- [ ] **Step 4:** Fix skill text where the agent failed an Expected line; re-assemble; re-run only the failed scenario.
- [ ] **Step 5:** Put the recorded costs into the handoff lines and `publish/*.md`; commit.

```bash
git commit -am "test: scenario results and recorded credit costs"
```
