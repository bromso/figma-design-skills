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

If the request is ambiguous, ask once, in one message, before writing anything.

<!-- include: partials/discovery.md -->

<!-- include: partials/credit-modes.compact.md -->

<!-- include: partials/prototype.full.md -->

## Report

Send one message when the work is done: where the intent was recorded (the Spec's Flows section, or the text frame's name); which flows, triggers, and transitions were recorded; and anything left undone and why.

## Before you finish

Close with one short summary line, then exactly this line:

`Next: run /design-brief when you want this built.`
