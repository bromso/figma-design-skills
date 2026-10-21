## Tokens rules

- Reuse a compatible existing collection before creating a new one.
- Size the architecture to the token count: under 50 tokens, one collection with Light and Dark modes; 50 to 200, split into Primitives plus Color (Light/Dark), Spacing, and Typography collections; 200 or more, multiple semantic collections.
- Alias semantic variables to primitives. Never duplicate a raw value across variables.
- Scope every variable to where it applies. Never leave a variable set to all scopes.
- Name variables with slashes: `color/bg/primary`, `spacing/md`, `radius/sm`.
- Create a text style or effect style for any role that repeats.
- Modify an existing asset only when the Spec lists it under Existing assets → in scope for change.

### Verify

- Collection and mode names match the Spec.
- Variable counts match the Spec's Foundations section.
- Every alias resolves in each mode.
- No variable is left unscoped.
