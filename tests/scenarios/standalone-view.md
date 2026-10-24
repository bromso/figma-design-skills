# Scenario: standalone-view

Tests `/build-views` used on its own, without any Spec in the file, composing one screen from existing components.

## Prompt

`/build-views` — "compose the account settings screen from our existing components"

## File setup

A Figma Design file with existing components and tokens already in place (at least a side-nav pattern and form controls), no Spec.

## Budget mode

Standard

## Expected

- [ ] Runs Discovery before composing, confirming which components and tokens already exist
- [ ] Composes the screen from existing component instances, never redrawn shapes
- [ ] Uses real content throughout, never lorem ipsum or placeholder text
- [ ] Gives the screen exactly one hero element
- [ ] Applies auto layout to every container whose children relate to each other
- [ ] Pulls type scale and spacing from tokens, not arbitrary values
- [ ] If the request is really several screens, says so in one line and suggests `/design-brief` instead of proceeding
- [ ] Reports what was built and verified, then hands off with the no-Plan line

## Baseline (without skill)

not recorded

## Result (with skill)

## Credits used
