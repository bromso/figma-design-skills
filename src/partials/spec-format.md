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
