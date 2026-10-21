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
