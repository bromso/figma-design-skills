---
name: build-views
description: Composes a screen from the file's components and tokens with real content and states. Use when the user asks for a screen, page, or view.
---

# Build views

Compose the screen the user asked for from the file's existing components and tokens, with real content and the states it needs — nothing more.

## Scope

Build only the screen, page, or view the user named, with the breakpoints and states it needs. Never promote the request into a full set of screens nobody asked about.

If the request is clearly a project — several screens, or anything that needs more than about five steps — say so in one line and suggest `/design-brief` instead, then stop.

If the file has no Spec, use Budget mode `Standard` unless the user says otherwise; Discovery below still runs against the file, but there is no Spec section to write the result into, so just use it for this run. If a Spec exists and its Status is `Built` or `Building`, read Budget and Existing assets from it.

If the request is ambiguous, ask once, in one message, before creating or changing anything. Never ask a question once building has started.

## Discovery

In Lean, inventory only the connected library and the current page; do not open other pages.

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

| Mode | Review findings | Fix passes per step | Screenshots | Brief question rounds |
|---|---|---|---|---|
| Lean | 5 | 1 | one at the end | ≤3 per message |
| Standard | 10 | 1 | one per composed screen | ≤3 per message |
| Generous | 15 | 2 | one per composed screen | 1 per message if instructions persist |

Default is Standard when the user doesn't know.


## Views rules

- Compose screens from component instances, never redrawn shapes.
- Apply auto layout to every container whose children relate to each other.
- Use real content. Never lorem ipsum or placeholder text.
- Give each screen exactly one hero element.
- Pull type scale and spacing from tokens, not arbitrary values.
- Build the breakpoints the Spec lists, no others.
- Build every empty, loading, and error state the Spec lists.

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

## Before you finish

Close with one short summary line, then exactly this line:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`
