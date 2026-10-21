# Scenario: empty-file-project

Tests `/design-brief` opening a full project interview in a file that has nothing in it yet — no components, styles, variables, or connected libraries — and proposing visual directions from scratch rather than defaulting to a generic look.

## Prompt

Send as one message to start:

> /design-brief
> I want to design a settings area for a SaaS app.

Reply to each question round as it comes. When the Spec is played back, approve it by typing `/design-brief continue approved`.

## File setup

A brand-new, empty Figma Design file: the default blank page only, no components, no text or effect styles, no variable collections, and no library connected to the chat.

Variant, Specs unavailable: the same empty file on an account or file where the agent cannot create a native Figma Spec. Run the same prompt, then `/design-plan` once approved.

## Budget mode

Standard (do not state a plan or seat; let the brief's default apply and confirm it defaults correctly).

## Expected

- [ ] States the work is a Project (not a quick task or a small change) and says why
- [ ] Opens with the "skip the questions" offer plus the first round, including the budget question, in one message
- [ ] Runs Discovery and reports the file as empty — no collections, components, styles, or connected libraries found
- [ ] Does not ask to connect a library, since Discovery found none exists for this file
- [ ] Proposes two or three concrete visual directions from the Visual directions table, grounded in "SaaS app" (for example Swiss grid or Dense pro tool), rather than silently defaulting to one look
- [ ] Commits to one direction once the user picks, rather than averaging several
- [ ] Plays back assumptions as the interview proceeds, marking guesses as guesses
- [ ] Writes a Spec titled `Spec — <topic>` (or the locked-text-frame fallback if Specs are unavailable in this file) with all sixteen sections, Status `Draft`
- [ ] Creates no component, variable, frame, or style beyond the Spec itself during this run
- [ ] Asks for approval before moving Status past `Draft`, ending the request with "To approve, type `/design-brief continue approved`."
- [ ] Ends every interview message with the `/design-brief continue` reply line
- [ ] On `/design-brief continue approved`, sets Status to `Approved` and hands off naming `/design-plan`
- [ ] Specs unavailable variant: says it cannot create a native Spec, writes the Spec as a locked text frame `Spec — <topic>` inside a `— Specs —` section with all sixteen sections and the Status line, and `/design-plan` later finds it there

## Baseline (without skill)

## Result (with skill)

## Credits used
