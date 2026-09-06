# Sort

Ordering a set. Shorter than [filter.md](filter.md) because there is less of it,
but it contains two requirements that are almost always missed — a stable
secondary sort, and sorting the whole set rather than the loaded page.

## Controls

**`SRT-1` Sortable and non-sortable columns are visually distinguishable before interaction.**
A user should not discover which headers respond by clicking each one.

**`SRT-2` One sort is active at a time, and the active column and direction are visible.**
Direction is carried by an indicator and by text available to assistive
technology, never by the indicator alone.

**`SRT-3` Activating the active column toggles its direction; activating another column sorts by it in that column's natural default.**
Dates default to newest first. Text defaults to A–Z. Status defaults to the
order that needs attention first, not alphabetical — *Pending*, *Rejected*,
*Approved*, because alphabetical order of a status is meaningless.

**`SRT-4` Sort controls are reachable and operable by keyboard, and a sort change is announced.**
The announcement states the column and the direction. A table that reorders
silently is unusable without sight of it.

**`SRT-5` Every screen states its default sort, and the default is deliberate.**
Newest first for an inbox; attention-first for a review queue. "Whatever the
database returned" is not a default.

## Correctness

**`SRT-6` Sorting is stable, with a defined secondary key.**
Rows with equal values in the sorted column keep a consistent relative order
across renders. Without this, twelve documents uploaded the same day shuffle
every time the user returns, and the list stops feeling trustworthy.

**`SRT-7` Text sorting is locale-aware and case-insensitive.**
Diacritics collate according to the user's locale rather than by code point.

**`SRT-8` Names containing numbers sort naturally.**
`Version 2` before `Version 10`. Lexicographic ordering of a numbered series is
a defect users report as "the sort is broken", and they are right.

**`SRT-9` Empty values sort together, at a defined end, in both directions.**
Blanks do not scatter through the result, and their position is documented
rather than emergent.

**`SRT-10` Size, date and numeric columns sort by their underlying value, not their rendered string.**
"9.8 MB" and "10.2 MB" sort by bytes. This is the most common sorting defect in
a document list.

## Interaction with the rest of the view

**`SRT-11` Sort applies to the filtered set, and changing the filter preserves the sort.**
The two are independent. Changing one must not reset the other.

**`SRT-12` Sorting is evaluated server-side across the entire result set.**
Sorting the loaded page reorders a sample and presents it as an ordering. Where
the set is paginated, page one after sorting must contain the true first rows.

**`SRT-13` Sort state is encoded in the URL alongside filter state, and is part of a saved view.**
A shared link reproduces what the sender was looking at, in the order they saw
it.

**`SRT-14` Where the list is not a table, the same ordering is available as an explicit control.**
A card grid still needs a sort. The control changes shape; the requirement does
not.
