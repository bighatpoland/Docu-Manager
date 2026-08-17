import { useEffect, useState } from 'react';
import { Button, Dialog, StateBlock } from '@bighatpoland/ui';

import { FileDropzone } from '../components/FileDropzone';
import {
  CURRENT_USER,
  MAX_FILE_SIZE_MB,
  stamp,
  today,
  type ManagedDocument,
} from '../data/documents';

export function UploadDialog({
  open,
  newVersionOf,
  onClose,
  onUploaded,
}: {
  open: boolean;
  /** A document id when uploading a new version of it, otherwise null. */
  newVersionOf: string | null;
  onClose: () => void;
  onUploaded: (created: ManagedDocument[], newVersionOf: string | null) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  // Reopening the dialog must not inherit the last attempt's queue.
  useEffect(() => {
    if (!open) setFiles([]);
  }, [open]);

  const sized = files.map((file) => ({
    file,
    sizeMB: file.size / (1024 * 1024),
  }));
  const tooBig = sized.filter((entry) => entry.sizeMB > MAX_FILE_SIZE_MB);
  const accepted = sized.filter((entry) => entry.sizeMB <= MAX_FILE_SIZE_MB);

  // A new version is one file replacing one file; more than that is ambiguous.
  const limit = newVersionOf ? 1 : Infinity;
  const queued = accepted.slice(0, limit);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={newVersionOf ? 'Upload new version' : 'Upload documents'}
      description={
        newVersionOf
          ? 'The new file becomes the latest version. Earlier versions stay available.'
          : undefined
      }
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            // Disabled rather than an alert on click: the reason there is
            // nothing to upload is already visible on screen.
            disabled={queued.length === 0}
            onClick={() => onUploaded(queued.map((entry) => toDocument(entry.file, entry.sizeMB)), newVersionOf)}
          >
            {queued.length > 1 ? `Upload ${queued.length} files` : 'Upload'}
          </Button>
        </>
      }
    >
      <div className="dm-stack">
        <FileDropzone
          onFiles={(incoming) => setFiles(newVersionOf ? incoming.slice(0, 1) : incoming)}
          hint={`Any file type • up to ${MAX_FILE_SIZE_MB} MB each`}
        />

        {queued.length > 0 && (
          <ul className="dm-filelist">
            {queued.map((entry, index) => (
              <li className="dm-filelist__item" key={`${entry.file.name}-${index}`}>
                <span className="dm-filelist__name dm-grow">
                  {entry.file.name}
                  <span className="dm-nowrap"> · {entry.sizeMB.toFixed(1)} MB</span>
                </span>
                <Button
                  variant="ghost"
                  tone="critical"
                  size="sm"
                  onClick={() => setFiles((current) => current.filter((_, i) => i !== index))}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}

        {tooBig.length > 0 && (
          /*
           * An error the user has to act on in place, so it is a StateBlock and
           * not a Toast — and it names the files rather than the rule.
           */
          <StateBlock
            state="error"
            density="inline"
            title={
              tooBig.length === 1
                ? 'One file is too large to upload'
                : `${tooBig.length} files are too large to upload`
            }
            description={`Over the ${MAX_FILE_SIZE_MB} MB limit: ${tooBig
              .map((entry) => `${entry.file.name} (${entry.sizeMB.toFixed(1)} MB)`)
              .join(', ')}. Remove them or choose smaller files.`}
          />
        )}
      </div>
    </Dialog>
  );
}

function toDocument(file: File, sizeMB: number): ManagedDocument {
  const size = sizeMB.toFixed(1);
  return {
    id: `DOC-${Date.now().toString().slice(-8)}-${Math.random().toString(36).slice(2, 6)}`,
    title: file.name,
    type: 'Invoice',
    linkedRecord: 'Not linked yet',
    status: 'Pending',
    uploadDate: today(),
    uploadedBy: CURRENT_USER,
    fileSize: size,
    description: '',
    tags: [],
    versions: [{ version: 1, date: today(), size: `${size} MB` }],
    auditTrail: [`${stamp()} – Uploaded by ${CURRENT_USER}`],
  };
}
