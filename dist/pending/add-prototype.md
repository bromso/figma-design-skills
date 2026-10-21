---
name: add-prototype
description: Records prototype intent for later wiring. Use when the user asks for prototype flows, interactions, or transitions. Pending Figma agent support.
---

# Add prototype

Pending: the Figma agent does not support prototyping and interactions yet.

## Scope

This command records prototype intent — which flows, triggers, and transitions the user wants — and does nothing else. It never builds reactions, overlays, or transitions.

If a Spec exists, write the intent into its Flows section. If none exists, create a text frame named `Prototype intent — <topic>` and write the intent there instead.

If the request is ambiguous, ask once, in one message, before writing anything.

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


## Prototype rules

Pending: the Figma agent does not support prototyping and interactions yet.

- Give every flow the Spec lists a starting point.
- Add exactly one reaction per trigger the Spec lists.
- Use smart animate between layers that match by name and structure.
- Use an overlay for any dialog or modal.
- Since this capability is unsupported today, record the intent in the Spec instead of attempting it.
- Modify an existing asset only when the Spec lists it under Existing assets → in scope for change.

### Verify

- Every flow in the Spec has a starting point recorded.
- Every transition the Spec implies is recorded.

### Procedure

1. Run discovery (see Discovery) before starting.
2. Record which flows, triggers, and transitions the Spec asks for.
3. Tell the user prototyping isn't supported yet, and record the intent in the Spec rather than building it.
4. Verify against the checks above.
5. Report what was recorded, then hand off (see Before you finish).

### Common mistakes

| What goes wrong | The fix |
|---|---|
| A flow is attempted anyway | Stop; record the intent in the Spec instead |
| A reaction is added without a listed trigger | Remove it; only record what the Spec lists |


## Report

Send one message when the work is done: where the intent was recorded (the Spec's Flows section, or the text frame's name); which flows, triggers, and transitions were recorded; and anything left undone and why.

There is no Plan to size a next run from here, so skip the size shape in Before you finish below; close with exactly this line instead:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`

## Before you finish

Close with one short summary line, then a hand-off line in this exact shape:

`Next: run /<command>. Expect a <small|medium|large> run.`

Never ask the user to send a second prompt for work this run can finish; only hand off to the next command when the task genuinely requires a new run.

