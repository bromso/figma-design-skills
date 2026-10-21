---
name: build-components
description: Builds a component or component set with variants, properties, and token bindings. Use when the user asks for a component.
---

# Build components

Build the component or component set the user asked for, with its variants, properties, and bindings — nothing more.

## Scope

Build only the component or component set the user named, with the variants and properties it needs. Never promote the request into a full component library covering components nobody asked about.

If the request is clearly a project — several components, or anything that needs more than about five steps — say so in one line and suggest `/design-brief` instead, then stop.

If the file has no Spec, use Budget mode `Standard` unless the user says otherwise; Discovery below still runs against the file, but there is no Spec section to write the result into, so just use it for this run. If a Spec exists and its Status is `Built` or `Building`, read Budget and Existing assets from it, and follow the existing-assets rule in Components rules below.

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


## Components rules

- Build foundations (tokens, styles) before components.
- Name variants `Property=Value`.
- Cap a variant matrix at 30 combinations; split into a second component set beyond that.
- Use instance swap for icons. Never create a variant per icon.
- Bind fill, stroke, padding, radius, and gap to a variable whenever a matching token exists.
- Write a description on every component set.
- Lay variants out in a grid. Never stack them at the same position.
- Modify an existing asset only when the Spec lists it under Existing assets → in scope for change.

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

There is no Plan to size a next run from here, so skip the size shape in Before you finish below; close with exactly this line instead:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`

## Before you finish

Close with one short summary line, then a hand-off line in this exact shape:

`Next: run /<command>. Expect a <small|medium|large> run.`

Never ask the user to send a second prompt for work this run can finish; only hand off to the next command when the task genuinely requires a new run.

