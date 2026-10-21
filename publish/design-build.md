# Listing: /design-build

## Tagline

Runs your whole approved plan in one go, verifies every step, reports once.

## Description

Executes every step of the Spec's Plan in one unattended run — tokens, then components, then views, then motion — verifying each one at the depth your Budget mode allows, fixing failures before moving on, and logging progress to the Spec's Build log so a second prompt can resume cleanly if the plan was split. Never asks a question mid-run; a step it can't finish is logged `blocked` with the reason, and the rest of the run continues. Reports once at the end: what was built, what was verified and how, and what was blocked.

Use it after `/design-plan`, or straight after `/design-brief` for a small change whose Spec was already born `Planned`. It refuses — with a specific message — on a Spec that's still Draft or Approved, or already Built.

Third command in the four-command workflow: `/design-brief` → `/design-plan` → `/design-build` → `/design-review`.

Depth scales with the Spec's Budget mode — Lean, Standard, Generous — controlling how many screenshots are taken and how many fix passes run per step.

Typical cost: to be recorded after testing.

## Category

orchestrate & prompt

## Support

Support contact: TBD
