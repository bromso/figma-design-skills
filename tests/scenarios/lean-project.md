# Scenario: lean-project

Tests that the Lean budget mode actually changes behaviour across the whole workflow: fewer questions per message, limited discovery, optional steps skipped, fewer screenshots, and a smaller review cap.

## Prompt

Run in sequence:

1. `/design-brief` — "I want to design a settings area for a SaaS app, I'm on the free plan so keep it cheap."
2. Answer the interview, then approve by typing `/design-brief continue approved`.
3. `/design-plan`
4. `/design-build` (repeat once per run if the plan is split)
5. `/design-review`

## File setup

A near-empty Figma Design file (one connected library, no local components yet), tester account on a Starter (free) seat or a Dev/Collab/View seat.

## Budget mode

Lean

## Expected

- [ ] Records Budget as `Lean` in the Spec from the first round of questions, without spending a separate run just to ask about it
- [ ] Asks in rounds of at most three related questions per message, not one question per message, and finishes the interview in at most three rounds, stating assumptions for anything left
- [ ] Discovery is limited to the connected library and the current page, not every page in the file
- [ ] `/design-plan` marks every non-essential step `optional` and splits the Plan at layer boundaries so no single run is larger than medium, citing the 150-credits-a-day cap
- [ ] `/design-build` skips every `optional` step and logs it `skipped — verify: not run (optional in Lean)`
- [ ] `/design-build` takes exactly one screenshot, after the last step of the run, not one per composed screen
- [ ] `/design-build` caps fix passes at one per step
- [ ] `/design-review` pins at most five finding cards
- [ ] Every hand-off line sizes the next run as small or medium, never large

## Baseline (without skill)

not recorded

## Result (with skill)

## Credits used
