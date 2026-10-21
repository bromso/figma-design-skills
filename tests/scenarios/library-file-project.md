# Scenario: library-file-project

Tests the full four-command workflow in a file with a connected design-system library already present, so Discovery has real assets to find and the build must reuse rather than duplicate them.

## Prompt

Run in sequence, across separate prompts:

1. `/design-brief` — "I want to design a settings area for a SaaS app." Answer the interview, approve the Spec.
2. `/design-plan`
3. `/design-build`
4. `/design-review`

## File setup

A Figma Design file with one Community (or team) design-system library connected to the chat — published components (at least a Button and an Input), a variable collection with Light/Dark modes, and text styles — plus an existing page of unrelated screens that are not in scope for this work.

## Budget mode

Standard

## Expected

- [ ] `/design-brief`'s Discovery reports what the connected library publishes (components, variable collections, styles) before proposing anything
- [ ] Visual direction flexes within the connected library rather than proposing a from-scratch direction
- [ ] Existing assets section lists which library components and variables are reused, which (if any) are in scope for change, and marks everything else read-only
- [ ] `/design-plan` refuses if the Spec is not yet `Approved`; once approved, writes Plan steps grouped tokens → components → views → motion, referencing library assets by name or `@` reference
- [ ] `/design-build` reuses the connected library's components and variables instead of duplicating them — no second "Primitives" collection, no duplicate Button
- [ ] `/design-build` modifies or deletes an existing node, variable, or style only when the Spec's Existing assets section lists it as in scope for change; everything else is left untouched
- [ ] Build log gets one line per step in the `N. <done|blocked|skipped> — <asset names> — verify: <result> — screenshot: <yes|no>` format
- [ ] Final build report names assets built, grouped by layer, and hands off to `/design-review`
- [ ] `/design-review` checks the Build log and Acceptance criteria and pins ranked finding cards beside the work

## Baseline (without skill)

## Result (with skill)

## Credits used
