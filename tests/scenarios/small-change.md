# Scenario: small-change

Tests that `/design-brief` correctly sizes a small, well-scoped request, skips `/design-plan`, and gets to a build in two commands total.

## Prompt

1. `/design-brief` — "add a disabled state to Button"
2. Answer the short interview, then approve by typing `/design-brief continue approved`.
3. `/design-build`

## File setup

A Figma Design file with an existing Button component set (Default and Hover variants already present), no Spec yet in the file.

## Budget mode

Standard

## Expected

- [ ] Sizes the request as a "Small change" and says so out loud with the reason, distinct from a quick task or a full project
- [ ] Runs a short interview (one or two rounds), not the full project interview
- [ ] Never mutates the canvas during `/design-brief` itself, beyond writing the Spec
- [ ] Writes a short Spec that already contains a one-to-three-step Plan in the exact `N. [essential|optional] <domain>: ...` format
- [ ] Sets Status to `Planned` directly, skipping the `Approved`-only gate that would otherwise require `/design-plan`
- [ ] Hand-off names `/design-build` as the next and only remaining command — two commands total
- [ ] `/design-build` then builds the Disabled variant, binding its properties to existing tokens where a matching one exists, and verifies the new variant count and that no two variants share a position
- [ ] Build log and final report follow the same formats as a full project build

## Baseline (without skill)

## Result (with skill)

## Credits used
