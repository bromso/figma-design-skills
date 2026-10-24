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

With a Spec, modify existing assets only when its Existing assets section lists them under in scope for change. With no Spec, modify only the existing assets the user's request names; everything else is read-only.

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
| Lean | 5 | 1 | one at the end | ≤3 per message, ≤3 rounds |
| Standard | 10 | 1 | one per composed screen | ≤3 per message |
| Generous | 15 | 2 | one per composed screen | 1 per message if instructions persist |

Default is Standard when the user doesn't know.


## Motion rules

- Check that motion is available before starting. If motion is not available, stop and say: Motion is not enabled on this account. Record it in the Build log if one exists; otherwise say so in the report.
- Animate meaning only: a state change, a hierarchy shift, or feedback. Never animate for decoration.
- Keep micro-interaction durations between 100 and 300 ms. Ease out on entrances, ease in on exits.
- Reuse one animation style across components instead of redefining it each time.
- Never animate a top-level frame.

### Verify

- Every interaction the Spec lists exists.
- Durations fall within 100 to 300 ms.
- Animation styles are reused, not duplicated.


### Procedure

1. Run discovery (see Discovery) and confirm motion is available before starting.
2. If motion is not available, stop and report it per the rule above.
3. Build each interaction the Spec lists, reusing animation styles where possible.
4. Verify against the checks above; fix any failure before continuing.
5. Report what was built, then hand off (see Before you finish).

### Common mistakes

| What goes wrong | The fix |
|---|---|
| A top-level frame gets animated | Animate the element that changes instead |
| A duration lands outside 100 to 300 ms | Adjust it to fit the range |
| The same animation is redefined per component | Create one animation style and reuse it |
| Motion is added for decoration | Remove it unless it conveys meaning |


## Report

Send one message when the work is done: the interactions and animation styles created or changed, by name; what was verified and how (the checks above, plus any screenshot read); and anything left undone and why.

## Before you finish

Close with one short summary line, then exactly this line:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`
