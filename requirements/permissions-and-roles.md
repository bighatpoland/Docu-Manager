# Permissions and roles

How access to content is decided. The model is **rule-based and driven by
metadata**, not by where a document sits: a rule grants or denies a set of
operations to a set of roles, for every document whose metadata satisfies the
rule's predicate.

This is the part of the system most likely to be got subtly wrong, because a
permission model fails silently. A rule that is too narrow produces a support
ticket; a rule that is too broad produces nothing at all until an audit.

## Roles

**`PRM-1` Roles come from the organisation's identity provider and are read-only in this product.**
The product consumes roles; it does not create, rename or delete them. Every
role displays its source, and the interface states that it is managed
externally rather than presenting controls that cannot work.

- Acceptance: a role's detail view shows its origin and offers no rename or
  delete affordance.

**`PRM-2` A role that has disappeared from the identity provider is retained, marked, and never silently dropped.**
Rules referencing it keep working or stop working — whichever the product
decides — but the interface must say which, and name the affected rules. A
role vanishing from a rule without notice is how access quietly widens.

**`PRM-3` Every role can be listed with the rules that reference it and the operations those rules confer.**
This is the "what can this person see?" direction of `DOS-A-9`, resolved
against the rule set rather than against a folder tree.

## Rules

**`PRM-4` A content permission rule is a named object with a description, an enabled flag, a type, an operation scope, a set of assigned roles, and a predicate.**
All six are visible in the rule list without opening the rule. A rule whose
effect can only be learned by opening it will not be reviewed.

**`PRM-5` A rule is either `Grant` or `Deny`, and the type is visible at a glance.**
Both directions must be expressible. Deny exists because some content has to be
withheld from roles that a broader grant would otherwise reach.

**`PRM-6` Deny outranks Grant, and the resolution order is stated in the interface, not only in documentation.**
When a document is reachable by a grant rule and a deny rule at once, the
outcome must be predictable without reading the source. Any other precedence is
acceptable only if it is equally explicit — what is not acceptable is leaving it
to be discovered.

**`PRM-7` Operation scope is a set, drawn from a fixed vocabulary of operations.**
At minimum: read, upload, and logical delete. The scope is a set because a role
that may read and upload but not delete is the ordinary case, not the exception.

**`PRM-8` A predicate is a conjunction of metadata comparisons, and its plain-language summary appears in the rule list.**
`department = Executive AND classification = Confidential`, rendered as text a
reviewer can check against intent. Predicates reference metadata fields by
definition, never by free-typed name.

**`PRM-9` A rule can be disabled without being deleted, and a disabled rule is visibly not enforced.**
Disabling is how a rule is taken out of effect while its intent is preserved for
review. The list must be filterable to enabled and disabled separately.

**`PRM-10` The rule list is filterable by enabled state and by type, and searchable by name and description.**
With several hundred rules — the reference design shows 354 — an unfiltered list
is not reviewable.

**`PRM-11` Every rule records when it was last modified and by whom.**
Changes to the rule set are the highest-consequence configuration changes in the
product and fall under `XC-2`.

**`PRM-12` Creating or editing a rule shows its effect before it is saved.**
How many documents the predicate currently matches, and which roles would gain
or lose which operations. A rule saved blind is a rule nobody can review.

## Safeguards

**`PRM-13` The product prevents an administrator from removing their own ability to administer it.**
A change that would leave no role holding administration rights, or would strip
them from the acting user, is refused with an explanation. Lock-out is
unrecoverable without vendor intervention, which makes prevention the only
acceptable design.

**`PRM-14` A metadata field referenced by any content permission rule cannot be deleted.**
The attempt names the rules that block it. Deleting the field out from under a
predicate silently changes who can see what.

**`PRM-15` A metadata field used in any document type definition cannot be deleted.**
Same reasoning, different dependency. Both blocks are stated as counts with the
dependants named, not as a generic refusal.

**`PRM-16` A document type in use cannot be reclassified in a way that invalidates an existing rule.**
Where reclassification would leave a predicate referencing a field the type no
longer carries, the operation is refused and the affected rules are named.

**`PRM-17` A rule referencing a definition that no longer resolves is surfaced as invalid in the interface, not skipped at evaluation time.**
An invalid rule must be visible as invalid. A rule that silently evaluates to
nothing is indistinguishable from a rule that is working.

**`PRM-18` Deletion of content is logical by default.**
A logically deleted document leaves the working views, remains recoverable, and
remains subject to retention and legal hold. Permanent destruction is a separate,
separately-permissioned operation — see `DOS-A-13`.

**`PRM-19` Deleted content has its own view, reachable only by roles entitled to it.**
Recovery is a normal operation, not a support request.

## Metadata fields as the substrate

**`PRM-20` A metadata field has exactly one data type, fixed at creation.**
Changing the type of a field in use is not an edit; it is a migration, and the
product does not pretend otherwise.

**`PRM-21` An enumerated field's allowed values are managed in a dedicated editor, and removing a value states what it affects.**
This is `DOS-A-3` applied to the field level: values are deprecated rather than
deleted where any document carries them.

**`PRM-22` A field's mandatory flag can be changed, and the change reports how many existing documents it would make incomplete.**
Those documents become incomplete rather than inaccessible — the same rule as
`DOS-U-10`.

**`PRM-23` A field may be marked sensitive or immutable, and those marks constrain what rules and edits may do to it.**
An immutable field cannot be edited after creation; a sensitive field's reads
are audited under `XC-2`.

**`PRM-24` System metadata is not configurable, and is presented as such.**
Fields the product owns are visible and clearly not editable, rather than absent
or editable-then-refused.
