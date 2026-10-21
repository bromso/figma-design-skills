# Listing: /build-components

## Tagline

Builds one component or component set with proper variants and bindings.

## Description

Builds the component or component set you ask for, with its variant matrix, properties, instance-swap slots, and token bindings done the right way: variants named `Property=Value`, laid out in a grid rather than stacked on top of each other, bindable properties bound to an existing matching variable instead of hard-coded, a written description on the set, and the matrix capped at 30 combinations before it's split.

Use it on its own when you want one component done well — "build a Badge component with Status and Size variants." It discovers what tokens and components already exist first, and if the request is really several components, it says so and points you at `/design-brief` instead of silently growing into a library.

Standalone domain skill — not part of the four-command sequence, though its full rules are also the condensed ones `/design-build` carries for its components step.

Defaults to Standard depth when there's no Spec to read a Budget mode from; reads Budget from the Spec when one exists.

Typical cost: to be recorded after testing.

## Category

design systems

## Support

Support contact: TBD
