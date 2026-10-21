<!-- include: partials/components.md -->

### Procedure

1. Run discovery (see Discovery) before building.
2. Confirm the foundations each component will bind to already exist.
3. Define the variant properties and matrix, capped at 30 combinations.
4. Build each variant, binding to variables and using instance swap for icons.
5. Add a description to the component set and lay variants out in a grid.
6. Verify against the checks above; fix any failure before continuing.
7. Report what was built, then hand off (see Before you finish).

### Common mistakes

| What goes wrong | The fix |
|---|---|
| A variant exists per icon | Use instance swap instead |
| Variants stack at the same position | Lay them out in a grid |
| A matrix grows past 30 combinations | Split into a second component set |
| A fill or radius is hard-coded | Bind it to the matching variable |
