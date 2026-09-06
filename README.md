# DocuManager

A document management prototype — dashboard, document library, upload,
versioning, audit trail — **built entirely with the
[BigHat design system](https://github.com/bighatpoland/bighat-design-system)**.

The point of this repository is not the document management. It is what a real
screen looks like when every control comes from a design system, and what
happens at the places where the system runs out.

Two things live here:

- **[requirements/](requirements/)** — 106 functional requirements for a
  document management system, written against general market practice.
- **[src/](src/)** — a working prototype implementing a slice of them, with
  every control taken from `@bighatpoland/ui`.

## Requirements

Written to be read by someone specifying the system, not by someone admiring the
prototype. Each requirement has a stable id and acceptance criteria that can be
checked.

| Area | Requirements | File |
| ---- | ------------ | ---- |
| Dossier management — user | 16 | [dossier-management-user.md](requirements/dossier-management-user.md) |
| Dossier management — admin | 19 | [dossier-management-admin.md](requirements/dossier-management-admin.md) |
| Upload and versioning | 20 | [upload-and-versioning.md](requirements/upload-and-versioning.md) |
| Bulk download | 16 | [bulk-download.md](requirements/bulk-download.md) |
| Filter | 15 | [filter.md](requirements/filter.md) |
| Sort | 14 | [sort.md](requirements/sort.md) |
| Cross-cutting | 6 | [README.md](requirements/README.md) |

They describe the target system. The prototype implements a slice —
[the status table](requirements/README.md#status-in-this-prototype) says exactly
which, and does not overstate it.

## Built with @bighatpoland/ui

Every interactive control on every screen is a component from
[`@bighatpoland/ui`](https://github.com/bighatpoland/bighat-design-system) —
[Storybook](https://bighatpoland.github.io/bighat-design-system/). Nothing is
restyled, wrapped, or forked.

```json
"dependencies": {
  "@bighatpoland/ui": "github:bighatpoland/bighat-design-system"
}
```

Setup is three lines, once, in [main.tsx](src/main.tsx):

```tsx
import '@bighatpoland/ui/styles.css';

<div className="bh-root">
  <ToastProvider>
    <App />
  </ToastProvider>
</div>;
```

### The rules this codebase holds itself to

The design system ships its own rules for consumers in
[`agent/SKILL.md`](https://github.com/bighatpoland/bighat-design-system/blob/main/agent/SKILL.md).
The ones with teeth here:

| Rule | How it shows up in this repo |
| ---- | ---------------------------- |
| Semantic tokens only — never a primitive or a hex | [app.css](src/app.css) contains no colour literal. Every value is a `--bh-*` semantic token or a layout property. |
| Spacing comes from the 4px scale | Gaps and padding are `--bh-gap-*` / `--bh-padding-*`. There is no `13px` anywhere. |
| Empty, loading and error are `StateBlock` | No bespoke "no results" markup. And "empty" is written twice — see below. |
| Colour is never the only carrier of meaning | Every `Badge` carries its status as text. The `Card` accent on "Pending approval" is decorative; the label does the work. |
| Never remove a focus outline | Local interactive elements take `bh-focusable`. The one custom ring ([ToggleGroup](src/components/ToggleGroup.tsx)) adds, not replaces. |
| Labels are required; placeholders are not labels | Every `Input`, `Select` and local `Textarea` has a real label, hidden with `hideLabel` where the layout needs it. |
| Prefer a new component over a new prop | Six gaps are local components, named as such, listed below. No system component was widened. |

**"Empty" is two screens, and this one writes both.** A library with nothing in
it offers an upload; a library filtered to nothing offers a way out of the
filter ([Documents.tsx](src/pages/Documents.tsx)). The design system calls
conflating these its most common mistake, so it seemed worth not making. The
rule is generalised in [`FLT-8`](requirements/filter.md).

### Where each component is used

| Screen element | Component |
| -------------- | --------- |
| Page frame, landmarks, skip link | `AppShell`, `SkipLink` |
| Top bar, brand, search | `AppBar` + `Input` |
| Section navigation | `SidePanel` + `NavList` / `NavItem` |
| Dashboard stat tiles | `Card` (via local `StatTile`) |
| Recent activity rows | `Card` + `Badge` |
| Document cards | `Card` + `Badge` |
| Document table, sorting | `Table` |
| Document status | `Badge` |
| Type filter | `Select` |
| Every action | `Button` |
| Upload, document detail | `Dialog` |
| Save, approve, upload confirmation | `Toast` via `useToast()` |
| Empty states, oversized-file error | `StateBlock` |

## Components the design system is missing

This is the useful output of the exercise. Each one is built locally in
[src/components/](src/components/) against semantic tokens, marked
`LOCAL COMPONENT` in its own source, and is a **candidate to move into the
design system** — the comment in each file explains what the system would have
to decide.

Checked against `@bighatpoland/ui@2.0.0`, whose
[`components.json`](https://github.com/bighatpoland/bighat-design-system/blob/main/components.json)
inventories 17 components. None of the six gaps below has an equivalent there.

| Gap | Why the system has no answer | Priority |
| --- | ---------------------------- | -------- |
| **`Tabs`** | Nothing comes close. It is a keyboard widget — arrows move, Home/End jump, one tab stop for the group. | **High.** Every hand-rolled version omits this. |
| **`Textarea`** | `Input` is single-line by contract; `Composer` is a prompt with a submit handler and declares `notFor: ["Ordinary multi-line form fields"]`. Multi-line text has nowhere to go. | **High.** Trivial to add, needed constantly. |
| **`Chip`** | `Badge` explicitly refuses to be clickable, correctly. Filter chips and removable tag chips are two different components. | **High.** Two variants, both used here. |
| **`ToggleGroup`** | A segmented control is one choice with a current value, so it is a radio group. Rendered as buttons it loses that value. | **Medium.** `Composer` already has this logic internally, unexported. |
| **`FileDropzone`** | No file input of any kind. The usual `<div onDrop>` is invisible to keyboard and screen reader users — see [`UPL-1`](requirements/upload-and-versioning.md). | **Medium.** Needs a real `<input type="file">` underneath. |
| **`Avatar`** | No answer for identity. Small, but every product invents it and half read "ML" aloud. | **Low.** |

Two more findings that are not missing components:

- **`Select` has no `hideLabel`, but `Input` does.** An inconsistency rather
  than a gap. The label is visible in the toolbar here as a result, which is
  arguably the better default — but the asymmetry should be a decision, not an
  accident.
- **`Table` has no row-activation model.** Also right: a clickable row has no
  accessible name and no keyboard story. But the alternative needs to be
  stated, or every product invents `onRowClick`. This repo puts an explicit
  named button in a cell.

`StatTile` is in `src/components/` too but is **not** a gap — it is a local
composition of the system's `Card`. Worth promoting only if a second product
wants the same tile.

## Fixed in the design system along the way

Two things this integration surfaced, both fixed upstream:

- The package advertised `types: ./dist/index.d.ts` and never shipped one —
  `vite-plugin-dts` honoured `noEmit` from the app tsconfig and silently emitted
  nothing. Every TypeScript consumer was getting an implicit `any`.
- No `prepare` script, so installing it as a git dependency produced a package
  with no build output at all.

## Tech

- React 19 + TypeScript + Vite
- `@bighatpoland/ui` for every control
- `localStorage` as a fake backend, with the same shape the original prototype
  used

The previous version of this prototype was a single 734-line HTML file using
Tailwind via CDN. The design system is a React component library, so applying it
properly meant becoming a React app. Restyling the old file with the system's
tokens would have looked the same and been a copy, not a dependency.

## Local run

```bash
npm install
npm run dev
```

`npm install` builds the design system from source, since it is a git dependency
rather than a published package.

## Status

Prototype. Not production software. The document management is a plausible
fiction; the design system integration and the requirements are the real
content.
