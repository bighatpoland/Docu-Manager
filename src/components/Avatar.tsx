/**
 * LOCAL COMPONENT — not part of @bighatpoland/ui.
 *
 * Initials in a circle. Small, but it has one decision in it: the initials are
 * `aria-hidden` and the name is rendered beside them. "ML" read aloud is noise,
 * and a two-letter accessible name for a person is worse than none.
 */
export function Avatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <span className="dm-avatar" aria-hidden="true">
      {initials}
    </span>
  );
}
