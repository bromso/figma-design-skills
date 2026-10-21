---
name: design-review
description: Reviews built work against its Spec and the anti-generic rubric and pins ranked finding cards beside it; also reviews any named frame or selection without one. Use after /design-build. Read-only unless the prompt says "fix" or "fix them", which applies findings in one pass, re-checks the fixed nodes, and marks cards fixed or open.
---

# Design review

Review the work against its Spec when one applies, always against the anti-generic rubric and the structural rules below, and pin findings as cards beside the work. Never edit the canvas unless the prompt says fix.

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

Credits are the user's scarce resource on every run. Follow five principles, in priority order:

1. Prefer fewer runs over shorter ones. Batch work into as few prompts as the task allows, and never ask the user to send another prompt for something this run can finish.
2. Front-load intent. Ask enough up front to avoid an expensive fix-it run after a wrong build.
3. Discover once, record it. Do file and library discovery in `/design-brief` and read it back from the Spec afterward; never re-scan.
4. Scale verification to the budget. Structural checks are cheap; screenshots and re-render loops are not.
5. Say what things cost. End with a one-line estimate of what the next command is likely to cost.

`/design-brief` asks which mode applies and records it in the Spec as `Budget: Lean | Standard | Generous`. Every later command reads the Budget from the Spec instead of asking again.

| Mode | Review findings | Fix passes per step | Screenshots | Brief question rounds |
|---|---|---|---|---|
| Lean | 5 | 1 | one at the end | ≤3 per message |
| Standard | 10 | 1 | one per composed screen | ≤3 per message |
| Generous | 15 | 2 | one per composed screen | 1 per message if instructions persist |

Lean suits a Starter seat or a Dev/Collab/View seat (500 credits a month, capped at 150 a day): split the plan so no single run is larger than medium. Standard suits a Professional Full seat. Generous suits an Organization or Enterprise seat, or purchased credits.

Default is Standard when the user doesn't know. Fold the budget question into the brief's first round; never spend a run just to ask about it.


## Read-only

Never edit the reviewed work, unless this run's prompt also says "fix" or "fix them". Then, after pinning the cards: apply every finding in one pass, re-check the changed nodes, and append `— fixed` or `— open` to each card's title. Keep the Existing assets rule: an asset not listed as in scope for change is reported, never touched.

## Find what to review

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

- Spec used: Status stays `Built`. The one exception to the shape below, since the next step is a reply, not a run: `Next: reply "fix them" to apply the findings, or run /design-brief for the next piece of work.`
- No Spec used: summary line only, no hand-off.

## Before you finish

Close with one short summary line, then a hand-off line in this exact shape:

`Next: run /<command>. Expect a <small|medium|large> run.`

Never ask the user to send a second prompt for work this run can finish; only hand off to the next command when the task genuinely requires a new run.

