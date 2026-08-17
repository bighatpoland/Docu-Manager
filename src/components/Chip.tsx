/**
 * LOCAL COMPONENTS — not part of @bighatpoland/ui.
 *
 * `Badge` is the closest thing the system has, and its `notFor` list rules this
 * out in as many words: "Anything clickable". It is right to refuse — a status
 * you can press is two components wearing one coat. So filter chips and
 * removable tag chips live here.
 *
 * The two are deliberately separate. A `FilterChip` is a toggle and reports
 * `aria-pressed`; a `RemovableChip` is a label with a button beside it. One
 * component with a `removable` prop would have had to lie about one of them.
 */

export function FilterChip({
  label,
  pressed,
  onToggle,
}: {
  label: string;
  pressed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      // The state is in the semantics, not only in the fill — a user who cannot
      // see the highlight still hears "pressed".
      aria-pressed={pressed}
      className={`dm-chip dm-chip--filter bh-focusable${pressed ? ' dm-chip--pressed' : ''}`}
      onClick={onToggle}
    >
      {label}
    </button>
  );
}

export function RemovableChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="dm-chip dm-chip--removable">
      {label}
      <button
        type="button"
        className="dm-chip__remove bh-focusable"
        // "×" alone is not a name. The tag is what the user is removing, so the
        // tag belongs in the label.
        aria-label={`Remove tag ${label}`}
        onClick={onRemove}
      >
        <span aria-hidden="true">×</span>
      </button>
    </span>
  );
}
