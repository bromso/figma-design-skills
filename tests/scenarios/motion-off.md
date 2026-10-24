# Scenario: motion-off

Tests the standalone `/add-motion` skill and the motion step inside `/design-build`, both on an account where motion generation is not enabled, to confirm the skills say so plainly instead of faking it or stopping the whole run.

## Prompt

Run both parts, on the same motion-disabled account:

1. Standalone: `/add-motion` — "animate the toast when it appears"
2. Inside a build: `/design-build` on a `Planned` Spec whose Plan includes at least one motion step, alongside token/component/view steps.

## File setup

A Figma Design file / account where motion and animation generation is not enabled (per Figma's per-account gating). For part 2, the Spec is `Planned` with a mixed Plan (tokens, components, views, and at least one motion step).

## Budget mode

Standard

## Expected

- [ ] `/add-motion` checks motion availability first, before Scope, Discovery, or any build step
- [ ] `/add-motion` stops and says exactly: "Motion is not enabled on this account."
- [ ] `/add-motion` does not send its normal hand-off line after that message
- [ ] `/design-build`, hitting the same restriction, blocks only the motion steps — logs each one `blocked — verify: not run (motion not enabled on this account)` — and continues running the remaining tokens, components, and views steps
- [ ] `/design-build`'s final report lists the motion steps under Blocked with that reason
- [ ] `/design-build` still reaches Status `Built` once every other step has an entry

## Baseline (without skill)

not recorded

## Result (with skill)

## Credits used
