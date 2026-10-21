# Listing: /build-tokens

## Tagline

Sets up variable collections, modes, and styles the right way, nothing more.

## Description

Creates or extends exactly the variable collections, modes, primitives, semantic aliases, and text/effect styles you ask for: reuses a compatible existing collection instead of duplicating one, sizes the collection architecture to how many tokens you need, aliases semantic variables to primitives rather than hard-coding raw values twice, scopes every variable to where it's actually used, and names everything with the slash convention (`color/bg/primary`, `spacing/md`).

Use it on its own when you just want tokens done well — "set up color and spacing tokens for a dashboard, light and dark mode." It discovers what's already in the file first, and if the request turns out to be a whole design system rather than one token set, it says so and points you at `/design-brief` instead of quietly expanding the job.

Standalone domain skill — not part of the four-command sequence, though its full rules are also the condensed ones `/design-build` carries for its tokens step.

Defaults to Standard depth when there's no Spec to read a Budget mode from; reads Budget from the Spec when one exists.

Typical cost: to be recorded after testing.

## Category

design systems

## Support

Support contact: TBD
