# Scenario: no-spec

Tests that `/design-build` (and `/design-plan`) refuse cleanly when no Spec exists anywhere in the file, instead of inventing one or building from guesses.

## Prompt

Send `/design-build` (repeat the scenario separately with `/design-plan`) with no prior `/design-brief` run in this file.

## File setup

A Figma Design file with ordinary content on the canvas but no Figma Spec and no locked text frame named `Spec — <topic>` in a `— Specs —` section anywhere in the file.

## Budget mode

Not applicable — there is no Spec to read a Budget from.

## Expected

- [ ] Says, essentially verbatim, that no Spec was found in this file
- [ ] Names `/design-brief` as the command to run next
- [ ] Does not build, create, or modify anything on the canvas
- [ ] Does not set or change any Spec Status, since none exists

## Baseline (without skill)

not recorded

## Result (with skill)

## Credits used
