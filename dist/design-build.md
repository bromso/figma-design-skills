---
name: design-build
description: Executes the whole Plan in the Spec in one run — tokens, then components, then views, then motion — verifying each step at the depth the Budget mode allows, logging every step to the Spec's Build log so a later prompt resumes cleanly, and reporting once at the end without interrupting the user. Use after /design-plan, or after /design-brief for a small change whose Spec is already Planned. Refuses, with a specific message, on a Spec that is still Draft or Approved, or already Built.
---

# Design build

Run every step of the Plan in the Spec, verify each one, and report once. Never ask the user a question during the run; decide from the Spec, and log anything you cannot do as `blocked` with the reason.

## The Spec

The Spec is the contract between runs: write to it, read from it, never re-derive it.

Use a native Figma Spec titled `Spec — <topic>` when the file supports creating one; otherwise the fallback is a locked text frame named `Spec — <topic>` inside a section named `— Specs —` on the current page, with the same sections and Status line. Only the container differs; read and write "the Spec" by heading.

When a file has several Specs, target the one in the current selection, else the most recent Spec whose Status is not `Built`, else ask.

Every Spec has these sections, in order:

1. Intent — the goal, in a sentence or two.
2. Audience — who it's for and the moment they'll use it.
3. Budget — `Lean | Standard | Generous`.
4. Scope — what's in and out.
5. Existing assets — reused vs. in scope for change; else read-only.
6. Discovery — what `/design-brief` found in the file and libraries.
7. Visual direction — mood, type, palette, density, hero element, what to avoid.
8. Foundations — collections, modes, primitives, aliases, styles.
9. Components — sets, variants, properties, bindings.
10. Screens — views to compose, with real content.
11. Flows — which screens connect, for motion and later prototyping.
12. Motion — where it adds meaning and how it should feel.
13. Acceptance criteria — what must be true to pass review.
14. Status — see below.
15. Plan — empty until `/design-plan` runs.
16. Build log — empty until `/design-build` runs.

## Status

Status moves through five states, each set by one command:

- `Draft` — set by `/design-brief` on first write.
- `Approved` — set by `/design-brief` once the user approves in chat.
- `Planned` — set by `/design-plan` (or directly by `/design-brief` for a small change that skips it).
- `Building` — set by `/design-build` mid-run, so a second prompt resumes cleanly.
- `Built` — set by `/design-build` once every step is done or blocked.

`/design-review` reads a `Built` Spec; it never changes Status.

## If there is no Spec

If no Spec can be found for this request, say so: no Spec was found in this file. Ask the user to run `/design-brief`. Do not build.


## Budget modes

| Mode | Review findings | Fix passes per step | Screenshots | Brief question rounds |
|---|---|---|---|---|
| Lean | 5 | 1 | one at the end | ≤3 per message |
| Standard | 10 | 1 | one per composed screen | ≤3 per message |
| Generous | 15 | 2 | one per composed screen | 1 per message if instructions persist |

Default is Standard when the user doesn't know.


## Refuse unless Planned

Find the Spec (The Spec, above). If none exists, follow If there is no Spec.

If one exists, act on its Status:

- `Draft` — say the Spec isn't approved yet, and ask the user to approve it in chat via `/design-brief continue`. Do not build.
- `Approved` — say the Spec has no Plan yet, and tell the user to run `/design-plan`. Do not build.
- `Planned` — start a new build at Run the plan.
- `Building` — resume at Run the plan from the Build log.
- `Built` — say the work is already built, and point the user to `/design-review`. Do not build.

## Run the plan

1. Read Budget, Existing assets, Plan, and Build log from the Spec. Do not re-scan the file or libraries; Discovery in the Spec already records them.
2. Set Status to `Building` before touching the canvas.
3. Pick the current run. If the Plan is not split into runs, the whole Plan is one run. Otherwise the current run is the lowest-numbered run with a step that has no Build log entry; build only that run's steps.
4. Skip every step that already has a Build log entry. Run the rest in Plan order: tokens → components → views → motion.

For each step:

- **Lean and `optional`:** do not build it; log it `skipped` with `verify: not run (optional in Lean)`.
- **Depends on a blocked step:** if its inputs name an asset a `blocked` step was meant to create, do not build it; log it `blocked` with `verify: not run (depends on step N)`. Continue with steps that do not depend on it.
- **Existing assets:** create new nodes, variables, and styles freely. Modify or delete an existing node, variable, or style only when the Spec's Existing assets section lists it under in scope for change; treat everything else as read-only. If a step cannot be done without changing an unlisted asset, do not change it; log the step `blocked` with `verify: not run (would change <asset>, not in scope for change)`.
- **Motion:** before the first motion step, check that motion is available. If it is not, log each motion step `blocked` with `verify: not run (motion not enabled on this account)` and continue; do not stop the run.
- **Build** the step with the matching domain rules below (Tokens, Components, Views, or Motion rules) and the inputs it names.
- **Verify** against the step's own `verify:` checks, plus the domain's Verify list. Structural checks always run. Take a screenshot only where the Budget mode allows: Lean takes one, after the last step of the run; Standard and Generous take one per composed screen (views steps). Read each screenshot against the step's visual check.
- **Rubric self-check (views steps):** before marking a composed screen done, check it against every line of the Anti-generic rubric and the UX rules. A true rubric line counts as a verify failure.
- **Fix:** on a verify failure, make one fix pass (two in Generous) and verify again. If it still fails, log the step `blocked` with the failing check, and move on.
- **Log** the step (Build log, below) before starting the next one.

When every step in the current run has an entry, finish with Report.

## Tokens rules

- Reuse a compatible existing collection before creating a new one.
- Size the architecture to the token count: under 50 tokens, one collection with Light and Dark modes; 50 to 200, split into Primitives plus Color (Light/Dark), Spacing, and Typography collections; 200 or more, multiple semantic collections.
- Alias semantic variables to primitives. Never duplicate a raw value across variables.
- Scope every variable to where it applies. Never leave a variable set to all scopes.
- Name variables with slashes: `color/bg/primary`, `spacing/md`, `radius/sm`.
- Create a text style or effect style for any role that repeats.

### Verify

- Collection and mode names match the Spec if one exists, otherwise the user's request.
- Variable counts match the Spec's Foundations section if one exists, otherwise the user's request.
- Every alias resolves in each mode.
- No variable is left unscoped.


## Components rules

- Build foundations (tokens, styles) before components.
- Name variants `Property=Value`.
- Cap a variant matrix at 30 combinations; split into a second component set beyond that.
- Use instance swap for icons. Never create a variant per icon.
- Bind fill, stroke, padding, radius, and gap to a variable whenever a matching token exists.
- Write a description on every component set.
- Lay variants out in a grid. Never stack them at the same position.

### Verify

- Variant count equals the planned matrix.
- Every variant property matches the Spec if one exists, otherwise the user's request.
- Bindable properties are bound, not hard-coded.
- The component set has a description.
- No two variants occupy the same position.


## Views rules

- Compose screens from component instances, never redrawn shapes.
- Apply auto layout to every container whose children relate to each other.
- Use real content. Never lorem ipsum or placeholder text.
- Give each screen exactly one hero element.
- Pull type scale and spacing from tokens, not arbitrary values.
- Build the breakpoints the Spec lists, no others.
- Build every empty, loading, and error state the Spec lists.

### Verify

- No instance is detached from its component.
- No text overflows or clips its frame.
- Fills are bound to a variable wherever a matching token exists.
- Every state the Spec lists is present.


## Motion rules

- Check that motion is available before starting. If motion is not available, stop and say: Motion is not enabled on this account. Record it in the Build log if one exists; otherwise say so in the report.
- Animate meaning only: a state change, a hierarchy shift, or feedback. Never animate for decoration.
- Keep micro-interaction durations between 100 and 300 ms. Ease out on entrances, ease in on exits.
- Reuse one animation style across components instead of redefining it each time.
- Never animate a top-level frame.

### Verify

- Every interaction the Spec lists exists.
- Durations fall within 100 to 300 ms.
- Animation styles are reused, not duplicated.


In this command, a missing motion capability blocks only the motion steps: log them as above and finish the rest of the run.

## Anti-generic rubric

Check the canvas against each line. Any line that is true is a finding; name the node.

- One default-feeling typeface (Inter, Roboto, Arial, system UI) is used for everything.
- A gradient is decoration rather than carrying meaning or depth.
- Cards or tiles sit at equal weight with no clear primary.
- The hero is a big number with a gradient accent.
- Placeholder content remains: lorem ipsum, "Title", "John Doe", grey boxes for images.
- Colour is the only carrier of meaning (status, error, selection) with no icon or label.
- Body text contrast is below 4.5:1 against its background.
- A touch target is under 44 x 44 px.
- Text is clipped, truncated without intent, or overflows its frame.
- A spacing value falls off the 4/8 rhythm.
- An interactive component lacks a hover or pressed state.
- An empty, error, or loading state the Spec lists is missing.
- More than two typefaces appear on one screen.
- A screen has no hero, or more than one competing for it.
- Icons mix sets, stroke weights, or sizes.

### UX rules by priority

| # | Rule | Check |
|---|---|---|
| 1 | Contrast | body 4.5:1, large text and UI parts 3:1 |
| 2 | Touch targets | 44 x 44 px minimum, 8 px apart |
| 3 | Hierarchy | one primary action and one hero per screen |
| 4 | Readability | body 16 px on mobile, 45-75 characters a line, line height 1.4-1.6 |
| 5 | Feedback | hover, pressed, focus, disabled on every control |
| 6 | States | empty, loading, error each say what happened and what to do next |
| 7 | Rhythm | 4/8 spacing; related items closer than unrelated ones |
| 8 | Breakpoints | each Spec breakpoint reflows; nothing scrolls sideways at 360 px |
| 9 | Labels | visible label on every input, never placeholder only; errors beside the field |
| 10 | Consistency | same job, same component; one icon set, one stroke |


## Build log

Append one line per step to the Spec's Build log, immediately after the step finishes and before the next one starts, so a second prompt resumes where this one stopped. Use exactly this format:

`N. <done|blocked|skipped> — <asset names> — verify: <result> — screenshot: <yes|no>`

- `N` is the Plan step number.
- Asset names are the variables, styles, components, or frames the step created or changed, by name or `@` reference; write `none` if nothing was created.
- Verify result is `passed`, the failing check with its reason, or `not run (<reason>)`. Never use ` — ` inside a field; it separates fields.
- Screenshot is `yes` only if a screenshot was taken and read for this step.

Status:

- Set `Building` at the start of every run.
- After the last run of the Plan (or the only one), once every step has an entry — `done`, `blocked`, or `skipped` — set Status to `Built`.
- After an earlier run of a split Plan, leave Status `Building`.

## Report

Send one message at the end of the run, and only then. Include:

- **Built:** the asset names created or changed, grouped by layer (tokens, components, views, motion).
- **Verified:** which checks ran and how — structural checks, screenshots read, rubric self-checks — and how many fix passes were used.
- **Blocked or skipped:** each step number with its reason, including anything left unverified.
- **Status:** `Built` or `Building`.

Then hand off (Before you finish):

- Status `Built`: `Next: run /design-review. Expect a <size> run.` Size it from the number of `done` steps: small for up to 4, medium for 5 to 12, large for more than 12.
- Status `Building` after an earlier run: `Next: run /design-build again for run N+1. Expect a <size> run.` Size it from that run's step count, the same way.

## Before you finish

Close with one short summary line, then a hand-off line in this exact shape:

`Next: run /<command>. Expect a <small|medium|large> run.`

Never ask the user to send a second prompt for work this run can finish; only hand off to the next command when the task genuinely requires a new run.

