---
name: build-components
description: Builds a component or component set with variants, properties, and token bindings. Use when the user asks for a component.
---

# Build components

Build the component or component set the user asked for, with its variants, properties, and bindings — nothing more.

## Scope

Build only the component or component set the user named, with the variants and properties it needs. Never promote the request into a full component library covering components nobody asked about.

If the request is clearly a project — several components, or anything that needs more than about five steps — say so in one line and suggest `/design-brief` instead, then stop.

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


## Components rules

- Build foundations (tokens, styles) before components.
- Name variants `Property=Value`.
- Cap a variant matrix at 30 combinations; split into a second component set beyond that.
- Use instance swap for icons. Never create a variant per icon.
- Bind fill, stroke, padding, radius, and gap to a variable whenever a matching token exists.
- Write a description on every component set.
- Lay variants out in a grid. Never stack them at the same position.

### Verify

- Variant count equals the planned matrix.
- Every variant property matches the Spec if one exists, otherwise the user's request.
- Bindable properties are bound, not hard-coded.
- The component set has a description.
- No two variants occupy the same position.


### Procedure

1. Run discovery (see Discovery) before building.
2. Confirm the foundations each component will bind to already exist.
3. Define the variant properties and matrix, capped at 30 combinations.
4. Build each variant, binding to variables and using instance swap for icons.
5. Add a description to the component set and lay variants out in a grid.
6. Verify against the checks above; fix any failure before continuing.
7. Report what was built, then hand off (see Before you finish).

### Common mistakes

| What goes wrong | The fix |
|---|---|
| A variant exists per icon | Use instance swap instead |
| Variants stack at the same position | Lay them out in a grid |
| A matrix grows past 30 combinations | Split into a second component set |
| A fill or radius is hard-coded | Bind it to the matching variable |


## Report

Send one message when the work is done: the component set, variants, and properties created or changed, by name; what was verified and how (the checks above, plus any screenshot read); and anything left undone and why.

## Before you finish

Close with one short summary line, then exactly this line:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`
