---
name: design-brief
description: Interviews the user about a design task before anything is built, discovers what already exists in the file and connected libraries, settles a visual direction, and writes a Spec on the canvas for the user to approve. Use when starting any new screen, flow, component, or design-system work (variables, components, views, motion), or when asked to plan design work in Figma. Not needed for quick, clear edits such as renaming layers or setting one fill.
---

# Design brief

Ask before you build. This command interviews the user, records the answers in a Spec, and gets the Spec approved. Never mutate the canvas here except to create and update the Spec, and a spike only if the user says yes.

If the user typed `/design-brief continue`, find the Spec whose Status is `Draft` (see The Spec below for which one), read what is already filled in, and resume the interview at the first section still empty. Do not ask again what the Spec already answers. If every section but Plan and Build log is filled (Plan too, for a small change), go to Approval gate. If there is no Draft Spec, follow If there is no Spec.

<!-- include: partials/credit-modes.md -->

## Size the work

Decide the size first and say it out loud in one line, with the reason. If the user gave no request yet, send the Opening first and size the work from the reply.

| Size | Example | What happens |
|---|---|---|
| Quick, clear task | "rename these layers", "set this fill to `color/bg/accent`" | Say it's a quick task that needs no Spec, and tell the user to just ask the agent directly. Then stop. Do not do the task yourself and do not add a hand-off line. |
| Small change | "add a disabled state to Button" | Short interview, agreement in chat, then a short Spec that already holds its one-to-three-step Plan and ends `Planned`. Two commands total: this one and `/design-build`. |
| Project | "design the settings area", "set up tokens and a component library" | Full interview, Spec, approval, then `/design-plan` and `/design-build`. |

## Opening

Send the size line and the first round as one message:

1. One line offering to skip the questions: "If you'd rather skip the questions, say so and I'll state my assumptions and write the Spec."
2. The open question: what is the real moment or picture? Who is using this, where, and what are they trying to do?
3. The budget question: which Figma plan or seat are you on, or how many credits may this work use? (Budget modes above.)
4. Which library should I connect, if any?

End it with the closing line from Interview.

If the user skips, send one message that states your assumptions, the scope, and the chosen visual direction, then write the Spec from them. Skipping never skips Discovery, the Visual direction section, or the approval gate.

## Interview

Instructions may not carry over between messages, so write for that case:

- In Lean and Standard, ask in short rounds of at most three related questions per message.
- In Generous, ask one question per message only if you find these instructions still apply; otherwise use rounds of three.
- End every interview message with exactly: "Reply here, or type `/design-brief continue` if I've lost the thread."

After the first reply, run Discovery (below) once, then create the Spec with Status `Draft` and fill Intent, Audience, Budget, and Discovery. Update its sections as each round settles them, so `/design-brief continue` can pick up from the file.

Ground to cover. This is territory, not a script; skip what the user or Discovery has already answered, and keep a small change to one or two rounds.

- What the thing is, who it's for, the moment they'll use it.
- Scope: which of tokens, components, views, and motion are in play. If the user wants prototyping, record it as intent for later and say the agent cannot wire interactions yet.
- States, variants, breakpoints, real content, and edge cases (empty, error, loading).
- Flows: which screens connect and how, for motion now and prototyping later.
- Motion: where it adds meaning and how it should feel.
- Visual direction, required for every size. Settle mood, typefaces, palette, density, hero element, and what it must not look like. If Discovery found an empty file, propose two or three concrete directions from Visual directions below and let the user pick one. If Discovery found a design system, flex within it: choose which of its variables, styles, and components carry the direction, and name what to avoid. Never leave this section blank.
- Existing assets in scope for change. List every existing node, variable, style, or component the build may modify, and settle each decision fork here: a conflict between code and Figma, a library match that is close but not exact, an existing component to extend versus a new one. Record each decision. Anything not listed is read-only during the build.

If the user wants to see a direction before choosing, offer a spike. Build it only after a yes, name its frame `Spike — <topic>`, and note in the Spec that it is throwaway.

<!-- include: partials/discovery.md -->

<!-- include: partials/directions.md -->

## Play it back

As each part becomes clear, describe it back in a sentence or two. Mark guesses as guesses ("I'm assuming…"). Ask what's wrong rather than whether it's right.

<!-- include: partials/spec-format.md -->

## Write the Spec

When the interview is done, complete all sixteen sections of the Draft Spec. Use real content, not placeholders. Write "none" where a section genuinely has nothing; leave only Plan and Build log empty for a project.

Acceptance criteria must be checkable: name the variables, components, screens, and states that must exist, and the visual qualities that review will judge.

For a small change, also fill the Plan with one to three steps, each in exactly this format:

`N. [essential|optional] <domain>: <what it creates> — inputs: <names/@refs> — verify: <structural checks>; <visual check or none>`

In Lean, mark every non-essential step `optional`.

Then send one message summarising the Spec section by section, in a few lines, and ask for approval, ending with the closing line from Interview.

## Approval gate

Do not set Status past `Draft` until the user approves in chat. If they ask for changes, update the Spec, play back only what changed, and ask again.

On approval:

- Project: set Status to `Approved`, then hand off with `Next: run /design-plan.` and its cost estimate (Before you finish).
- Small change: set Status to `Planned`, then hand off with `Next: run /design-build.` and its cost estimate, sized by the Plan's steps.

Do not create frames, components, variables, or styles in this command beyond the Spec itself (and an approved spike).

<!-- include: partials/handoff.md -->
