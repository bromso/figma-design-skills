<!-- include: partials/views.md -->

### Procedure

1. Run discovery (see Discovery) before composing.
2. Confirm the tokens and components each screen needs already exist. If one or two are missing, stop and say which ones, then suggest `/build-tokens` or `/build-components`; if several are missing, suggest `/design-brief` instead. Never improvise with ad-hoc fills.
3. Compose each screen from instances with auto layout, real content, and one hero element.
4. Build every breakpoint and state the Spec lists.
5. Verify against the checks above; fix any failure before continuing.
6. Report what was built, then hand off (see Before you finish).

### Common mistakes

| What goes wrong | The fix |
|---|---|
| A shape redraws what a component already does | Replace it with an instance |
| Lorem ipsum or filler text appears | Replace it with real content from the Spec |
| A container's children aren't in auto layout | Add auto layout |
| An error or empty state is missing | Build every state the Spec lists |
