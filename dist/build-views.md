---
name: build-views
description: Composes a screen from the file's components and tokens with real content and states. Use when the user asks for a screen, page, or view.
---

# Build views

Compose the screen the user asked for from the file's existing components and tokens, with real content and the states it needs — nothing more.

## Scope

Build only the screen, page, or view the user named, with the breakpoints and states it needs. Never promote the request into a full set of screens nobody asked about.

If the request is clearly a project — several screens, or anything that needs more than about five steps — say so in one line and suggest `/design-brief` instead, then stop.

If the file has no Spec, use Budget mode `Standard` unless the user says otherwise; Discovery below still runs against the file, but there is no Spec section to write the result into, so just use it for this run. If a Spec exists and its Status is `Built` or `Building`, read Budget and Existing assets from it, and follow the existing-assets rule in Views rules below.

If the request is ambiguous, ask once, in one message, before creating or changing anything. Never ask a question once building has started.

## Discovery

If no library is connected and one exists for this file, ask the user to connect it before continuing.

Inventory, once, directly from the file and any connected libraries:

- Connected libraries and what they publish.
- Local variable collections, their modes, and roughly how many variables each holds.
- Local components and component sets.
- Text styles and effect styles.
- Existing pages and screens.
- Naming conventions already in use.

Write the result into the Spec's Discovery section as soon as it's gathered, so later commands read it from the Spec instead of re-scanning the file.


## Budget modes

Credits are the user's scarce resource on every run. Follow five principles, in priority order:

1. Prefer fewer runs over shorter ones. Batch work into as few prompts as the task allows, and never ask the user to send another prompt for something this run can finish.
2. Front-load intent. Ask enough up front to avoid an expensive fix-it run after a wrong build.
3. Discover once, record it. Do file and library discovery in `/design-brief` and read it back from the Spec afterward; never re-scan.
4. Scale verification to the budget. Structural checks are cheap; screenshots and re-render loops are not.
5. Say what things cost. End with a one-line estimate of what the next command is likely to cost.

`/design-brief` asks which mode applies and records it in the Spec as `Budget: Lean | Standard | Generous`. Every later command reads the Budget from the Spec instead of asking again.

| Mode | Review findings | Fix passes per step | Screenshots | Brief question rounds |
|---|---|---|---|---|
| Lean | 5 | 1 | one at the end | ≤3 per message |
| Standard | 10 | 1 | one per composed screen | ≤3 per message |
| Generous | 15 | 2 | one per composed screen | 1 per message if instructions persist |

Lean suits a Starter seat or a Dev/Collab/View seat (500 credits a month, capped at 150 a day): split the plan so no single run is larger than medium. Standard suits a Professional Full seat. Generous suits an Organization or Enterprise seat, or purchased credits.

Default is Standard when the user doesn't know. Fold the budget question into the brief's first round; never spend a run just to ask about it.


## Views rules

- Compose screens from component instances, never redrawn shapes.
- Apply auto layout to every container whose children relate to each other.
- Use real content. Never lorem ipsum or placeholder text.
- Give each screen exactly one hero element.
- Pull type scale and spacing from tokens, not arbitrary values.
- Build the breakpoints the Spec lists, no others.
- Build every empty, loading, and error state the Spec lists.
- Modify an existing asset only when the Spec lists it under Existing assets → in scope for change.

### Verify

- No instance is detached from its component.
- No text overflows or clips its frame.
- Fills are bound to a variable wherever a matching token exists.
- Every state the Spec lists is present.


### Procedure

1. Run discovery (see Discovery) before composing.
2. Confirm the tokens and components each screen needs already exist. If one or two are missing, stop and say which ones, then suggest `/build-tokens` or `/build-components`; if several are missing, suggest `/design-brief` instead. Never improvise with ad-hoc fills.
3. Compose each screen from instances with auto layout, real content, and one hero element.
4. Build every breakpoint and state the Spec lists.
5. Verify against the checks above; fix any failure before continuing.
6. Report what was built, then hand off (see Before you finish).

### Common mistakes

| What goes wrong | The fix |
|---|---|
| A shape redraws what a component already does | Replace it with an instance |
| Lorem ipsum or filler text appears | Replace it with real content from the Spec |
| A container's children aren't in auto layout | Add auto layout |
| An error or empty state is missing | Build every state the Spec lists |


## Report

Send one message when the work is done: the screen, breakpoints, and states created or changed, by name; what was verified and how (the checks above, plus any screenshot read); and anything left undone and why.

There is no Plan to size a next run from here, so skip the size shape in Before you finish below; close with exactly this line instead:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`

## Before you finish

Close with one short summary line, then a hand-off line in this exact shape:

`Next: run /<command>. Expect a <small|medium|large> run.`

Never ask the user to send a second prompt for work this run can finish; only hand off to the next command when the task genuinely requires a new run.

