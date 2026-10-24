---
name: design-review
description: Reviews built work against its Spec and the anti-generic rubric and pins ranked finding cards beside it; also reviews any named frame or selection without one. Use after /design-build. Read-only unless the prompt says "fix" or "fix them", which applies findings in one pass, re-checks the fixed nodes, and marks cards fixed or open.
---

# Design review

Review the work against its Spec when one applies, always against the anti-generic rubric and the structural rules below, and pin findings as cards beside the work. Never edit the canvas unless the prompt says fix.

<!-- include: partials/spec-format.md -->

<!-- include: partials/credit-modes.compact.md -->

## Read-only

Never edit the reviewed work, unless this run's prompt also says "fix" or "fix them". Then:

- If a `Review — <topic>` frame already exists for this work and the prompt says fix, apply its open cards, re-check the fixed nodes, mark each card fixed or open; do not re-review or pin a second frame.
- Otherwise, after pinning the cards: apply every finding in one pass, re-check the changed nodes, and append `— fixed` or `— open` to each card's title.

Keep the Existing assets rule: with a Spec, an asset not listed as in scope for change is reported, never touched. With no Spec, the reviewed selection or named frame is in scope; everything outside it is read-only.

## Find what to review

- No Spec, and no selection or named frame: ask the user, in one message, to select a frame, and stop.
- The prompt names a frame or selection, or no Spec exists: review that target against the rubric and structural rules only — the exception to If there is no Spec, above. Say no Spec was used.
- Otherwise, find the Spec (The Spec, above) and act on its Status:
  - `Draft` — not approved yet; next command `/design-brief continue`.
  - `Approved` — no Plan yet; next command `/design-plan`.
  - `Planned` — not built yet; next command `/design-build`.
  - `Building` — review only the `done` steps; say the rest hasn't run.
  - `Built` — review Acceptance criteria, the Build log, and the rubric; go to Check.

## Check

- **Acceptance criteria** (Spec only): an unmet criterion is a finding.
- **Build log** (Spec only): re-check each `done` entry's `verify:` result; note any `blocked` or `skipped` step in the summary.
- **Structural rules**, always: no variants stacked at the same position; no variable left with all scopes; no fill hardcoded where a matching token exists; no detached instances; no clipped or overflowing text; no placeholder content (lorem ipsum, "John Doe", a default or grey-box image).

<!-- include: partials/rubric.md -->

## Pin findings

Group findings by root cause — one card per cause, not per node, ordered by severity then Plan or Build log order:

- **HIGH** — blocks a task, hides content, or fails contrast or touch-target.
- **MEDIUM** — harms comprehension or consistency.
- **LOW** — polish.

Cap cards by Budget mode (above: 5 Lean, 10 Standard, 15 Generous; Standard with no Spec). Past the cap, pin the highest-severity causes and say how many were left out.

Place one frame named `Review — <topic>` to the right of the work. One card per cause, in severity order:

- Title: `<severity> — <root cause>`
- `Where:` the nodes involved.
- `Why:` one sentence.
- `Fix:` the specific change.

## Report

End with a one-line summary: cards per severity, and whether a fix pass ran.

- Spec `Built` (Status stays `Built`): instead of the shape below, close with exactly: `Next: run /design-review fix them to apply the findings, or /design-brief for the next piece of work.` If a fix pass left no card open, close with `Next: run /design-brief for the next piece of work.`
- Spec `Building`: close with `Next: run /design-build to finish the remaining steps.`
- No Spec used: summary line only, no hand-off.

<!-- include: partials/handoff.md -->
