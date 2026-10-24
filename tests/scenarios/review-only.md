# Scenario: review-only

Tests `/design-review` used directly against a named frame or selection in a file that has no Spec at all — the stated exception in "Find what to review".

## Prompt

Select a composed frame on the canvas, then send `/design-review` — "review this frame."

## File setup

A Figma Design file with one already-composed screen or frame, selected, and no Spec anywhere in the file.

## Budget mode

Standard (the cap used is "Standard with no Spec" per the Budget modes table)

## Expected

- [ ] Because the prompt names a frame/selection and no Spec exists, reviews that target against the rubric and structural rules only — the documented exception to "If there is no Spec"
- [ ] Says plainly that no Spec was used
- [ ] Does not refuse, and does not ask the user to run `/design-brief` first
- [ ] Checks the anti-generic rubric and the structural rules (stacked variants, unscoped variables, unbound fills where a token exists, detached instances, clipped or overflowing text, placeholder content)
- [ ] Pins ranked finding cards in a frame named `Review — <topic>` beside the work, one card per root cause, in severity order
- [ ] Caps the number of cards at ten (the "Standard with no Spec" row)
- [ ] Never edits the canvas, since the prompt does not say "fix" or "fix them"
- [ ] Ends with a one-line summary only, with no hand-off line, since no Spec was used

## Baseline (without skill)

not recorded

## Result (with skill)

## Credits used
