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

If the file has no Spec, use Budget mode `Standard` unless the user says otherwise; Discovery below still runs against the file, but there is no Spec section to write the result into, so just use it for this run. If a Spec exists and its Status is `Built` or `Building`, read Budget and Existing assets from it, and follow the existing-assets rule in Motion rules below.

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


## Motion rules

- Check that motion is available before starting. If motion is not available, stop and say: Motion is not enabled on this account. Record it in the Build log if one exists; otherwise say so in the report.
- Animate meaning only: a state change, a hierarchy shift, or feedback. Never animate for decoration.
- Keep micro-interaction durations between 100 and 300 ms. Ease out on entrances, ease in on exits.
- Reuse one animation style across components instead of redefining it each time.
- Never animate a top-level frame.
- Modify an existing asset only when the Spec lists it under Existing assets → in scope for change.

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

There is no Plan to size a next run from here, so skip the size shape in Before you finish below; close with exactly this line instead:

`Next: run /design-review to check it, or /design-brief for a larger piece of work.`

## Before you finish

Close with one short summary line, then a hand-off line in this exact shape:

`Next: run /<command>. Expect a <small|medium|large> run.`

Never ask the user to send a second prompt for work this run can finish; only hand off to the next command when the task genuinely requires a new run.

