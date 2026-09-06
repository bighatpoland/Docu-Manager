# Bulk operations

Acting on many documents at once. [bulk-download.md](bulk-download.md) covers
taking documents *out*; this file covers the selection model every bulk action
shares, and the three destructive or mutating actions that are not downloads.

The selection model is written once here because getting it wrong once gets it
wrong everywhere: the same misunderstanding that exports 50 of 460 documents
also deletes 50 of 460.

## Selection

**`BLK-1` Every row carries a checkbox, and the table header carries a master checkbox.**
The master checkbox selects what is currently loaded, and says so.

**`BLK-2` Selecting the loaded page offers, as a distinct second action, selecting the whole filtered result.**
Two separate acts with two separate labels — "Select all 50 on this page" and
"Select all 460 matching these filters". Conflating them is the defect
`BDL-3` exists to prevent, and it is a defect of the selection control, not of
the export.

**`BLK-3` The current selection is stated as a count against the relevant total, at all times while a selection exists.**
"50 selected of 460 matching". Never a bare "50 selected".

**`BLK-4` A selection survives paging within the same filter and is discarded when the filter changes.**
A filter change that silently kept a selection would let an action reach
documents the user can no longer see.

**`BLK-5` Where a bulk action has a maximum, the limit is stated inline next to the action before it is attempted, not as an error afterwards.**
The message names the limit and the current selection. A limit discovered by
rejection wastes the selection the user just built.

## Actions

**`BLK-6` The bulk action bar appears only when a selection exists, and lists every action the selection permits.**
Actions the current selection cannot support are absent with the reason
available, rather than present and failing.

**`BLK-7` Bulk delete is logical, requires a stated reason, and confirms with the count and what it affects.**
Logical per `PRM-18`. The reason is recorded in the audit entry. The
confirmation names the number of documents, per `XC-3`.

**`BLK-8` Bulk metadata export offers a choice of format.**
At minimum a spreadsheet-compatible tabular format. The choice is made in the
dialog, not configured globally, because the recipient differs per export.

**`BLK-9` Bulk tagging validates against the same constraints as single-document tagging.**
At most 20 tags per document, at most 64 characters each, letters, digits,
underscore and hyphen only, no duplicates. The constraints are shown before
input is rejected.

**`BLK-10` A bulk action reports per item, never per batch.**
This is `XC-6` and `DOS-U-16` applied here, and it is the requirement most often
dropped: 460 documents where 12 fail must leave 448 done and name the 12 with a
reason each.

**`BLK-11` The result of a bulk action is delivered in two places: a transient confirmation, and a panel that survives it.**
A toast says it finished. A bulk-operations panel holds what finished, what did
not, and why — because the toast is gone by the time anyone reads the failures.

**`BLK-12` A partial failure lists the documents that did not change, individually, with the reason for each.**
Rendered as a list the user can act on, not a count. "12 documents could not be
deleted" is a dead end; naming them and why is not.

**`BLK-13` A bulk action that is refused for every item explains once, not once per item.**
The common cause is permissions, and the useful answer is the rule that blocked
it, not 460 identical lines.
