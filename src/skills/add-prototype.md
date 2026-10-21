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

<!-- include: partials/discovery.md -->

<!-- include: partials/credit-modes.md -->

<!-- include: partials/prototype.full.md -->

## Report

Send one message when the work is done: where the intent was recorded (the Spec's Flows section, or the text frame's name); which flows, triggers, and transitions were recorded; and anything left undone and why.

There is no Plan to size a next run from here, so skip the size shape in Before you finish below; close with exactly this line instead:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`

<!-- include: partials/handoff.md -->
