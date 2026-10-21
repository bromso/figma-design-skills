## Views rules

- Compose screens from component instances, never redrawn shapes.
- Apply auto layout to every container whose children relate to each other.
- Use real content. Never lorem ipsum or placeholder text.
- Give each screen exactly one hero element.
- Pull type scale and spacing from tokens, not arbitrary values.
- Build the breakpoints the Spec lists, no others.
- Build every empty, loading, and error state the Spec lists.

### Verify

- No instance is detached from its component.
- No text overflows or clips its frame.
- Fills are bound to a variable wherever a matching token exists.
- Every state the Spec lists is present.
