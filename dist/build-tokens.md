---
name: build-tokens
description: Creates or extends variable collections, modes, and styles the right way. Use when the user asks for tokens, variables, modes, or theming.
---

# Build tokens

Create or extend the variable collections, modes, primitives, and styles the user asked for — nothing more.

## Scope

Build only the collections, modes, primitives, aliases, or styles the user named. Never promote the request into a full design system or a token library covering areas nobody asked about.

If the request is clearly a project — a whole token set spanning several collections, or anything that needs more than about five steps — say so in one line and suggest `/design-brief` instead, then stop.

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


## Tokens rules

- Reuse a compatible existing collection before creating a new one.
- Size the architecture to the token count: under 50 tokens, one collection with Light and Dark modes; 50 to 200, split into Primitives plus Color (Light/Dark), Spacing, and Typography collections; 200 or more, multiple semantic collections.
- Alias semantic variables to primitives. Never duplicate a raw value across variables.
- Scope every variable to where it applies. Never leave a variable set to all scopes.
- Name variables with slashes: `color/bg/primary`, `spacing/md`, `radius/sm`.
- Create a text style or effect style for any role that repeats.

### Verify

- Collection and mode names match the Spec if one exists, otherwise the user's request.
- Variable counts match the Spec's Foundations section if one exists, otherwise the user's request.
- Every alias resolves in each mode.
- No variable is left unscoped.


### Procedure

1. Run discovery (see Discovery) before creating anything.
2. Choose the collection architecture from the token count the Spec implies.
3. Create or extend collections, modes, and primitives first, then the semantic aliases.
4. Name and scope every variable as it's created.
5. Add text and effect styles for roles that repeat.
6. Verify against the checks above; fix any failure before continuing.
7. Report what was built, then hand off (see Before you finish).

### Common mistakes

| What goes wrong | The fix |
|---|---|
| A second Primitives collection appears | Search existing collections first; extend, don't duplicate |
| A raw value sits next to a semantic variable | Alias it to a primitive instead |
| A variable is scoped to all scopes | Narrow the scope to where it's actually used |
| Names use camelCase or spaces | Rename to slash-separated form |


## Report

Send one message when the work is done: the collections, modes, and variables created or changed, by name; what was verified and how (the checks above, plus any screenshot read); and anything left undone and why.

## Before you finish

Close with one short summary line, then exactly this line:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`
