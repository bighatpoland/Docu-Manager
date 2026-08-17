import { useRef, useState } from 'react';
import { Button } from '@bighatpoland/ui';

/**
 * LOCAL COMPONENT — not part of @bighatpoland/ui.
 *
 * The system has no file input at all, and this is the gap with the most rope
 * to hang yourself with: the usual dropzone is a `<div>` with an `onDrop`, which
 * is invisible and unreachable to anyone not using a mouse.
 *
 * So drag-and-drop here is an *enhancement* over a real `<input type="file">`.
 * The button is the control; the drop target is a convenience laid on top of it.
 * Removing the drag handlers would cost nothing but convenience — that is the
 * test this passes and a `<div onDrop>` does not.
 */
export function FileDropzone({
  onFiles,
  hint,
}: {
  onFiles: (files: File[]) => void;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div
      className={`dm-dropzone${dragging ? ' dm-dropzone--active' : ''}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        onFiles([...event.dataTransfer.files]);
      }}
    >
      <p className="dm-dropzone__lead">Drop files here</p>

      <input
        ref={inputRef}
        type="file"
        multiple
        className="bh-visually-hidden"
        // The label lives on the Button that triggers it, so the field itself
        // needs its own name for anyone tabbing straight into it.
        aria-label="Choose files to upload"
        onChange={(event) => {
          onFiles([...(event.target.files ?? [])]);
          // Reset, or picking the same file twice fires no change event.
          event.target.value = '';
        }}
      />

      <Button variant="secondary" onClick={() => inputRef.current?.click()}>
        Browse files
      </Button>

      {hint && <p className="dm-dropzone__hint">{hint}</p>}
    </div>
  );
}
