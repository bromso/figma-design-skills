# Scenario: wrong-status

Tests that `/design-build` refuses on a Spec that exists but has not yet been approved, rather than building from an unapproved draft.

## Prompt

Send `/design-build` against a file whose Spec's Status is `Draft`.

## File setup

A Figma Design file containing one Spec (native Figma Spec, or the locked-text-frame fallback) with Status `Draft` — the interview is only partly or fully recorded, but the user has not approved it in chat, and the Plan and Build log sections are empty.

## Budget mode

Whatever the Spec's Budget section already records (or "not yet recorded" if the interview hadn't reached that question).

## Expected

- [ ] Refuses to build
- [ ] Says the Spec isn't approved yet
- [ ] Tells the user to approve it in chat via `/design-brief continue`
- [ ] Does not change the Spec's Status
- [ ] Does not create or modify any canvas nodes

## Baseline (without skill)

not recorded

## Result (with skill)

## Credits used
