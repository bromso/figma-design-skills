---
name: design-plan
description: Turns an approved Spec into an ordered, verifiable build plan grouped by layer — tokens, then components, then views, then motion — splits it into runs sized to the user's credit budget, and sets the Spec's Status to Planned. Use right after /design-brief, once the user has approved the Spec in chat, and before /design-build. Refuses to run, with a specific message, on a Spec that is not yet Approved, already planned or building, or already built.
---

# Design plan

Turn an approved Spec into an ordered build plan with verification built in. This command never touches the canvas; it only reads the Spec and writes its Plan section and Status.

## The Spec

The Spec is the contract between runs: write to it, read from it, never re-derive it.

Use a native Figma Spec titled `Spec — <topic>` when the file supports creating one; otherwise the fallback is a locked text frame named `Spec — <topic>` inside a section named `— Specs —` on the current page, with the same sections and Status line. Only the container differs; read and write "the Spec" by heading. To find the Spec, search every page for `— Specs —` / `Spec — …`; this is not discovery and the Lean page limit does not apply.

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
- `Approved` — set by `/design-brief` once the user types `/design-brief continue approved`.
- `Planned` — set by `/design-plan` (or directly by `/design-brief` for a small change that skips it).
- `Building` — set by `/design-build` mid-run, so a second prompt resumes cleanly.
- `Built` — set by `/design-build` once every step is done or blocked.

`/design-review` reads a `Built` Spec; it never changes Status.

## If there is no Spec

If no Spec can be found for this request, say so: no Spec was found in this file. Ask the user to run `/design-brief`. Do not build.


## Budget modes

| Mode | Review findings | Fix passes per step | Screenshots | Brief question rounds |
|---|---|---|---|---|
| Lean | 5 | 1 | one at the end | ≤3 per message, ≤3 rounds |
| Standard | 10 | 1 | one per composed screen | ≤3 per message |
| Generous | 15 | 2 | one per composed screen | 1 per message if instructions persist |

Default is Standard when the user doesn't know.


## Refuse unless Approved

Find the Spec (The Spec, above). If none exists, follow If there is no Spec.

If one exists, act on its Status:

- `Draft` — say the Spec isn't approved yet, and ask the user to finish and approve it via `/design-brief continue`.
- `Approved` — continue to Write the Plan.
- `Planned` or `Building` — say the work is already planned, and tell the user to run `/design-build`.
- `Built` — say the work is already built, and point the user to `/design-review`.

## Write the Plan

Read Scope, Foundations, Components, Screens, Flows, and Motion from the Spec. Write one Plan step per asset to create, grouped by layer in this fixed order: tokens → components → views → motion. Write a layer's steps only if its Spec section has content — Foundations for tokens, Components for components, Screens for views, Motion for motion — and omit a layer entirely when that section is empty or "none".

Number steps continuously across all layers, earlier layers first. Each step is exactly:

`N. [essential|optional] <domain>: <what it creates> — inputs: <names/@refs> — verify: <structural checks>; <visual check or none>`

- `<domain>` is one of tokens, components, views, motion.
- Inputs name the Spec items and existing assets, by name or `@` reference, the step reads or extends.
- Verify names the checks concretely, for the assets this step creates, not in generic language — for example `collection Color has modes Light, Dark; 12 variables; aliases resolve in both modes`. Write a visual check too (what a screenshot should show) only when the Budget mode gives this step a screenshot; otherwise write `none`.
- Mark a step `optional` when the Spec's Acceptance criteria don't require it; everything else is `essential`. In Lean, mark every non-essential step `optional`.

If Flows records prototyping intent, do not turn it into a step — the agent cannot wire interactions yet. Instead add one line at the end of the Plan: `Prototype: deferred, the agent cannot wire interactions yet.`

## Split for budget

Group the numbered steps into one or more runs, by Budget:

- **Lean** — split at layer boundaries only (never mid-layer) so every run is at most medium; say this is because of the 150-credits-a-day cap.
- **Standard** — one run if the Plan has about 12 steps or fewer; otherwise split at layer boundaries into two or more runs.
- **Generous** — one run, regardless of step count.

When split into more than one run, number the runs in build order and tag each step with its run number. Tell the user: run `/design-build` once per run; it resumes from the Build log.

Write the finished Plan into the Spec's Plan section and set Status to `Planned`. Hand off with `Next: run /design-build.`, sized from the first (or only) run's step count: small for up to 4 steps, medium for 5 to 12, large for more than 12 (Before you finish).

## Before you finish

Close with one short summary line, then a hand-off line in this exact shape:

`Next: run /<command>. Expect a <small|medium|large> run.`

Never ask the user to send a second prompt for work this run can finish; only hand off to the next command when the task genuinely requires a new run.

