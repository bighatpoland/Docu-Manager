# Retention policies

`DOS-A-12` and `DOS-A-13` say retention exists and what it must not do. This
file says what a retention policy *is*: a named, versioned object with its own
lifecycle, attached to document types rather than written into them.

The separation matters because retention outlives the documents it governs and
usually outlives the person who configured it. A period typed into a document
type is a number nobody can audit; a policy is an object with a history.

## The policy object

**`RET-1` A retention policy is a first-class named object, not a field on a document type.**
It carries a name, a description, a period, a start event, and a lifecycle
state. One policy governs many document types.

**`RET-2` A retention period is a value and a unit, not a free-text duration.**
"7" and "years" as separate inputs. A duration parsed from text is a duration
that will eventually be entered wrong.

**`RET-3` A policy names the event its period counts from.**
At minimum: document creation, document status change, dossier closure, or a
named date field on the document. `DOS-A-12` requires "seven years from closure"
to be expressible without a script; this is the mechanism.

**`RET-4` A start event that cannot yet have occurred leaves the document with retention not yet started, and the interface says so.**
A document in an open dossier under a closure-triggered policy is not
unprotected — it is not yet counting. Those are different states and must read
differently.

## Lifecycle

**`RET-5` A policy is in exactly one of three states: draft, active, or retired.**
Draft is editable and governs nothing. Active governs documents. Retired governs
nothing new while continuing to govern what it already holds.

**`RET-6` A draft policy can be edited freely; an active policy cannot have its period or start event shortened.**
Lengthening retention is safe. Shortening it can bring forward a disposition
date that a compliance decision depended on, so it is a new policy, not an edit.

**`RET-7` Retiring a policy does not release the documents it already governs.**
Retirement stops new assignments. Documents already counting keep counting under
the policy version they were assigned. Any other behaviour would let a
configuration change destroy the retention it was meant to manage.

**`RET-8` Policies are versioned, and every document records which policy version governs it.**
Without this, "why is this document still here" has no answer.

**`RET-9` Changing which policy a document type uses reports how many existing documents it affects and what happens to them.**
Before it is applied, as with `DOS-A-4`. Moving a type from a three-year policy
to a seven-year one is a decision with a number attached, and the administrator
should see the number.

## What the user sees

**`RET-10` A document under retention says so, in place, with the date and the policy.**
"Retention is currently in effect for this document" plus what it expires on and
which policy decided that. This is `DOS-U-13` at the document level.

**`RET-11` Retention state is filterable and sortable like any other attribute.**
Finding everything expiring next quarter is an ordinary query, not a report
request.

**`RET-12` Expiry moves a document into a disposition review queue and does nothing else.**
Restating `DOS-A-13` here because this is the file someone configuring retention
will read: **nothing is destroyed automatically.** A policy that deletes on
expiry is not in scope, and the market products that offer it are the reason
this sentence is explicit.

**`RET-13` A legal hold suspends expiry without altering the policy or the computed date.**
When the hold lifts, the original date is what applies — the hold is not a
pause that shifts the clock. See `DOS-A-14`.
