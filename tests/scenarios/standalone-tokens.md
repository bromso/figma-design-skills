# Scenario: standalone-tokens

Tests `/build-tokens` used on its own, without any Spec in the file, for a well-scoped token request.

## Prompt

`/build-tokens` — "set up color and spacing tokens for a dashboard, light and dark mode"

## File setup

A Figma Design file with no Spec and a handful of existing but unscoped, inconsistently named local variables (for example a lone `Color 1` variable with no mode structure).

## Budget mode

Standard (no Spec exists, so the skill defaults to Standard per its own Scope section)

## Expected

- [ ] Runs Discovery against the file and any connected libraries before creating anything
- [ ] Reuses a compatible existing collection instead of creating a duplicate
- [ ] Sizes the collection architecture to the token count the request implies (one collection with Light/Dark modes for a small set)
- [ ] Aliases semantic variables to primitives rather than duplicating raw values
- [ ] Scopes every new variable instead of leaving it set to all scopes
- [ ] Names variables with the slash convention (for example `color/bg/primary`, `spacing/md`)
- [ ] If the request reads as a full project in scope (a whole system, not just these tokens), says so in one line and suggests `/design-brief` instead of proceeding
- [ ] Reports what was built and verified, then hands off with the no-Plan line naming `/design-review` or `/design-brief`

## Baseline (without skill)

not recorded

## Result (with skill)

## Credits used
