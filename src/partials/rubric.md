## Anti-generic rubric

Check the canvas against each line. Any line that is true is a finding; name the node.

- One default-feeling typeface (Inter, Roboto, Arial, system UI) is used for everything.
- A gradient is decoration rather than carrying meaning or depth.
- Cards or tiles sit at equal weight with no clear primary.
- The hero is a big number with a gradient accent.
- Placeholder content remains: lorem ipsum, "Title", "John Doe", grey boxes for images.
- Colour is the only carrier of meaning (status, error, selection) with no icon or label.
- Body text contrast is below 4.5:1 against its background.
- A touch target is under 44 x 44 px.
- Text is clipped, truncated without intent, or overflows its frame.
- A spacing value falls off the 4/8 rhythm.
- An interactive component lacks a hover or pressed state.
- An empty, error, or loading state the Spec lists is missing.
- More than two typefaces appear on one screen.
- A screen the Spec names a hero for has none, or more than one competes for it. With no Spec, check primary screens only, never settings, tables, or forms.
- Icons mix sets, stroke weights, or sizes.

### UX rules by priority

| # | Rule | Check |
|---|---|---|
| 1 | Contrast | body 4.5:1, large text and UI parts 3:1 |
| 2 | Touch targets | 44 x 44 px minimum, 8 px apart |
| 3 | Hierarchy | one primary action and one hero per screen |
| 4 | Readability | body 16 px on mobile, 45-75 characters a line, line height 1.4-1.6 |
| 5 | Feedback | hover, pressed, focus, disabled on every control |
| 6 | States | empty, loading, error each say what happened and what to do next |
| 7 | Rhythm | 4/8 spacing; related items closer than unrelated ones |
| 8 | Breakpoints | each Spec breakpoint reflows; nothing scrolls sideways at 360 px |
| 9 | Labels | visible label on every input, never placeholder only; errors beside the field |
| 10 | Consistency | same job, same component; one icon set, one stroke |
