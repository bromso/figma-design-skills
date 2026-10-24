# Listing: /design-plan

## Tagline

Turns your approved Spec into an ordered, verifiable build plan.

## Description

Reads an approved Figma Spec and writes an ordered build plan into it: every step grouped tokens → components → views → motion, with its inputs named and a concrete verification check attached, so `/design-build` knows exactly what "done" means for each step. Splits the plan into more than one run when your credit budget requires it, and marks non-essential steps optional so they can be skipped cheaply.

Use it right after `/design-brief`, once you've approved the Spec in chat, and before `/design-build`. It refuses — with a specific message — if the Spec isn't yet Approved, or is already planned, building, or built; it never touches the canvas itself.

Second command in the four-command workflow: `/design-brief` → `/design-plan` → `/design-build` → `/design-review`.

Reads the Budget mode — Lean, Standard, or Generous — straight from the Spec and uses it to decide how the plan is split; you don't answer a question for this command.

Typical cost: to be recorded after testing.

## Category

orchestrate & prompt

## Support

Support contact: TBD
