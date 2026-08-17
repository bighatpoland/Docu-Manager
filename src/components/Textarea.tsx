import { useId, type ReactNode } from 'react';

/**
 * LOCAL COMPONENT — not part of @bighatpoland/ui.
 *
 * `Input` is single-line by contract, and its `notFor` list rules out anything
 * with its own keyboard model. So a plain multi-line field has nowhere to go.
 * `Composer` is not it either — that is a prompt with a submit key handler.
 *
 * This mirrors `Input`'s API exactly (label required, description persists
 * through an error, the presence of `error` is what sets `aria-invalid`) so the
 * day the system grows a real `Textarea`, swapping it in is an import change.
 */
export function Textarea({
  label,
  value,
  onValueChange,
  description,
  error,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  description?: ReactNode;
  error?: string;
  rows?: number;
  placeholder?: string;
}) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  return (
    <div className="dm-field">
      <label className="dm-field__label" htmlFor={id}>
        {label}
      </label>

      {description && (
        <p className="dm-field__description" id={descriptionId}>
          {description}
        </p>
      )}

      <textarea
        id={id}
        className="dm-textarea bh-focusable"
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onValueChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [description && descriptionId, error && errorId].filter(Boolean).join(' ') || undefined
        }
      />

      {/* The message is the real cue; the border is the redundant one. */}
      {error && (
        <p className="dm-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
