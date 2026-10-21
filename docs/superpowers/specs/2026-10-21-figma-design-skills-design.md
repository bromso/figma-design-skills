# Figma Design Skills — Design Document

**Date:** 2026-10-21
**Status:** Draft for approval
**Repo:** `figma-design-skills`

## 1. Intent

Build a set of **custom skills for the Figma agent** (the chat agent inside Figma Design), published on the Figma Community AI skills library, that give the agent a disciplined workflow for designing: variable collections and modes, components, views, prototyping, and motion. The workflow is modelled on [obra/superpowers](https://github.com/obra/superpowers): interview first, write an approved spec, plan, build the whole plan, review against the spec, report once.

The problem it solves: the Figma agent, like most agents, jumps straight from "make a settings screen" into generating. It does not ask who it's for, what already exists in the file, which tokens and components to reuse, or what it should look like. The result is generic UI built on guesses. These skills make the agent ask first, commit to a visual direction, and verify its own work.

**This is not a Claude Code plugin.** An earlier draft assumed that. The skills are single Markdown files installed inside Figma via *Add context → Skills*, invoked by slash command, and distributed through Figma Community. The repo holds their source, the assembly script, publishing assets, and test scenarios.

## 2. Goals

1. **Interview before building.** For anything beyond a quick, clear task, the agent gathers context and gets the user's approval on a written spec before it mutates the canvas.
2. **Spec as the contract.** The approved spec is written as a **Figma Spec** on the canvas next to the work. Plan, build, and review all refer back to it. The Spec is also the state ledger between prompts.
3. **Run the whole plan in one go.** After spec approval the user does not want to be interrupted. The build skill runs every step it can, verifies each one, and reports once at the end.
4. **Output that doesn't look like AI slop.** Visual direction is a required part of every spec. A compact reference library and an anti-generic review rubric enforce it.
5. **Works for anyone.** Agnostic of any file, team, or design system. Everything specific is discovered from the file and connected libraries at runtime. Free on Figma Community.
6. **Honest about what the agent can't do yet.** Where the Figma agent lacks a capability, the skill says so and stops, never fakes it.

## 3. Non-goals

- Claude Code, Cursor, or other MCP-client skills. Figma already ships `figma-use`, `figma-generate-library`, `figma-generate-design`, `figma-use-motion` for that surface. The source material may be reused later, but v1 targets only the in-app agent.
- Design-to-code, code layers, Figma Make, FigJam, Slides, shaders, Code Connect.
- Shipping a design system. The skills ship *reference material* (directions, palettes, type pairings, UX rules), never a token set pushed into files by default.
- Pixel-level visual regression. Verification is structural plus screenshot reading by the agent.

## 4. Anti-goals

- **Bad-looking UI.** If finished screens look like default AI output (Inter everywhere, gradient-on-everything, evenly spaced cards with no hierarchy, clipped text), the skills have failed. This is the user's single stated wince condition.
- **Building on guesses.** A skill that starts mutating the canvas on a non-trivial request before the spec is approved is a bug.
- **Duplicating foundations.** A second "Primitives" collection or a second `Button` because the skill didn't look first.
- **Depending on things not everyone has.** No external MCP connectors, no specific library, no paid add-ons beyond the agent itself.
- **Silent degradation.** When Specs, motion, or prototyping are unavailable, the skill says so and falls back explicitly.
- **Touching what the spec didn't name.** The run creates freely but never modifies or deletes existing nodes, variables, or styles unless the spec lists them as in scope.

## 5. Constraints (the medium)

Verified against Figma's help center and community sources on 2026-10-21.

- **One Markdown file per skill.** Follows the Agent Skills spec frontmatter (`name`, `description`). The optional `scripts/`, `references/`, `assets/` folders are **not supported**. Everything a skill needs must be inline.
- **The name is the slash command.** Short and verb-like. Names must be unique enough not to collide with other Community skills.
- **One skill per prompt.** If a prompt mentions several skills, only the first runs. Skills cannot load or call other skills. Orchestration therefore happens either (a) inside one self-contained skill or (b) by the user running skills in sequence, each one ending by naming the next command.
- **No file system, no subagents, no hooks.** State between prompts must live in the file: the Figma Spec, node names, and descriptions.
- **Size limit unknown.** Published skills seen in the wild run 5–10 KB. The builder must test the upload limit early with the largest skill (`/design-build`). If it does not fit, **"run the whole plan in one go" wins**: compress the condensed domain rules further rather than splitting the build by domain. The specificity lives in the Plan's per-step verification criteria written by `/design-plan`, so `/design-build` can afford to carry only the rules that prevent the known failures (unscoped variables, stacked variants, unbound fills, clipped text, placeholder content, generic type and colour). Splitting into several build commands is the last resort and must be recorded in §10 if it happens.
- **Agent capabilities (GA since 2026-10-06).** Supported: 0→1 generation, layout editing, component instance editing, applying styles and variables, switching modes, **authoring design system components, styles and variables**, searching connected libraries with `@` references, bulk content, **motion and animation**, Specs (read, write, create), design feedback and critique, selecting objects, taking and reasoning about screenshots, undo per change. **Coming soon, not supported today: prototyping and interactions, icons, slots, vector editing.**
- **Specs** are in open beta rolling out over the coming weeks, and whether the in-app Design agent can *create* one (rather than only read it) is unconfirmed: the Config India notes say it can, the design-files help article does not mention Specs. **The first test is "can `/design-brief` create a Spec in this file".** If not, the fallback is the primary v1 design and v1 does not wait: a locked text frame named `Spec — <topic>` in a `— Specs —` section on the current page, with exactly the same sections and Status line. Every process skill is written to read and write "the Spec" by section heading, so the container (Spec or text frame) is the only thing that differs.
- **Skill scope across turns is unconfirmed.** The help center says only that a slash command invokes a skill; it does not say whether the instructions persist for the rest of the conversation. **Second test: does the agent still follow `/design-brief` three replies later.** If instructions persist, the brief asks one question per message. If they do not, the brief asks in short rounds of at most three related questions per message, and every message ends with "reply here, or type `/design-brief continue` if I've lost the thread". The test scenarios cover both.
- **Credits.** Agent runs consume Figma AI credits. A long unattended build is a long run. The build skill must keep its steps proportionate and say when a plan is large enough that the user may prefer to run it in two prompts.
- **Libraries must be connected by the user.** The agent only sees libraries added to the chat. Every skill's first step reminds the user to connect the relevant library if one exists.

## 6. Architecture

### 6.1 The skills

Process skills (the workflow), run in order by the user:

| Slash command | Role | Superpowers analogue |
|---|---|---|
| `/design-brief` | Interviews the user, discovers the file, settles visual direction, plays back, writes the Spec, waits for approval. Ends by saying "run `/design-plan` when you've approved the Spec." | `brainstorming` |
| `/design-plan` | Reads the approved Spec, writes an ordered build plan with verification criteria per step into the Spec, says "run `/design-build`". | `writing-plans` |
| `/design-build` | Executes the whole plan in one prompt. Contains condensed domain rules for tokens, components, views, and motion. Verifies each step. Records progress and node references in the Spec so a second prompt can resume. Ends with one report and "run `/design-review`". | `executing-plans` |
| `/design-review` | Reviews the result against the Spec and the anti-generic rubric. Pins ranked findings as cards beside the work. Read-only unless asked to fix. | `requesting-code-review` |

Domain skills, usable standalone when someone just wants one thing done well:

| Slash command | Covers | Status |
|---|---|---|
| `/build-tokens` | Collections, modes, primitives, semantic aliases, scopes, text and effect styles. | v1 |
| `/build-components` | Component sets, variant matrices, properties, instance swap, variable bindings, descriptions. | v1 |
| `/build-views` | Screens composed from instances, breakpoints, real content, hierarchy. | v1 |
| `/add-motion` | Keyframes, animation styles, easing, micro-interactions, with availability detection. | v1 |
| `/add-prototype` | Reactions, triggers, transitions, flow starting points, overlays. | **Drafted but not published until the agent supports prototyping.** Repo keeps it under `skills/pending/`. |

Each domain skill is the full version of the condensed rules inside `/design-build`. They share source (see 6.3).

### 6.2 The reference library (inline, compact)

Because folders are not supported, reference material is inlined where it is used and kept compact (tables, not prose):

- In `/design-brief`: **visual directions** (6–10 named styles with mood, type character, palette character, density, radius, motion character, when-to-use), **type pairings** (Google Fonts only, since those are what Figma offers everyone), **palette archetypes** with light/dark role mapping, **product patterns** (which screens and components a product type usually needs).
- In `/design-review` and `/design-build`: the **anti-generic rubric** (concrete, checkable failures), **UX rules** ranked by priority (touch targets, contrast, hierarchy, density, breakpoints).

Inspiration: Anthropic's `frontend-design` (commit to a direction grounded in the subject; one or two typefaces chosen on purpose; a hero element; refuse the defaults) and `ui-ux-pro-max` (searchable curated data). The curation is the builder's; the shape above is fixed.

### 6.3 Repo layout

```
figma-design-skills/
  src/
    partials/            # shared rule blocks: tokens.md, components.md, views.md,
                         # motion.md, prototype.md, rubric.md, directions.md, ...
    skills/              # one template per skill, including partials by reference
  dist/                  # assembled single-file skills, what gets uploaded
    design-brief.md
    design-plan.md
    design-build.md
    design-review.md
    build-tokens.md
    build-components.md
    build-views.md
    add-motion.md
    pending/add-prototype.md
  scripts/assemble.*     # builds dist/ from src/, fails if a file exceeds the size limit
  publish/               # per-skill tagline, description, category, thumbnail
  tests/                 # scenarios: prompt, file setup, expected behaviour, baseline notes
  docs/                  # this spec, plans
```

The single-source-of-truth for domain rules is `src/partials/`. `/design-build` includes condensed versions; the standalone domain skills include full versions. The assembly step keeps them in sync. Language and toolchain for the script are the builder's call.

## 7. The workflow in detail

### 7.1 `/design-brief`

**Sizing.** First decide the size out loud, as superpowers does:

| Size | Example | What happens |
|---|---|---|
| Quick, clear task | "rename these layers", "set this fill to `color/bg/accent`" | Say so and tell the user to just ask the agent directly; no spec needed. |
| Small change | "add a disabled state to Button" | Short interview, agreement in chat, then a short Spec that already contains its one-to-three-step Plan and is born `Planned`. The user runs `/design-build` next, skipping `/design-plan`. Two prompts total. `/design-brief` never mutates the canvas. |
| Project | "design the settings area", "set up tokens and a component library" | Full interview, Spec, approval, then plan and build. |

**Opening.** One line offering to skip the questions, then one open question about the real moment or picture. If the user skips, the skill states its assumptions and chosen direction in one message and writes the Spec from them; discovery and review are never skipped.

**Ground to cover** (territory, not a script; one question per message):

- What the thing is, who it's for, the moment they'll use it.
- What exists: connected libraries, local collections, components, styles, naming conventions, existing screens. The skill does this discovery itself and reports it. If no library is connected, it asks the user to connect one if one exists.
- Scope: which of tokens / components / views / motion are in play. Prototyping is recorded in the Spec as intent for later, with a note that the agent cannot wire it yet.
- States, variants, breakpoints, real content, edge cases (empty, error, loading).
- Flows: which screens connect and how, recorded for later prototyping and for motion.
- Motion: where motion adds meaning, how it should feel.
- **Visual direction (required).** Mood, typefaces, palette, density, hero element, what it must not look like. With a design system present, direction flexes within it. With an empty file, the skill proposes two or three concrete directions from its inline library and the user picks.
- **Existing assets in scope for change.** Decision forks (code vs Figma conflicts, close-but-not-exact library matches, existing component to extend) are settled here and recorded. Anything not listed is read-only during the build.

**Playback.** Describe each part back as it becomes clear, mark guesses, ask what's wrong.

**Spec.** Written as a Figma Spec titled `Spec — <topic>` next to the work (fallback in §5). Sections: Intent, Audience, Scope (in/out), Existing assets (reuse / in scope for change), Visual direction, Foundations, Components, Screens, Flows (intent), Motion, Acceptance criteria, Status, Plan (empty until `/design-plan`), Build log (empty until `/design-build`). Status starts as `Draft`. The user approves in chat; the skill sets Status to `Approved` and tells the user to run `/design-plan`.

### 7.2 `/design-plan`

Refuses if the Spec's Status is not `Approved`. Writes the Plan section: ordered steps in fixed dependency order tokens → components → views → motion, each with inputs (names and `@` references), the exact assets it creates, and **verification criteria** (structural: counts, names, bindings, modes; visual: which screenshot and what to look for). Steps the Spec excludes are omitted. Ends with an estimate in steps and a note if the plan is large enough to split across two build prompts. Sets Status to `Planned` and says "run `/design-build`".

There is **one approval gate, the Spec**. The plan is written into the Spec for reference but not re-approved.

### 7.3 `/design-build`

Refuses if Status is not `Planned` or `Building`. Reads the Plan and Build log, skips completed steps, runs the rest in order. Per step: apply the condensed domain rules, build, verify against the step's criteria, fix before moving on. A step that fails twice is marked blocked in the Build log; the run continues with steps that don't depend on it. Modifies or deletes existing assets only if the Spec lists them. Writes each step's result (asset names, node references, screenshot taken) to the Build log as it goes, so a second prompt resumes cleanly. Sets Status to `Built`. Ends with one summary: what was built, what was verified and how, what was blocked or unverifiable, and "run `/design-review`".

### 7.4 `/design-review`

Reads the Spec, Plan, Build log, and the built nodes. Checks every acceptance criterion; the anti-generic rubric; structural rules (no stacked variants, no unscoped variables, no unbound fills where a token exists, no detached instances, no clipped or overflowing text, no placeholder content). Pins ranked findings as cards beside the work, one card per root cause, severity-ordered, with the specific fix. Read-only by default; "fix them" in a follow-up prompt applies the findings in one pass and re-verifies.

### 7.5 Domain skills standalone

Each begins with discovery (connected libraries, local assets, conventions), builds only what was asked, verifies, and reports. They never promote a request into a design system. `/add-motion` checks availability first and stops with a clear message if motion is not enabled. `/add-prototype` is published only when the agent supports interactions; until then the repo keeps it under `pending/` and `/design-brief` records prototyping intent in the Spec for later.

## 8. Testing the skills

The method is superpowers' `writing-skills`: a skill is proven when the agent fails without it and passes with it.

- Each skill has scenarios in `tests/`: a prompt, a file setup (empty file; file with a connected community library; messy file with naming drift), the expected behaviour, and the recorded baseline.
- Baseline first, in Figma, without the skill. Record what the agent did (started generating without asking, ignored the library, picked Inter, left variants unscoped). Then run with the skill and record the difference.
- Visual quality is judged by `/design-review` against the rubric, not by eye alone. At least one scenario per skill ends with a review run.
- Three things are tested before any skill is written in full, in this order: the upload size limit (with a `/design-build` draft), whether `/design-brief` can create a Spec in a Design file, and whether skill instructions persist across turns. Each result picks one of the branches in §5.
- When a file has several Specs, a process skill targets the one in the current selection, else the most recent whose Status is not `Built`, else asks.
- The Specs fallback path is tested in a file without Specs access if one is available; otherwise marked untested.
- Tests are run by a person in Figma. Automating them (for example through browser automation) is out of scope for v1.
- The test plan is sized to the tester's access: whether Specs and motion are enabled on their account and how many AI credits are available for baseline-plus-skill runs. **Open: to be confirmed by the user.**

## 9. Decisions already made (as the user made them)

- Modelled on obra/superpowers: process skills plus domain skills.
- The skills live **inside Figma** as custom agent skills, distributed through Figma Community. Fully independent of superpowers and of any coding-agent plugin.
- The agent asks more questions than it does today, then writes a spec. The user chose Figma Specs as the home for it.
- After approval, run the entire plan without stopping. One report at the end.
- Agnostic of file and design system; public, free, for anyone.
- Visual direction is required. For empty files, propose two or three directions and let the user pick. Inspiration: Anthropic's `frontend-design` and `ui-ux-pro-max`.
- The run modifies or deletes existing assets only when the Spec lists them as in scope. Decision forks are settled during `/design-brief`.

## 10. Calls made by the author of this document (not confirmed by the user)

- Prototyping ships as a drafted-but-unpublished skill, because the Figma agent lists prototyping as "coming soon". Prototype intent is still captured in the Spec. This is the one place the user's stated scope cannot be delivered in v1.
- Orchestration is a sequence of four slash commands the user runs in order, because one skill runs per prompt. Each ends by naming the next.
- `/design-build` is self-contained with condensed domain rules; the standalone domain skills carry the full rules; both are assembled from shared partials.
- Three work sizes (quick / small / project). Quick tasks skip the brief entirely. Small changes get a Spec born `Planned` so they skip `/design-plan` and go straight to `/design-build`.
- If the in-app agent cannot create Specs, the locked-text-frame fallback is the primary v1 design and v1 does not wait for the rollout.
- If skill instructions do not persist across turns, the brief asks in rounds of at most three questions per message instead of one, with a `/design-brief continue` re-entry.
- If `/design-build` exceeds the upload limit, the single unattended run is kept and the inline rules are compressed; splitting by domain is the last resort.
- One approval gate, the Spec. The Plan is written into the Spec but not re-approved.
- Fallback when Specs are unavailable: a locked text frame in a `— Specs —` section.
- A step that fails twice is blocked, not fatal.
- Slash command names: `design-brief`, `design-plan`, `design-build`, `design-review`, `build-tokens`, `build-components`, `build-views`, `add-motion`, `add-prototype`.
- Reference fonts are limited to Google Fonts, since those are available in every Figma account.

## 11. Left to the builder

- Exact wording of every skill; how to phrase instructions so the Figma agent reliably stops at the approval gate.
- Which directions, pairings, palettes, UX rules, and rubric items to curate, and how compactly.
- The assembly script's language and the size check.
- Community listing copy and thumbnails.
- How the Build log references nodes (names, links, or both) so resumption works.
- Whether `/design-review` card pinning uses a frame per finding or one consolidated frame. (The card format is a fresh choice; `better-interface` emits tables, not canvas cards.)
- Checking Community name collisions at publish time and prefixing if needed.
