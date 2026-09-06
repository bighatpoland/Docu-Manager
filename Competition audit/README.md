# Competition audit

What four established document management systems do about the problems
[our requirements](../requirements/) name, and what that changed in those
requirements.

Conducted September 2026. Four systems: a German ECM platform widely deployed
with ERP systems, a metadata-driven DMS, a mid-market DMS strong in compliance,
and a general-purpose collaboration platform included for its unusually
well-documented hard limits.

**Illustrated version:** https://claude.ai/code/artifact/e8c5130f-940e-4d8e-a6da-a7523a36af3f
— the same findings on a canvas, with each reference screen annotated by the
requirement its behaviour satisfies. Built for reuse in use-case write-ups.

## Method, and its limits

**Vendor marketing pages were not usable.** Every claim below comes from
administrator documentation, user guides, or published service limits — never
from a features page. Where a vendor's marketing asserts a capability that its
documentation does not describe, the capability is not recorded here.

**No competitor screenshots are included.** Vendor interfaces are third-party
copyrighted material; reproducing them in this repository is a risk with no
research value, since every finding below rests on a documented statement rather
than on a rendering. Sources are linked instead.

The screenshots in [screens/](screens/) are our own designs, included to show
where each finding lands in this product.

## What the market confirmed

Three of our requirements turned out to describe what established systems
already do, which is the strongest evidence available that they are right.

**One document, many dossiers, no copy — `DOS-U-6`.** The German ECM platform
models this as an n:m relation and states it plainly: documents can be filed in
several logical dossiers *"ohne sie dabei redundant, also mehrfach zu halten"* —
without holding them redundantly. Its worked example is an invoice appearing in
both an order dossier and a customer dossier. That is our requirement, arrived
at independently.

**Restoring a version creates a new version — `UPL-12`.** The metadata-driven
DMS documents rollback as using *"the contents and metadata of the selected
version to create a new version of the object"*, and notes that rollback *"does
not have an effect on the versions in between"*. History is never rewritten.

**Filtering and sorting must span the whole set — `FLT-14`, `SRT-12`.** The
collaboration platform's List View Threshold is fixed at 5,000 items and cannot
be raised. Above it, views, filters and sorts return errors or partial results.
Sorting on person, lookup or managed-metadata columns triggers the same failure.
This is our requirement's failure mode, shipped and documented at scale.

## What the market has and we did not

Three gaps, each confirmed in at least two systems. All three are now written.

**Automatic filing by metadata rule.** The German platform's file-formation
module states that *"Das System kann automatisch anhand von Metainformationen
Dokumente den bestehenden Akten hinzufügen oder neue Akten erstellen"* — the
system adds documents to existing dossiers, or creates new ones, from metadata.
Rules are configured graphically and stored in the repository.

Our `DOS-U-8` described only manual filing from two directions. In a working
system most documents are filed by rule; an invoice arriving with a supplier
number already says where it belongs. → **`DOS-U-17`–`DOS-U-20`,
`DOS-A-20`–`DOS-A-22`**, including the requirement that an automatic filing
explains itself and that a human override survives re-evaluation.

**A file plan above dossier types.** An organisation-wide classification scheme
— the instrument for both filing a new dossier in the right place and finding an
existing one. Our `DOS-A-1` had dossier types and nothing above them, which is
workable for ten dossiers and not for several hundred. → **`DOS-A-23`,
`DOS-A-24`**.

**Text extraction and OCR.** All three DMS products treat full-text search over
extracted and OCR'd content as a baseline. We required full-text search
(`FLT-4`) and metadata proposed from "dates found in the content" (`UPL-19`)
without ever requiring the extraction that makes either possible. →
**`UPL-21`–`UPL-23`**.

## Where we are stricter than the market

Kept deliberately, and worth defending in review.

**Retention proposes disposition; it never performs it — `DOS-A-13`, `RET-12`.**
The compliance-focused DMS markets automatic secure deletion once retention
lapses. Ours refuses: expiry moves a document into a review queue and nothing is
destroyed without an explicit, audited human decision. For a system expected to
survive an audit, the stricter behaviour is the correct one, and `RET-12`
restates it in the file a person configuring retention will actually open.

**Bulk export carries a manifest — `BDL-8`.** None of the four documents an
export manifest. The gap is visible in the field: independent reviews of the
compliance-focused DMS flag *"no practical bulk export of documents, metadata,
and version history for offboarding"* as a purchasing risk. An archive without a
manifest listing document ids, versions, checksums and — critically — the items
that were **excluded** is a delivery nobody can verify. That is exactly what
`BDL-8` and `BDL-4` exist to prevent.

**Withheld items are always reported — `XC-1`, `BDL-4`.** No system in this
audit advertises telling the user how many results their permissions removed. A
silently shortened list is a correctness defect wearing a security costume.

**Empty-because-filtered is a different screen from empty-because-nothing —
`FLT-8`.** Not addressed anywhere in the material reviewed.

## Comparison

| Capability | German ECM | Metadata-driven DMS | Compliance DMS | Collaboration platform | Our position |
| ---------- | ---------- | ------------------- | -------------- | ---------------------- | ------------ |
| One document in many dossiers, no copy | Yes, n:m, explicit | Yes, via metadata | Partial | Via links | `DOS-U-6` — confirmed |
| Automatic filing by metadata rule | Yes | Yes, dynamic views | — | — | **Was missing** → `DOS-U-17` |
| File plan above dossier types | Yes | n/a — no folders | — | — | **Was missing** → `DOS-A-23` |
| Registers inside a dossier | Yes | n/a | Yes | Folders | `DOS-U-5` |
| Check-out / check-in | Yes | Yes; also blocks rollback | Yes | Yes | `UPL-15`–`UPL-18` |
| Restore creates a new version | — | Yes, documented | — | Yes | `UPL-12` — confirmed |
| Text extraction and OCR | Yes | Yes | Yes | Yes | **Was missing** → `UPL-21` |
| Metadata-driven permissions | Partial | Yes | Partial | Location-driven | `PRM-4`–`PRM-12` |
| Roles from an identity provider | Yes | Yes | Yes | Yes | `PRM-1`–`PRM-3` |
| Retention on expiry | Periods | Yes | **Deletes automatically** | Labels | **We refuse** — `RET-12` |
| Legal hold | Yes | Yes | Yes | Yes | `DOS-A-14`, `RET-13` |
| Audit trail covering reads | Yes | Yes | Yes, explicit | Yes | `XC-2` |
| Bulk export manifest | — | — | Flagged as missing | — | **Our advantage** — `BDL-8` |
| Reporting withheld items | — | — | — | — | **Our advantage** — `XC-1` |
| Filter and sort across the whole set | Yes | Yes | Yes | **Capped at 5,000** | `FLT-14`, `SRT-12` |

## Numbers worth borrowing

Our `BDL-2` and `BDL-10` require a threshold above which an export becomes an
asynchronous job, without naming one. Published limits from the market give real
reference points rather than invented ones:

| Limit | Value | Source |
| ----- | ----- | ------ |
| Export request cap, compliance DMS cloud | 10 GB and 50,000 documents per request | vendor service description |
| Auto-generated ZIP cap, collaboration platform | 20 GB | vendor service limits |
| View threshold before filter and sort break | 5,000 items, not configurable | vendor service limits |

## What this does not settle

The audit compared capabilities, not fit. Two systems here take opposite
positions on the question our own architecture work has open — whether the front
door is the dossier or the document library — and both ship successfully. The
metadata-driven DMS has no folders at all and proves a library-first product is
viable; the German platform's file plan and automatic filing prove a
dossier-first product wins where completeness of the case file is what is being
audited. That choice is ours to make and this audit does not make it.

## Sources

- d.3 admin folder scheme — file formation: https://help.d-velop.de/docs/de/pub/admin-folder-scheme/8.2.0/einleitung/uber-d3-admin-folder-scheme
- d.velop administration — documents and dossiers: https://help.d-velop.de/docs/de/pub/admin/2023.q3/administration/dokumente-und-akten/aktenbildung
- d.velop — file plans: https://www.d-velop.de/blog/prozesse-gestalten/aktenplan-erstellen/
- M-Files user guide — version history and rollback: https://userguide.m-files.com/user-guide/latest/eng/object_history.html
- M-Files — metadata-driven document management: https://www.m-files.com/m-files-platform/capabilities/document-management/
- DocuWare — document control and compliance: https://start.docuware.com/blog/document-management/document-control-software
- DocuWare — version control: https://start.docuware.com/blog/document-management/what-is-version-control-why-is-it-important
- Microsoft — List View Threshold: https://support.microsoft.com/en-us/sharepoint/lists/data-and-lists/list-view-threshold-for-large-lists-and-libraries
- Microsoft — SharePoint Online limits: https://learn.microsoft.com/en-us/office365/servicedescriptions/sharepoint-online-service-description/sharepoint-online-limits
