## Budget modes

Credits are the user's scarce resource. In priority order: prefer fewer runs over shorter ones, and never ask for another prompt for work this run can finish; front-load intent to avoid a fix-it run after a wrong build; discover once, record it in the Spec, never re-scan; scale verification to the budget; end with a one-line estimate of what the next command will cost.

Record the mode in the Spec as `Budget: Lean | Standard | Generous`; every later command reads it from there instead of asking.

| Mode | Review findings | Fix passes per step | Screenshots | Brief question rounds |
|---|---|---|---|---|
| Lean | 5 | 1 | one at the end | ≤3 per message, ≤3 rounds |
| Standard | 10 | 1 | one per composed screen | ≤3 per message |
| Generous | 15 | 2 | one per composed screen | 1 per message if instructions persist |

Lean suits a Starter or Dev/Collab/View seat (500 credits a month, 150 a day). Standard suits a Professional Full seat. Generous suits an Organization or Enterprise seat, or purchased credits. Default is Standard when the user doesn't know. Fold the budget question into the first round; never spend a run just to ask about it.
