---
name: build-tokens
description: Creates or extends variable collections, modes, and styles the right way. Use when the user asks for tokens, variables, modes, or theming.
---

# Build tokens

Create or extend the variable collections, modes, primitives, and styles the user asked for — nothing more.

## Scope

Build only the collections, modes, primitives, aliases, or styles the user named. Never promote the request into a full design system or a token library covering areas nobody asked about.

If the request is clearly a project — a whole token set spanning several collections, or anything that needs more than about five steps — say so in one line and suggest `/design-brief` instead, then stop.

If the file has no Spec, use Budget mode `Standard` unless the user says otherwise; Discovery below still runs against the file, but there is no Spec section to write the result into, so just use it for this run. If a Spec exists and its Status is `Built` or `Building`, read Budget and Existing assets from it, and follow the existing-assets rule in Tokens rules below.

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


## Tokens rules

- Reuse a compatible existing collection before creating a new one.
- Size the architecture to the token count: under 50 tokens, one collection with Light and Dark modes; 50 to 200, split into Primitives plus Color (Light/Dark), Spacing, and Typography collections; 200 or more, multiple semantic collections.
- Alias semantic variables to primitives. Never duplicate a raw value across variables.
- Scope every variable to where it applies. Never leave a variable set to all scopes.
- Name variables with slashes: `color/bg/primary`, `spacing/md`, `radius/sm`.
- Create a text style or effect style for any role that repeats.
- Modify an existing asset only when the Spec lists it under Existing assets → in scope for change.

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

There is no Plan to size a next run from here, so skip the size shape in Before you finish below; close with exactly this line instead:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`

## Before you finish

Close with one short summary line, then a hand-off line in this exact shape:

`Next: run /<command>. Expect a <small|medium|large> run.`

Never ask the user to send a second prompt for work this run can finish; only hand off to the next command when the task genuinely requires a new run.

