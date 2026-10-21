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

<!-- include: partials/discovery.md -->

<!-- include: partials/credit-modes.compact.md -->

<!-- include: partials/components.full.md -->

## Report

Send one message when the work is done: the component set, variants, and properties created or changed, by name; what was verified and how (the checks above, plus any screenshot read); and anything left undone and why.

## Before you finish

Close with one short summary line, then exactly this line:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`
