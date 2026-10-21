---
name: add-motion
description: Adds purposeful micro-interactions and animation using the file's tokens. Use when the user asks for motion or animation.
---

# Add motion

Add the micro-interactions and animation the user asked for, using the file's existing tokens and animation styles — nothing more.

Before anything else, confirm motion is available for this file (see Motion rules, below, for the check). If it is not, stop and say exactly: Motion is not enabled on this account. Do not continue to Scope, Discovery, or any build step, and do not send the hand-off below.

## Scope

Build only the interactions the user named. Never promote the request into animating every component in the file.

If the request is clearly a project — motion across many components and flows, or anything that needs more than about five steps — say so in one line and suggest `/design-brief` instead, then stop.

If the file has no Spec, use Budget mode `Standard` unless the user says otherwise; Discovery below still runs against the file, but there is no Spec section to write the result into, so just use it for this run. If a Spec exists and its Status is `Built` or `Building`, read Budget and Existing assets from it.

If the request is ambiguous, ask once, in one message, before creating or changing anything. Never ask a question once building has started.

<!-- include: partials/discovery.md -->

<!-- include: partials/credit-modes.compact.md -->

<!-- include: partials/motion.full.md -->

## Report

Send one message when the work is done: the interactions and animation styles created or changed, by name; what was verified and how (the checks above, plus any screenshot read); and anything left undone and why.

## Before you finish

Close with one short summary line, then exactly this line:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`
