## Prototype rules

Pending: the Figma agent does not support prototyping and interactions yet.

- Give every flow the Spec lists a starting point.
- Add exactly one reaction per trigger the Spec lists.
- Use smart animate between layers that match by name and structure.
- Use an overlay for any dialog or modal.
- Since this capability is unsupported today, record the intent in the Spec instead of attempting it.
- Modify an existing asset only when the Spec lists it under Existing assets → in scope for change.

### Verify

- Every flow in the Spec has a starting point recorded.
- Every transition the Spec implies is recorded.

### Procedure

1. Run discovery (see Discovery) before starting.
2. Record which flows, triggers, and transitions the Spec asks for.
3. Tell the user prototyping isn't supported yet, and record the intent in the Spec rather than building it.
4. Verify against the checks above.
5. Report what was recorded, then hand off (see Before you finish).

### Common mistakes

| What goes wrong | The fix |
|---|---|
| A flow is attempted anyway | Stop; record the intent in the Spec instead |
| A reaction is added without a listed trigger | Remove it; only record what the Spec lists |
