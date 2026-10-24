<!-- include: partials/tokens.md -->

### Procedure

1. Run discovery (see Discovery) before creating anything.
2. Choose the collection architecture from the token count the Spec or the request implies.
3. Create or extend collections, modes, and primitives first, then the semantic aliases.
4. Name and scope every variable as it's created.
5. Add text and effect styles for roles that repeat.
6. Verify against the checks above; fix any failure before continuing.
7. Report what was built, then hand off (see Before you finish).

### Common mistakes

| What goes wrong | The fix |
|---|---|
| A second Primitives collection appears | Search existing collections first; extend, don't duplicate |
| A raw value sits next to a semantic variable | Alias it to a primitive instead |
| A variable is scoped to all scopes | Narrow the scope to where it's actually used |
| Names use camelCase or spaces | Rename to slash-separated form |
