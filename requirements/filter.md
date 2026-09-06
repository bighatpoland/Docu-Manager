# Filter

Narrowing a set. The test of a filter is not whether it narrows — it is whether
the user can tell what is currently applied, and get back out.

## Facets

**`FLT-1` Documents are filterable by type, status, owner, upload date, tags, and dossier, at minimum.**
Every field a user can see is a candidate for filtering. Fields that are visible
but not filterable should be justified rather than assumed.

**`FLT-2` Values within one facet combine with OR; separate facets combine with AND.**
Status *Pending* or *Rejected*, and type *Invoice*. This is what users expect
without being told, and any other behaviour must be shown explicitly.

**`FLT-3` A date facet supports both a range and named relative periods.**
"Last 30 days" and "this quarter" alongside an explicit from/to. Relative
periods are re-evaluated when the view is reloaded, not frozen at the date they
were chosen.

**`FLT-4` Free-text search composes with facets rather than replacing them.**
Typing in search while a status filter is active narrows within that status. It
must not silently clear the facets.

**`FLT-5` Facet values show their result counts, and a value that would return nothing is either disabled or hidden.**
Consistently one or the other. Offering a filter that leads to an empty screen
is a dead end the interface could have prevented.

## Visibility and control

**`FLT-6` Every active filter is visible as an individually removable control.**
One chip per active value, each removable on its own, plus a single "clear all".
A filter the user cannot see is the reason support tickets say "the document is
gone".

**`FLT-7` The result count is visible and updates with the filter.**
Shown as the count of matches against the total: "18 of 240".

**`FLT-8` Filtered-to-nothing is a distinct state from nothing-to-show.**
The first offers a way out of the filter; the second offers a way to add the
first document. The prototype already holds this rule in
[Documents.tsx](../src/pages/Documents.tsx), and it generalises to every filtered
view in the product.

**`FLT-9` Applying a filter never changes the user's scroll position silently.**
The view returns to the top of the result set, and focus moves predictably.

## Persistence

**`FLT-10` Filter state is encoded in the URL.**
The consequence is that a filtered view can be bookmarked, shared, and reloaded.
This is the single highest-value requirement in this document and the one most
often skipped.

**`FLT-11` Filter state survives navigating to a document and back.**
Opening a result and returning must not discard the filter that found it.

**`FLT-12` Leaving the area clears the filter, and this is deliberate.**
A filter that persists invisibly across a session makes the next visit look
empty. Persistence within an area, reset on leaving it.

**`FLT-13` A user can save a filter combination as a named view, and share it.**
Saved views are listed alongside system-defined ones and can be reordered by
their owner.

## Performance

**`FLT-14` Filtering is evaluated server-side over the whole set, never client-side over the loaded page.**
Client-side filtering of a paginated set produces results that are wrong in a
way the user cannot detect.

**`FLT-15` A filter change that takes longer than a moment shows a loading state that preserves the previous result.**
The list does not empty and re-fill; it dims and updates. An empty intermediate
state reads as "no results" every time.
