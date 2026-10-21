---
name: design-build
description: Executes the whole Plan in the Spec in one run — tokens, then components, then views, then motion — verifying each step at the depth the Budget mode allows, logging every step to the Spec's Build log so a later prompt resumes cleanly, and reporting once at the end without interrupting the user. Use after /design-plan, or after /design-brief for a small change whose Spec is already Planned. Refuses, with a specific message, on a Spec that is still Draft or Approved, or already Built.
---

# Design build

Run every step of the Plan in the Spec, verify each one, and report once. Never ask the user a question during the run; decide from the Spec, and log anything you cannot do as `blocked` with the reason.

<!-- include: partials/spec-format.md -->

<!-- include: partials/credit-modes.compact.md -->

## Refuse unless Planned

Find the Spec (The Spec, above). If none exists, follow If there is no Spec.

If one exists, act on its Status:

- `Draft` — say the Spec isn't approved yet, and ask the user to finish and approve it via `/design-brief continue`. Do not build.
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
- **Depends on a blocked or skipped step:** a step whose inputs come from a blocked or skipped step is blocked; do not build it; log it `blocked` with `verify: not run (depends on step N)`. Continue with steps that do not depend on it.
- **Existing assets:** create new nodes, variables, and styles freely. Modify or delete an existing node, variable, or style only when the Spec's Existing assets section lists it under in scope for change; treat everything else as read-only. If a step cannot be done without changing an unlisted asset, do not change it; log the step `blocked` with `verify: not run (would change <asset>, not in scope for change)`.
- **Motion:** before the first motion step, check that motion is available. If it is not, log each motion step `blocked` with `verify: not run (motion not enabled on this account)` and continue; do not stop the run.
- **Build** the step with the matching domain rules below (Tokens, Components, Views, or Motion rules) and the inputs it names.
- **Verify** against the step's own `verify:` checks, plus the domain's Verify list. Structural checks always run. Take a screenshot only where the Budget mode allows: Lean takes one, after the last step of the run; Standard and Generous take one per composed screen (views steps). Read each screenshot against the step's visual check.
- **Rubric self-check (views steps):** before marking a composed screen done, check it against every line of the Anti-generic rubric and the UX rules. A true rubric line counts as a verify failure. A rubric line the Spec's Visual direction or Existing assets deliberately requires is not a failure; note it in the Build log.
- **Fix:** on a verify failure, make one fix pass (two in Generous) and verify again. If it still fails, log the step `blocked` with the failing check, and move on.
- **Log** the step (Build log, below) before starting the next one.

When every step in the current run has an entry, finish with Report.

<!-- include: partials/tokens.md -->

<!-- include: partials/components.md -->

<!-- include: partials/views.md -->

<!-- include: partials/motion.md -->

In this command, a missing motion capability blocks only the motion steps: log them as above and finish the rest of the run.

<!-- include: partials/rubric.md -->

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

<!-- include: partials/handoff.md -->
