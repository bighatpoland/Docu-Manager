# Requirements

Functional requirements for DocuManager, written against general document
management practice rather than any one vendor's product. They describe the
target system, not the prototype in `src/` — see the status table below for
what actually exists today.

## Areas

| Area | File |
| ---- | ---- |
| Dossier management — user | [dossier-management-user.md](dossier-management-user.md) |
| Dossier management — admin | [dossier-management-admin.md](dossier-management-admin.md) |
| Upload and versioning | [upload-and-versioning.md](upload-and-versioning.md) |
| Bulk download | [bulk-download.md](bulk-download.md) |
| Filter | [filter.md](filter.md) |
| Sort | [sort.md](sort.md) |

## How to read a requirement

Each has a stable ID, a single statement of intent, and acceptance criteria that
can be checked. IDs never get reused; a withdrawn requirement keeps its number
and is marked withdrawn.

| Prefix | Area |
| ------ | ---- |
| `DOS-U` | Dossier management, user-facing |
| `DOS-A` | Dossier management, administration |
| `UPL` | Upload and versioning |
| `BDL` | Bulk download |
| `FLT` | Filter |
| `SRT` | Sort |

**Must / should / may** carry their RFC 2119 meanings. "Must" is a release gate.

## Vocabulary

These terms are used precisely and match the type names in
[src/data/documents.ts](../src/data/documents.ts) where the prototype has an
equivalent.

| Term | Meaning |
| ---- | ------- |
| **Document** | One logical record. Owns metadata, a status, an audit trail, and one or more versions. Identified by a stable id that never changes across versions. |
| **Version** | One immutable file revision of a document. Numbered from 1, monotonically increasing, never overwritten and never renumbered. |
| **Dossier** | A container grouping documents that belong to one business object — a supplier, an order, a case. Carries its own metadata and its own retention. |
| **Dossier type** | The template a dossier is created from. Fixes the metadata schema, the folder structure, and the lifecycle rules for every dossier of that type. |
| **Reference** | A document appearing in a dossier without being copied into it. One stored document, many dossiers. |
| **Retention** | The period a document or dossier must be kept, and what happens when it expires. |
| **Audit entry** | An append-only record of who did what, when. Never editable, never deletable by any role. |

## Cross-cutting requirements

These apply to every area and are not repeated in the individual files.

- **`XC-1` Permission filtering is silent to no one.** Where a user's permissions
  reduce a result set, the interface must say how many items were withheld. A
  silently shortened list is a correctness bug, not a security feature.
- **`XC-2` Every state-changing action writes an audit entry.** Including reads
  where the document is classified as sensitive. Audit entries are append-only.
- **`XC-3` Destructive actions are confirmed, and say what they affect.** The
  confirmation names the object and the count. "Delete 14 documents from
  *Supplier XYZ*", not "Are you sure?".
- **`XC-4` Every screen meets WCAG 2.1 AA.** Keyboard reachable, visible focus,
  status never carried by colour alone, live regions for asynchronous results.
- **`XC-5` No user-facing string is hard-coded.** Dates, numbers and file sizes
  render in the user's locale.
- **`XC-6` Long operations are asynchronous and interruptible.** Anything that
  can exceed a few seconds reports progress and can be cancelled without
  corrupting partial state.

## Status in this prototype

Honest accounting. The prototype implements a slice, and these requirements
describe considerably more than it does.

| Area | State |
| ---- | ----- |
| Upload and versioning | Partial — single and multi-file upload, a version chain, an audit trail. No check-out, no checksums, no virus scanning. |
| Filter | Partial — search, type, and tag filters, with both empty states written. No facet counts, no saved views, no URL state. |
| Sort | Partial — sortable table columns with a single active sort. No secondary sort, no natural sort, no persistence. |
| Dossier management | Not implemented. No dossier concept exists in the data model. |
| Bulk download | Not implemented. |
