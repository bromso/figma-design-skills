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

<!-- include: partials/discovery.md -->

<!-- include: partials/credit-modes.md -->

<!-- include: partials/tokens.full.md -->

## Report

Send one message when the work is done: the collections, modes, and variables created or changed, by name; what was verified and how (the checks above, plus any screenshot read); and anything left undone and why.

There is no Plan to size a next run from here, so skip the size shape in Before you finish below; close with exactly this line instead:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`

<!-- include: partials/handoff.md -->
