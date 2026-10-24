# Testing the Figma Design Skills

The skills in `dist/` are untested in Figma until a person runs the probes and scenarios in this directory. Nothing here is automated; see spec §8 for why (no browser automation in v1).

## Probes

Three things to test before trusting any scenario result, in this order. Each probe is run once by a person in Figma and its result recorded directly below its heading.

### Probe 1: size limit

Upload the two largest real skills first, `dist/design-brief.md` and `dist/design-build.md`, via *Add context → Skills → Upload a file*. If both are accepted, upload dummy skills of 20 000 and then 40 000 bytes to find the ceiling, and record the largest accepted size and the exact error text Figma shows for any rejected one. If either real file is rejected, record the exact error text and the largest size that was accepted. Then set `maxBytes` in `skills.config.json` to the largest accepted size minus 10%.

### Probe 2: Specs

Ask the agent to create a Spec named `Spec — Probe` with headings Intent, Audience, Status. Then ask it to update Status. Record whether it worked, and where the Spec appeared (a native Figma Spec object, or a text frame, or something else).

### Probe 3: instruction persistence

Upload `tests/probe-persist.md` (a tiny `/probe-persist` skill that asks one question per message) via *Add context → Skills → Upload a file*, then type `/probe-persist`. Answer three times in a row without re-typing the command. Record whether the agent kept following the skill's instructions through all three replies.

## Tester access

Fill in before running any scenario.

- Plan and seat:
- Motion enabled?:
- Credits available this month:

## How to run a scenario

1. Upload the skills under test from `dist/` via *Add context → Skills → Upload a file* (one file per skill; `dist/pending/add-prototype.md` is not uploaded, it isn't published yet).
2. Open a Figma file matching the scenario's **File setup** section.
3. Set the Budget mode the scenario names — either by stating it in the prompt, or, if the Spec already exists, by editing its Budget line directly.
4. Send the scenario's **Prompt**.
5. Record the outcome under **Result (with skill)** in the scenario file, and the credit meter value shown under each prompt into **Credits used**.
6. For `empty-file-project`, `small-change`, and `library-file-project` only: run the same prompt once first *without* the skill installed, and record that under **Baseline (without skill)**, before repeating it with the skill installed. Every other scenario already reads "not recorded" under Baseline and does not need a baseline run.

## What to record

For every scenario run:

- The exact Result: what the agent did, in enough detail to check it against the Expected checklist line by line.
- Which Expected lines passed and which didn't; don't mark a line passed on a guess.
- The credit meter value shown under each prompt, and the total for the scenario, under Credits used.
- Anything the Expected checklist didn't anticipate — a new failure mode, a surprising success — as a short note at the end of the Result section.
- Whether the scenario was run in Lean or Standard mode (per spec §8, run Lean first, then Standard, where both apply).
