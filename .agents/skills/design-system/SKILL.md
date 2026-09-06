---
name: design-system
description: Use this before writing or editing any UI in DocuManager. This product is built on @bighatpoland/ui; this file says what to reach for, what is deliberately local, and what not to invent.
---

# UI in DocuManager

Every control comes from [`@bighatpoland/ui`](https://github.com/bighatpoland/bighat-design-system).
Load its own rules first — they ship in the package at `agent/SKILL.md` and are
the authority on tokens, states and composition. This file only covers what is
specific to this product.

## Before adding any UI

1. **Check the system first.** `node_modules/@bighatpoland/ui/components.json` is
   the machine-readable inventory: 17 components, with `purpose` and `notFor` on
   each. `notFor` is not advice; it is the reason a component will refuse.
2. **Then check `src/components/`.** Six gaps are already filled locally. Do not
   build a second one.
3. **Only then build something new** — and mark it `LOCAL COMPONENT` in the file,
   add it to the gap table in the README, and use semantic tokens only.

## Already local, do not duplicate

`Tabs`, `Textarea`, `Chip` (`FilterChip` and `RemovableChip`), `ToggleGroup`,
`FileDropzone`, `Avatar`. Plus `StatTile`, which is a composition of the system's
`Card` rather than a gap.

## Things that will bite

- **A `Card` with `onClick` is a `<button>`.** Everything inside it must be
  phrasing content — `<span>`, not `<p>` or `<div>`. The spans in `app.css` carry
  explicit `display` for this reason.
- **`Table` has no row click.** Put a named `Button` in a cell. Do not add one.
- **`Select` has no `hideLabel`.** `Input` does. Show the label on selects.
- **Empty is two states.** First use offers an upload; filtered-to-nothing offers
  a way out of the filter. Both already exist in `pages/Documents.tsx`; match them.
- **No colour literals in `app.css`.** If no semantic token fits, that is a
  missing role in the design system. Say so and stop — do not reach for a hex.

## Feedback goes in two places

A `Toast` confirms something happened. A `StateBlock` carries something the user
has to act on where they are. An oversized file is a `StateBlock` in the upload
dialog, not a toast — the user has to remove the file.
