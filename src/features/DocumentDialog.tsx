import { useEffect, useState } from 'react';
import { Badge, Button, Dialog, Input, StateBlock, useToast } from '@bighatpoland/ui';

import { RemovableChip } from '../components/Chip';
import { Tabs, TabPanel, type TabItem } from '../components/Tabs';
import { Textarea } from '../components/Textarea';
import {
  CURRENT_USER,
  MAX_TAGS,
  stamp,
  statusTone,
  type DocumentStatus,
  type ManagedDocument,
} from '../data/documents';

const TABS: TabItem[] = [
  { id: 'info', label: 'Info' },
  { id: 'edit', label: 'Edit' },
  { id: 'versions', label: 'Versions' },
  { id: 'audit', label: 'Audit trail' },
];

const STATUSES: DocumentStatus[] = ['Approved', 'Pending', 'Rejected'];

export function DocumentDialog({
  document: doc,
  onClose,
  onChange,
  onUploadNewVersion,
}: {
  document: ManagedDocument | null;
  onClose: () => void;
  onChange: (id: string, change: (doc: ManagedDocument) => ManagedDocument) => void;
  onUploadNewVersion: (id: string) => void;
}) {
  const { notify } = useToast();

  const [tab, setTab] = useState('info');
  const [description, setDescription] = useState('');
  const [newTag, setNewTag] = useState('');
  const [tagError, setTagError] = useState<string | undefined>();

  const id = doc?.id;

  // Opening a different document resets the dialog rather than showing the
  // previous document's unsaved draft under the new title.
  useEffect(() => {
    setTab('info');
    setNewTag('');
    setTagError(undefined);
    setDescription(doc?.description ?? '');
    // Keyed on the id, not the object — an edit elsewhere must not wipe a draft.
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!doc) return null;

  function setStatus(status: DocumentStatus) {
    onChange(doc!.id, (current) => ({
      ...current,
      status,
      auditTrail: [`${stamp()} – Status changed to ${status} by ${CURRENT_USER}`, ...current.auditTrail],
    }));
    notify({ tone: 'success', title: `Marked as ${status.toLowerCase()}` });
  }

  function addTag() {
    const tag = newTag.trim().toLowerCase();
    if (!tag) return;

    if (doc!.tags.includes(tag)) {
      setTagError('That tag is already on this document.');
      return;
    }
    if (doc!.tags.length >= MAX_TAGS) {
      setTagError(`A document can carry ${MAX_TAGS} tags. Remove one to add another.`);
      return;
    }

    onChange(doc!.id, (current) => ({ ...current, tags: [...current.tags, tag] }));
    setNewTag('');
    setTagError(undefined);
  }

  return (
    <Dialog open onClose={onClose} title={doc.title} description={doc.linkedRecord} size="lg">
      <Tabs items={TABS} activeId={tab} onChange={setTab} ariaLabel="Document details" />

      <TabPanel id="info" activeId={tab}>
        <div className="dm-stack">
          <div>
            <p className="dm-label">Status</p>
            <div className="dm-row">
              <Badge tone={statusTone(doc.status)}>{doc.status}</Badge>
              {STATUSES.filter((status) => status !== doc.status).map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant="secondary"
                  tone={status === 'Rejected' ? 'critical' : 'default'}
                  onClick={() => setStatus(status)}
                >
                  Mark {status.toLowerCase()}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="dm-label">Uploaded</p>
            <p className="dm-body">
              {doc.uploadDate} by {doc.uploadedBy} · {doc.fileSize} MB · version{' '}
              {doc.versions.length}
            </p>
          </div>

          <div>
            <p className="dm-label">Description</p>
            <p className="dm-body">
              {doc.description || 'No description yet. Add one from the Edit tab.'}
            </p>
          </div>

          <div className="dm-row">
            <Button variant="secondary" onClick={() => onUploadNewVersion(doc.id)}>
              Upload new version
            </Button>
          </div>
        </div>
      </TabPanel>

      <TabPanel id="edit" activeId={tab}>
        <div className="dm-stack">
          <Textarea
            label="Description"
            value={description}
            onValueChange={setDescription}
            description="What this document is for, in a line or two."
            rows={4}
          />

          <div className="dm-stack">
            <p className="dm-label">
              Tags ({doc.tags.length}/{MAX_TAGS})
            </p>

            {doc.tags.length > 0 && (
              <div className="dm-chips">
                {doc.tags.map((tag) => (
                  <RemovableChip
                    key={tag}
                    label={tag}
                    onRemove={() =>
                      onChange(doc.id, (current) => ({
                        ...current,
                        tags: current.tags.filter((existing) => existing !== tag),
                      }))
                    }
                  />
                ))}
              </div>
            )}

            <div className="dm-row dm-row--fields">
              <span className="dm-grow">
                <Input
                  label="New tag"
                  value={newTag}
                  error={tagError}
                  onChange={(event) => {
                    setNewTag(event.target.value);
                    setTagError(undefined);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      addTag();
                    }
                  }}
                />
              </span>
              <Button variant="secondary" onClick={addTag} disabled={!newTag.trim()}>
                Add tag
              </Button>
            </div>
          </div>

          <div className="dm-row dm-row--between">
            <Button
              onClick={() => {
                onChange(doc.id, (current) => ({ ...current, description: description.trim() }));
                notify({ tone: 'success', title: 'Changes saved' });
              }}
              disabled={description.trim() === doc.description}
            >
              Save changes
            </Button>
          </div>
        </div>
      </TabPanel>

      <TabPanel id="versions" activeId={tab}>
        <ol className="dm-trail">
          {[...doc.versions].reverse().map((version) => (
            <li className="dm-trail__item" key={version.version}>
              <span className="dm-trail__title">Version {version.version}</span>
              <br />
              {version.date} · {version.size}
            </li>
          ))}
        </ol>
      </TabPanel>

      <TabPanel id="audit" activeId={tab}>
        {doc.auditTrail.length === 0 ? (
          <StateBlock
            state="empty"
            density="inline"
            title="Nothing recorded yet"
            description="Uploads, approvals and new versions will appear here."
          />
        ) : (
          <ol className="dm-trail">
            {doc.auditTrail.map((entry, index) => (
              <li className="dm-trail__item" key={`${entry}-${index}`}>
                {entry}
              </li>
            ))}
          </ol>
        )}
      </TabPanel>
    </Dialog>
  );
}
