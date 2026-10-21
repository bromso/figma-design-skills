# Scenario: brief-continue

Tests that `/design-brief continue` resumes an interrupted interview from the Spec on the canvas instead of starting over, and that `/design-brief continue approved` is what moves the Spec past `Draft`.

## Prompt

Run in sequence:

1. `/design-brief continue`
2. Answer the remaining question rounds as they come.
3. When the Spec is played back, type `/design-brief continue approved`.

## File setup

A Figma Design file containing one Spec `Spec — Settings area` with Status `Draft`, left by an interrupted interview: Intent, Audience, Budget (`Standard`), Discovery, and Scope are filled; Existing assets onward are empty, and Plan and Build log are empty. Start from a new chat, so nothing from the earlier interview is in the conversation.

## Budget mode

Standard (read from the Spec, not asked again)

## Expected

- [ ] Finds the `Draft` Spec on the canvas, reads what is filled in, and says it is resuming
- [ ] Resumes at the first unfilled section (Existing assets), without restarting the interview or re-asking Intent, Audience, Budget, or Scope
- [ ] Does not re-run Discovery; uses the Discovery section already in the Spec
- [ ] Ends every interview message with exactly "Reply here, or type `/design-brief continue` if I've lost the thread."
- [ ] Asks for approval with "To approve, type `/design-brief continue approved`." and leaves Status `Draft` until then
- [ ] On `/design-brief continue approved`, sets Status to `Approved` and hands off naming `/design-plan`
- [ ] Creates nothing on the canvas beyond updating the Spec

## Baseline (without skill)

not recorded

## Result (with skill)

## Credits used
