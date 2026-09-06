# Dossier management — admin

Administration of dossier *types* and the rules every dossier inherits from
them. What a user does inside a dossier is
[dossier-management-user.md](dossier-management-user.md).

The distinction that matters: a user acts on one dossier, an administrator acts
on a definition that every dossier of that type already follows. Administrative
changes are therefore retroactive by default, and that is the source of most of
the risk in this area.

## Dossier types

**`DOS-A-1` An administrator defines dossier types; users only instantiate them.**
A type fixes the metadata schema, the internal structure, the lifecycle rules,
and the default permissions for every dossier created from it.

**`DOS-A-2` A metadata field definition carries its type, its cardinality, and whether it is required.**
Supported field types must include at minimum text, number, date, boolean,
single-choice and multi-choice from a controlled list, and a reference to
another business object.

**`DOS-A-3` A controlled list is a managed object, not a text field.**
Values are added, deprecated and reordered centrally. Deprecating a value keeps
it readable on existing dossiers and removes it from new selections.

**`DOS-A-4` Changing a type shows its effect before it is applied.**
The administrator sees how many existing dossiers and documents the change
touches, and which of them would become invalid, *before* confirming.

- Acceptance: adding a required field to a type in use reports the count of
  existing dossiers that would immediately be non-compliant, and offers to flag
  them as incomplete rather than blocking access to them.

**`DOS-A-5` A dossier type in use cannot be deleted.**
It can be deprecated: no new dossiers, existing ones keep working. The interface
states the count that blocks deletion.

**`DOS-A-6` Type definitions are versioned.**
Every change records who, when, and what changed, and any version can be
compared with any other. A dossier records which version of the type it was
created under.

## Permissions

**`DOS-A-7` Permissions are granted to roles, and to individuals only as an exception.**
Individual grants must be visible as exceptions in their own list, because they
are what nobody remembers to revoke.

**`DOS-A-8` Permission is expressible per dossier type and overridable per dossier.**
The override is visible on the dossier itself, with who set it and when. An
override that only appears in an administration screen will not be found by the
person wondering why they cannot open something.

**`DOS-A-9` An administrator can answer "why can this person see this?" and "what can this person see?" without running a query.**
Both directions, as screens. Effective permissions are shown resolved, including
the rule that granted them.

**`DOS-A-10` Elevated access is temporary and recorded.**
Where an administrator can grant themselves access to content, it expires, it
requires a stated reason, and it is auditable separately from ordinary access.

## Lifecycle and retention

**`DOS-A-11` The administrator defines when a dossier may be closed.**
Including preconditions — no outstanding required metadata, no checked-out
documents. Attempting to close names each unmet precondition.

**`DOS-A-12` Retention is defined on the type and starts from a named event.**
Creation, closure, or a date field on the dossier. "Seven years from closure"
must be expressible without a script.

**`DOS-A-13` Expiry of retention proposes disposition, it does not perform it.**
Expired dossiers enter a review queue. Nothing is destroyed without an explicit,
audited, human decision.

**`DOS-A-14` A legal hold overrides retention and every deletion path.**
Applied to a dossier or a document, visible on both, removable only by a role
that cannot also be the one who applied it.

## Bulk administration

**`DOS-A-15` Administrative bulk operations preview, execute asynchronously, and report per item.**
Reassigning an owner across four hundred dossiers reports what it will do,
runs without holding the screen, and produces a per-item result including every
failure and its reason.

**`DOS-A-16` A bulk operation is reversible or explicitly marked as not.**
Where reversal is impossible, the confirmation says so in those words.

## Oversight

**`DOS-A-17` Administrators have a reopening queue for user requests.**
Each request shows the dossier, the requester, the stated reason, and the
closure it would undo. Granting it writes an audit entry on the dossier.

**`DOS-A-18` The audit log is queryable by object, by actor, and by time range, and is exportable.**
It is append-only for every role including administrators. An audit log that an
administrator can edit does not satisfy this requirement.

**`DOS-A-19` Configuration is exportable and importable as a reviewable artefact.**
Type definitions, controlled lists and permission rules move between
environments as a diffable file, so that a change can be reviewed before it
reaches production.

## Filing rules and the file plan

**`DOS-A-20` An administrator defines filing rules that map document metadata to a dossier type and, within it, to a register.**
A rule states the conditions, the target, and whether it may create a dossier
that does not yet exist.

**`DOS-A-21` A filing rule shows what it would do before it is enabled.**
The count of existing documents it would file, and a sample of them. This is
`DOS-A-4` applied to filing: a rule enabled blind refiles the repository.

**`DOS-A-22` Filing rules are ordered, and the order is explicit.**
Where two rules match one document, which wins must be a decision, not an
emergent property of the evaluation order.

**`DOS-A-23` The product supports a file plan: a single organisation-wide classification scheme above dossier types.**
Dossier types say what one dossier contains; the file plan says how the whole
repository is organised, and is the instrument for both creating new dossiers in
the right place and finding existing ones. Without it, a few hundred dossiers is
an unordered list.

**`DOS-A-24` The file plan is versioned and its changes are auditable, like a dossier type definition.**
Reclassifying a branch of the plan moves everything under it, so it carries the
same preview-before-apply obligation as `DOS-A-4`.
