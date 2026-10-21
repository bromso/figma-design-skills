---
name: design-brief
description: Interviews the user about a design task before anything is built, discovers what already exists in the file and connected libraries, settles a visual direction, and writes a Spec on the canvas for the user to approve. Use when starting any new screen, flow, component, or design-system work (variables, components, views, motion), or when asked to plan design work in Figma. Not needed for quick, clear edits such as renaming layers or setting one fill.
---

# Design brief

Ask before you build. This command interviews the user, records the answers in a Spec, and gets the Spec approved. Never mutate the canvas here except to create and update the Spec, and a spike only if the user says yes.

If the user typed `/design-brief continue` (with or without `approved`), find the Spec whose Status is `Draft` (see The Spec below for which one), read what is already filled in, and resume the interview at the first section still empty. Do not ask again what the Spec already answers. If every section but Plan and Build log is filled (Plan too, for a small change), go to Approval gate; with `approved`, that is the approval, so apply On approval. If there is no Draft Spec, follow If there is no Spec.

## Budget modes

Credits are the user's scarce resource. In priority order: prefer fewer runs over shorter ones, and never ask for another prompt for work this run can finish; front-load intent to avoid a fix-it run after a wrong build; discover once, record it in the Spec, never re-scan; scale verification to the budget; end with a one-line estimate of what the next command will cost.

Record the mode in the Spec as `Budget: Lean | Standard | Generous`; every later command reads it from there instead of asking.

| Mode | Review findings | Fix passes per step | Screenshots | Brief question rounds |
|---|---|---|---|---|
| Lean | 5 | 1 | one at the end | ≤3 per message, ≤3 rounds |
| Standard | 10 | 1 | one per composed screen | ≤3 per message |
| Generous | 15 | 2 | one per composed screen | 1 per message if instructions persist |

Lean suits a Starter or Dev/Collab/View seat (500 credits a month, 150 a day). Standard suits a Professional Full seat. Generous suits an Organization or Enterprise seat, or purchased credits. Default is Standard when the user doesn't know. Never spend a run just to ask about the budget.


## Size the work

Decide the size first and say it out loud in one line, with the reason. If the user gave no request yet, send the Opening first and size the work from the reply.

| Size | Example | What happens |
|---|---|---|
| Quick, clear task | "rename these layers", "set this fill to `color/bg/accent`" | Say it's a quick task needing no Spec; tell the user to just ask the agent directly. Then stop. Do not do the task yourself or add a hand-off line. |
| Small change | "add a disabled state to Button" | Short interview, then a short Spec that already holds its one-to-three-step Plan and ends `Planned` once approved. Two commands total: this one and `/design-build`. |
| Project | "design the settings area", "set up tokens and a component library" | Full interview, Spec, approval, then `/design-plan` and `/design-build`. |

## Opening

Send the size line and the first round as one message:

1. One line offering to skip the questions: "If you'd rather skip the questions, say so and I'll state my assumptions and write the Spec."
2. The open question: what is the real moment or picture? Who is using this, where, and what are they trying to do?
3. The budget question: which Figma plan or seat are you on, or how many credits may this work use? (Budget modes above.)
4. If your team has a library for this, add it to this chat with @ now.

End it with the closing line from Interview.

If the user skips, send one message that states your assumptions, the scope, and the chosen visual direction, then write the Spec from them. Skipping never skips Discovery, the Visual direction section, or the approval gate.

## Interview

Instructions may not carry over between messages, so write for that case:

- In Lean and Standard, ask in short rounds of at most three related questions per message.
- In Generous, ask one question per message only if you find these instructions still apply; otherwise use rounds of three.
- In Lean, finish the interview in at most three rounds; state assumptions for anything left.
- End every interview message with exactly: "Reply here, or type `/design-brief continue` if I've lost the thread."

After the first reply, run Discovery (below) once, then create the Spec with Status `Draft` and fill Intent, Audience, Budget, and Discovery. Update its sections as each round settles them, so `/design-brief continue` can pick up from the file.

Ground to cover. This is territory, not a script; skip what the user or Discovery has already answered, and keep a small change to one or two rounds.

- What the thing is, who it's for, the moment they'll use it.
- Scope: which of tokens, components, views, and motion are in play. If the user wants prototyping, record it as intent for later and say the agent cannot wire interactions yet.
- States, variants, breakpoints, real content, and edge cases (empty, error, loading).
- Flows: which screens connect and how, for motion now and prototyping later.
- Motion: where it adds meaning and how it should feel.
- Visual direction, required for every size: mood, typefaces, palette, density, hero element, and what it must not look like. Empty file: propose two or three directions from Visual directions below; the user picks one. Screens but no design system: propose two or three from the table that fit what is already there. A design system: flex within it, choosing which of its variables, styles, and components carry the direction, and name what to avoid. Never leave this section blank.
- Existing assets in scope for change. List every existing node, variable, style, or component the build may modify, and settle each fork here: code vs. Figma conflicts, close-but-not-exact library matches, extending an existing component vs. a new one. Record each decision. Anything not listed is read-only during the build.

If the user wants to see a direction before choosing, offer a spike. Build it only after a yes, name its frame `Spike — <topic>`, and note in the Spec that it is throwaway.

## Discovery

In Lean, inventory only the connected library and the current page; do not open other pages.

If no library is connected and one exists for this file, ask the user to connect it before continuing.

Inventory, once, directly from the file and any connected libraries:

- Connected libraries and what they publish.
- Local variable collections, their modes, and roughly how many variables each holds.
- Local components and component sets.
- Text styles and effect styles.
- Existing pages and screens.
- Naming conventions already in use.

Write the result into the Spec's Discovery section as soon as it's gathered, so later commands read it from the Spec instead of re-scanning the file.


## Visual directions

For each direction you propose, ground it in the subject and name a pairing, a palette, and the hero element. Commit to one direction; never average several.

| Direction | Mood | Type | Palette | Density | Radius | Motion | Use when |
|---|---|---|---|---|---|---|---|
| Editorial | considered, literary | high-contrast serif display, quiet text face | ink on paper, one deep accent | airy | 0-4 | slow fades | publishing, culture, long reads |
| Swiss grid | rational, exact | grotesk, tight scale, flush left | black, white, one signal red | medium | 0 | none or snap | institutions, data, portfolios |
| Soft and rounded | warm, safe | rounded sans | muted tints, warm neutrals | airy | 16-24 | gentle spring | health, consumer, onboarding |
| Dense pro tool | focused, fast | compact sans, mono for data | cool greys, colour only for status | tight | 4-6 | instant, under 150 ms | dashboards, dev tools, admin |
| Brutalist | raw, loud | mono or heavy grotesk, oversized | black, white, one clashing hue | mixed | 0 | hard cuts | studios, events, zines |
| Playful | energetic | chunky display, round text | saturated, two or three hues | medium | 12-full | bouncy overshoot | games, social, learning |
| Luxury minimal | quiet, expensive | light serif or wide sans, open tracking | near-black, bone, metallic accent | very airy | 0-2 | slow, long ease | fashion, hospitality, premium |
| Glass | layered, ambient | clean geometric sans | dark or vivid backdrop, blurred surfaces | medium | 12-20 | blur, depth shifts | media, music, OS-like tools |

### Type pairings

| Display | Text | Fits | Why |
|---|---|---|---|
| Instrument Serif | Instrument Sans | Editorial | sharp headlines, matched sans |
| DM Serif Display | DM Sans | Editorial, warm brands | classic contrast |
| Hanken Grotesk | IBM Plex Mono | Swiss grid | mono for labels |
| IBM Plex Sans | IBM Plex Mono | Dense pro tool | tabular figures, one superfamily |
| Space Grotesk | Space Mono | Brutalist | quirky terminals, honest mono |
| Nunito | Nunito Sans | Soft and rounded | round display, steady body |
| Bricolage Grotesque | Figtree | Playful | characterful, friendly |
| Cormorant Garamond | Jost | Luxury minimal | fine serif, restraint |
| Sora | Manrope | Glass | wide geometric, legible small |
| Fraunces | Work Sans | food, craft, retail | soft serif with personality |

### Palette archetypes

| Archetype | Primary light / dark | Neutral | Accent | Light bg / surface / text | Dark bg / surface / text |
|---|---|---|---|---|---|
| Ink and paper | #1F2A44 / #9FB3E0 | #6B6660 | #C2410C | #FAF7F2 / #FFFFFF / #1C1917 | #151413 / #1F1D1B / #EDE8E0 |
| Signal | #111111 / #F5F5F5 | #6D6D6D | #E4002B | #FFFFFF / #F2F2F2 / #111111 | #0A0A0A / #1A1A1A / #F5F5F5 |
| Calm clinical | #2F6F5E / #6FC2A8 | #69726E | #F2A65A | #F6F8F7 / #FFFFFF / #1E2A26 | #121816 / #1B2320 / #E6EEEA |
| Slate pro | #2F5BD3 / #7C9CFF | #687083 | #0FA3A3 | #F7F8FA / #FFFFFF / #11151C | #0E1116 / #161B22 / #E6E9EF |
| Pop | #6C3BF5 / #A98BFF | #6F6A80 | #FFC531 | #FFFBF2 / #FFFFFF / #1D1838 | #16132A / #221D3D / #F4F1FF |
| Noir and brass | #0E0E0E / #EAE4DA | #726C64 | #B08D57 | #F4F1EC / #FBFAF7 / #141414 | #0B0B0B / #161514 / #EAE4DA |

Status roles, light / dark: success #15803D / #4ADE80, warning #B45309 / #FBBF24, danger #B91C1C / #F87171, info uses primary.

### Product patterns

| Product | Screens | Components |
|---|---|---|
| SaaS app | overview, list, detail, settings, onboarding | side nav, data table, stat tile, filters, chart |
| Marketing site | home, features, pricing, about, contact | hero, feature row, testimonial, pricing table, FAQ |
| E-commerce | listing, product, cart, checkout, order status | product card, gallery, variant picker, stepper |
| Mobile consumer | onboarding, feed, detail, profile, settings | tab bar, list cell, sheet, toast, avatar |
| Booking | search, availability, select, confirm, manage | date picker, time slots, summary card |
| Content | home, article, section, search, newsletter | article card, byline, pull quote, tag |
| Fintech | accounts, transactions, transfer, cards | balance, transaction row, amount input, confirm sheet |
| Dev tool | projects, logs, settings, API keys, members | code block, status badge, command menu, diff |


## Play it back

As each part becomes clear, describe it back in a sentence or two. Mark guesses as guesses ("I'm assuming…"). Ask what's wrong rather than whether it's right.

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
- `Built` — set by `/design-build` once every step is done, blocked, or skipped.

`/design-review` reads a `Built` Spec; it never changes Status.

## If there is no Spec

When this command needs an existing Spec and none is found in the file, say so: no Spec was found in this file. Ask the user to run `/design-brief`. Do not build.


## Write the Spec

When the interview is done, complete all sixteen sections of the Draft Spec. Use real content, not placeholders. Write "none" where a section genuinely has nothing; leave only Plan and Build log empty for a project.

Acceptance criteria must be checkable: name the variables, components, screens, and states that must exist, and the visual qualities that review will judge.

For a small change, also fill the Plan with one to three steps, each in exactly this format:

`N. [essential|optional] <domain>: <what it creates> — inputs: <names/@refs> — verify: <structural checks>; <visual check or none>`

In Lean, mark every non-essential step `optional`.

Then send one message summarising the Spec section by section, in a few lines, and ask for approval. End it with exactly "To approve, type `/design-brief continue approved`." and then, for changes, the closing line from Interview.

## Approval gate

Do not set Status past `Draft` until the user types `/design-brief continue approved`. A plain "approved" reply is not approval: repeat the approval line and change nothing. If they ask for changes, update the Spec, play back only what changed, and ask again.

On approval:

- Project: set Status to `Approved`, then hand off with `Next: run /design-plan.` and its cost estimate (Before you finish).
- Small change: set Status to `Planned`, then hand off with `Next: run /design-build.` and its cost estimate, sized by the Plan's steps.

Do not create frames, components, variables, or styles in this command beyond the Spec itself (and an approved spike).

## Before you finish

On the command's final message only; never append a Next line to an interview or clarifying message. Close with one short summary line, then a hand-off line in this exact shape:

`Next: run /<command>. Expect a <small|medium|large> run.`

Never ask the user to send a second prompt for work this run can finish; only hand off to the next command when the task genuinely requires a new run.

