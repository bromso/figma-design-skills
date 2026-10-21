## Components rules

- Build foundations (tokens, styles) before components.
- Name variants `Property=Value`.
- Cap a variant matrix at 30 combinations; split into a second component set beyond that.
- Use instance swap for icons. Never create a variant per icon.
- Bind fill, stroke, padding, radius, and gap to a variable whenever a matching token exists.
- Write a description on every component set.
- Lay variants out in a grid. Never stack them at the same position.
- Modify an existing asset only when the Spec lists it under Existing assets → in scope for change.

### Verify

- Variant count equals the planned matrix.
- Every variant property matches the Spec if one exists, otherwise the user's request.
- Bindable properties are bound, not hard-coded.
- The component set has a description.
- No two variants occupy the same position.
