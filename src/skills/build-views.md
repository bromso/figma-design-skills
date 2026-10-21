---
name: build-views
description: Composes a screen from the file's components and tokens with real content and states. Use when the user asks for a screen, page, or view.
---

# Build views

Compose the screen the user asked for from the file's existing components and tokens, with real content and the states it needs — nothing more.

## Scope

Build only the screen, page, or view the user named, with the breakpoints and states it needs. Never promote the request into a full set of screens nobody asked about.

If the request is clearly a project — several screens, or anything that needs more than about five steps — say so in one line and suggest `/design-brief` instead, then stop.

If the file has no Spec, use Budget mode `Standard` unless the user says otherwise; Discovery below still runs against the file, but there is no Spec section to write the result into, so just use it for this run. If a Spec exists and its Status is `Built` or `Building`, read Budget and Existing assets from it, and follow the existing-assets rule in Views rules below.

If the request is ambiguous, ask once, in one message, before creating or changing anything. Never ask a question once building has started.

<!-- include: partials/discovery.md -->

<!-- include: partials/credit-modes.md -->

<!-- include: partials/views.full.md -->

## Report

Send one message when the work is done: the screen, breakpoints, and states created or changed, by name; what was verified and how (the checks above, plus any screenshot read); and anything left undone and why.

There is no Plan to size a next run from here, so skip the size shape in Before you finish below; close with exactly this line instead:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`

<!-- include: partials/handoff.md -->
