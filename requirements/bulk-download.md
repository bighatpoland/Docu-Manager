# Bulk download

Taking many documents out at once. The requirement looks trivial and is not: the
three things that go wrong are permissions silently reducing the result, an
archive whose structure nobody can interpret, and a synchronous request that
times out at four hundred files.

## Selecting

**`BDL-1` The selection is expressible as an explicit set, as a whole dossier, or as the current filter result.**
"Download everything matching what I am looking at" is the common case and must
not require selecting rows one at a time.

**`BDL-2` The count and total size of the selection are visible before the download is requested.**
Both, before committing. A user about to pull 6 GB should know it.

**`BDL-3` Select-all selects the whole result set, not the loaded page, and says which it did.**
The distinction is stated in the interface. This is the single most common
source of an incomplete export.

## Permissions

**`BDL-4` Documents the user may not download are excluded, counted, and reported.**
"412 of 460 documents included. 48 excluded — you do not have download
permission." The excluded count is never omitted, and the reason is stated.

**`BDL-5` Download permission is distinct from view permission.**
A user may be entitled to read a document on screen and not to remove a copy
from the system. The model must express this, and bulk download must honour it.

## Packaging

**`BDL-6` The archive mirrors the dossier structure the documents came from.**
Folder per dossier, subfolders where the dossier type defines them. A flat
archive of four hundred files named by id is technically a delivery and
practically useless.

**`BDL-7` Filenames are deterministic, collision-free, and safe on every target filesystem.**
Reserved characters stripped, length capped, and duplicates disambiguated by a
suffix rather than by silently overwriting. Two documents legitimately sharing a
name must both arrive.

**`BDL-8` Every archive contains a manifest.**
A machine-readable file listing each entry with its document id, version number,
title, size, checksum, and source dossier — plus every excluded item with its
reason. The manifest is what makes the archive auditable, and it is what a
recipient uses to verify that nothing was lost in transit.

**`BDL-9` The latest version is included by default, and a specific version may be requested instead.**
Where a document has been superseded, the default must be stated in the
interface, not assumed by the user.

## Execution

**`BDL-10` A request above a configured threshold runs as an asynchronous job.**
The user is not held on a spinner. The threshold is configurable by count and by
total size.

**`BDL-11` A job reports progress and can be cancelled without leaving partial artefacts.**
Cancellation removes the incomplete archive.

**`BDL-12` The user is notified when the archive is ready, and can find it again without the notification.**
A jobs list survives closing the tab. A download that exists only in a
notification that was dismissed is lost work.

**`BDL-13` The generated archive is available through a link that expires.**
Expiry is configurable and stated to the user at the point the link is given.

**`BDL-14` Failure names what failed.**
Which documents, and why. A failed job that produced nothing says so; a job that
produced a partial archive says which items are missing rather than delivering a
short archive silently.

## Compliance

**`BDL-15` Every bulk download writes a single audit entry recording actor, time, selection criteria, and the resulting item count.**
Bulk export is the highest-risk operation in a document management system. The
audit entry references the manifest so that the exact contents can be
reconstructed later.

**`BDL-16` Documents under legal hold are excluded from bulk download unless the requesting role is explicitly entitled, and the exclusion is reported.**
