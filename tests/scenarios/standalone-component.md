# Scenario: standalone-component

Tests `/build-components` used on its own, without any Spec in the file, for a single well-scoped component request.

## Prompt

`/build-components` — "build a Badge component with Status and Size variants"

## File setup

A Figma Design file with existing color and spacing tokens already in place, no Spec.

## Budget mode

Standard

## Expected

- [ ] Runs Discovery before building, confirming what tokens and components already exist
- [ ] Names variants `Property=Value` (for example `Status=Success`, `Size=Small`)
- [ ] Binds fill, stroke, padding, radius, and gap to an existing matching variable rather than hard-coding values
- [ ] Writes a description on the component set
- [ ] Lays variants out in a grid, never stacked at the same position
- [ ] Caps the variant matrix at 30 combinations, splitting into a second component set if the request would exceed it
- [ ] If the request is really several components, says so in one line and suggests `/design-brief` instead of proceeding
- [ ] Reports what was built and verified, then hands off with the no-Plan line

## Baseline (without skill)

not recorded

## Result (with skill)

## Credits used
