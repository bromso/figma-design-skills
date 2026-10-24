---
name: add-prototype
description: Records prototype intent for later wiring. Use when the user asks for prototype flows, interactions, or transitions. Pending Figma agent support.
---

# Add prototype

Records prototype intent (flows, triggers, transitions) so it can be wired once Figma supports it.

Pending: the Figma agent does not support prototyping and interactions yet.

## Scope

This command records prototype intent — which flows, triggers, and transitions the user wants — and does nothing else. It never builds reactions, overlays, or transitions.

If a Spec exists, write the intent into its Flows section. If none exists, create a text frame named `Prototype intent — <topic>` and write the intent there instead.

If the request is ambiguous, ask once, in one message, before writing anything. Never modify any existing node, variable, or style; the only writes are the Spec's Flows section or the intent text frame.

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
| Lean | 5 | 1 | one at the end | ≤3 per message, ≤3 rounds |
| Standard | 10 | 1 | one per composed screen | ≤3 per message |
| Generous | 15 | 2 | one per composed screen | 1 per message if instructions persist |

Default is Standard when the user doesn't know.


## Prototype rules

Pending: the Figma agent does not support prototyping and interactions yet.

- Give every flow the Spec lists a starting point.
- Add exactly one reaction per trigger the Spec lists.
- Use smart animate between layers that match by name and structure.
- Use an overlay for any dialog or modal.
- Since this capability is unsupported today, record the intent in the Spec instead of attempting it.

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

## Before you finish

Close with one short summary line, then exactly this line:

`Next: run /design-brief when you want this built.`
