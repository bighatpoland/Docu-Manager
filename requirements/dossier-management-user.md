# Dossier management — user

What someone working in a dossier can do. Administration of dossier *types* is a
separate document: [dossier-management-admin.md](dossier-management-admin.md).

A dossier groups the documents belonging to one business object. The grouping is
the point: a user who has found the dossier has found every document about that
object, without having to know what any of them are called.

## Finding and opening

**`DOS-U-1` A user sees only the dossiers they are entitled to see.**
Entitlement is evaluated per dossier, not per screen. A dossier the user cannot
open must not appear in lists, search results, counts, or link previews.

- Acceptance: a dossier outside the user's permissions returns the same
  "not found" response as one that does not exist. The two cases are
  indistinguishable from the client.

**`DOS-U-2` A dossier is addressable by a stable URL.**
The address survives renaming the dossier, moving documents in or out, and
changing its type. Sharing the link is how users hand work to each other.

**`DOS-U-3` The dossier list is searchable across dossier metadata, not only titles.**
Searching a supplier number must find the dossier that carries it as a field,
even when the number appears nowhere in the dossier name.

## Reading a dossier

**`DOS-U-4` The dossier header shows the identifying metadata without interaction.**
Type, owner, status, retention state, and document count are visible on open.
The user must not have to expand a panel to learn what they are looking at.

**`DOS-U-5` Documents in a dossier are presented in the structure the dossier type defines.**
Where the type defines folders or registers, the dossier renders them, including
the empty ones — an empty register is information, because it says something is
outstanding.

**`DOS-U-6` A document may appear in more than one dossier without being copied.**
The document is stored once. Each appearance is a reference. Editing metadata
through any dossier changes the one document, and the interface must say so
before the edit is committed when more than one dossier is affected.

- Acceptance: adding an existing document to a second dossier does not change
  its id, its version count, or its audit trail length.

**`DOS-U-7` The dossier shows its own activity, merged across its documents.**
One chronological view answering "what happened in this case recently", rather
than requiring the user to open each document to find out.

## Working in a dossier

**`DOS-U-8` Adding a document to a dossier is available from both directions.**
From inside the dossier ("add a document here") and from a document ("file this
into a dossier"). Both write the same audit entry.

**`DOS-U-9` Removing a document from a dossier does not delete the document.**
Removal detaches a reference. Where the dossier is the document's only location,
the interface must say that removal will leave it unfiled, and require a
different confirmation.

**`DOS-U-10` Required metadata is enforced at the point it becomes required, not at upload.**
A dossier type may require fields that are unknown when the file arrives. The
document is accepted, flagged incomplete, and listed in the dossier's
outstanding items until the fields are supplied.

**`DOS-U-11` A closed dossier is read-only, and says why.**
No additions, no removals, no metadata edits. The interface states that the
dossier is closed and who closed it, rather than presenting controls that fail.

- Acceptance: every write control is absent, not merely disabled without
  explanation.

**`DOS-U-12` A user can request reopening of a closed dossier but cannot reopen it.**
Reopening is an administrative action. The request records a reason and appears
in the administrator's queue.

## Retention

**`DOS-U-13` The dossier's retention state is visible to the user working in it.**
Whether retention has started, what it expires on, and what happens then. Users
delete things they should not keep and keep things they should not delete when
this is hidden.

**`DOS-U-14` A document under retention cannot be deleted by any user role.**
The control is absent and the reason is stated. Retention that a sufficiently
senior user can click through is not retention.

## Errors and empty states

**`DOS-U-15` An empty dossier and a dossier filtered to nothing are different screens.**
The first invites the user to file something. The second offers a way back out
of the filter. This is the same rule the document library already holds itself
to in [Documents.tsx](../src/pages/Documents.tsx).

**`DOS-U-16` A partially failed operation reports per item, not per batch.**
Filing eight documents where two fail leaves six filed and names the two,
with the reason for each. It does not roll back the six or report "an error
occurred".
