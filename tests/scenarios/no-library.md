# Scenario: no-library

Tests that `/design-brief` notices when a relevant library exists but has not been connected to the chat, and asks before proceeding instead of guessing at library assets.

## Prompt

`/design-brief` — "I want to design a settings area for our product" in a file belonging to a team that has a published design-system library, where that library has not been added to the chat's context.

## File setup

A Figma Design file with no library connected, but with a team or Community library that is known to exist for this org (visible in Figma's library browser, just not attached to this conversation).

## Budget mode

Standard

## Expected

- [ ] Discovery detects that no library is connected to this file or chat
- [ ] Asks the user to connect the relevant library before continuing, rather than guessing at its contents
- [ ] Does not proceed to propose a visual direction or write Foundations/Components sections using assumed library assets
- [ ] If the user confirms no library should be connected (or that none applies), proceeds using only what is actually in the file, and records that explicitly in the Spec's Discovery section

## Baseline (without skill)

not recorded

## Result (with skill)

## Credits used
