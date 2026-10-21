# Figma Design Skills

A set of custom skills for the Figma agent (the chat agent inside Figma Design) that give it a disciplined workflow for design work: interview first, write an approved Spec, plan, build the whole plan unattended, and review the result against the Spec and an anti-generic rubric. The problem it addresses is that the agent otherwise jumps straight from a request into generating, without asking who it's for, what already exists in the file, or what it should look like — producing generic-looking UI on guesses. These skills make it ask first, commit to a visual direction, and verify its own work. Each skill is a single Markdown file, installed inside Figma via *Add context → Skills*, and invoked by its own slash command; skills cannot call each other, so the process skills end each run by naming the next command to run.

## The four-command workflow

Run these in order for anything beyond a trivial edit:

1. `/design-brief` — interviews you, discovers the file and any connected libraries, settles a visual direction, and writes a Spec for you to approve in chat.
2. `/design-plan` — turns the approved Spec into an ordered, verifiable build plan, split into runs that fit your credit budget.
3. `/design-build` — runs the whole plan in one go, verifying and fixing each step, and reports once at the end.
4. `/design-review` — checks the result against the Spec and an anti-generic rubric, and pins ranked finding cards beside the work.

For a small, well-scoped change (for example "add a disabled state to Button"), `/design-brief` writes a short plan itself, so you go straight from `/design-brief` to `/design-build` — two commands instead of four.

## Standalone skills

Four more skills do one thing well, without the Spec workflow, for when you just want a single piece of work done right:

- `/build-tokens` — variable collections, modes, primitives, aliases, and styles.
- `/build-components` — a component or component set, its variants, properties, and bindings.
- `/build-views` — a screen composed from existing components and tokens, with real content.
- `/add-motion` — micro-interactions and animation, using the file's existing tokens; checks first whether motion is enabled on your account.

Each discovers what already exists in the file before building, builds only what was asked, and suggests `/design-brief` instead if the request turns out to be a bigger project.

## Prototyping (pending)

A ninth skill, `/add-prototype`, is drafted but not published. The Figma agent lists prototyping and interactions as "coming soon," not yet supported, so this skill stays under `dist/pending/` until that ships. Until then, `/design-brief` still records prototype intent (flows, triggers, transitions) in the Spec for later.

## Install

- Download the skill file(s) you want from `dist/` (one file per skill; the pending prototype skill is under `dist/pending/` and is not meant to be installed yet).
- In Figma, open *Add context → Skills → Upload a file* and upload the `.md` file.
- Once published, the same skills can instead be saved directly from the Figma Community AI skills library.

## Credits

Every prompt to the Figma agent spends AI credits from your monthly seat allowance. Figures from Figma's AI page and help center, October 2026:

| Plan / seat | Credits per month | Notes |
|---|---|---|
| Starter (free) | 500 | capped at 150 per day |
| Dev, Collab, View seats on any paid plan | 500 | |
| Professional, Full seat | 3,000 | |
| Organization, Full seat | 3,500 | |
| Enterprise, Full seat | 4,250 | |
| Purchased add-on credits | shared pool | subscription or pay-as-you-go |

`/design-brief` asks which of these applies (or lets you just say "keep it cheap") and records it in the Spec as a Budget mode, which every later command then reads instead of asking again:

| Budget mode | Who it suits | What changes |
|---|---|---|
| Lean | Starter, Dev/Collab/View seats | Fewer questions per message, limited discovery, optional steps skipped, one screenshot total, at most 5 review findings. |
| Standard (default) | Professional Full seat | Full discovery, one screenshot per composed screen, up to 10 review findings. |
| Generous | Organization/Enterprise seat, or purchased credits | Up to two fix passes per step, up to 15 review findings. |

## Known limitations

- One skill runs per prompt; if a message names more than one slash command, only the first runs.
- Figma Specs are in open beta; if the agent can't create one in your file, the skills fall back to a locked text frame named `Spec — <topic>` in a `— Specs —` section, with the same sections and Status line.
- Prototyping and interactions are not supported yet; `/add-prototype` stays unpublished until they are.
- Motion generation is gated per Figma account; `/add-motion` and the motion step in `/design-build` check availability first and stop with a clear message if it isn't enabled.
- The upload size limit for custom skills is untested until Probe 1 in `tests/README.md` is run; `skills.config.json`'s `maxBytes` may need adjusting afterward.

## Development

- `npm run assemble` — builds `dist/` (and `dist/pending/`) from `src/`.
- `npm test` — runs the test suite; must stay green before committing.

Skills are written once in `src/partials/` as shared rule blocks (tokens, components, views, motion, the anti-generic rubric, visual directions, and so on), then pulled into each skill's template in `src/skills/` with an `<!-- include: partials/<file>.md --> ` directive. The assembly script (`scripts/assemble.mjs`) expands every include, validates the result (frontmatter, kebab-case name, size limit, no cross-skill loading phrases), and writes the finished single-file skill to `dist/` — or `dist/pending/` for the skills not yet published. This keeps the condensed rules inside `/design-build` and the full rules inside each standalone domain skill in sync, since both are assembled from the same partials.

## Status

Untested in Figma. The skills build cleanly and the assembly test suite is green, but no scenario in `tests/scenarios/` has been run against the real Figma agent yet. See `tests/README.md` for the probes to run first and the twelve scenarios to run afterward.
