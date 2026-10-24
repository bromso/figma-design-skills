<!-- include: partials/motion.md -->

### Procedure

1. Run discovery (see Discovery) and confirm motion is available before starting.
2. If motion is not available, stop and report it per the rule above.
3. Build each interaction the Spec lists, reusing animation styles where possible.
4. Verify against the checks above; fix any failure before continuing.
5. Report what was built, then hand off (see Before you finish).

### Common mistakes

| What goes wrong | The fix |
|---|---|
| A top-level frame gets animated | Animate the element that changes instead |
| A duration lands outside 100 to 300 ms | Adjust it to fit the range |
| The same animation is redefined per component | Create one animation style and reuse it |
| Motion is added for decoration | Remove it unless it conveys meaning |
