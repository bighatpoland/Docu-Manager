import { useRef, type ReactNode } from 'react';

/**
 * LOCAL COMPONENT — not part of @bighatpoland/ui.
 *
 * The design system has no `Tabs`. Per rule 7 of its agent skill, the fix is to
 * build it here against semantic tokens and say so out loud, rather than bend
 * `NavList` into a tablist it was not designed to be.
 *
 * A tablist is a keyboard widget before it is a row of buttons: arrows move
 * between tabs, Home and End jump to the ends, and only the active tab is a tab
 * stop. That is the part a hand-rolled row of `<button>`s always misses — and
 * the reason this wants to graduate into the system rather than live here.
 */
export type TabItem = { id: string; label: string };

export function Tabs({
  items,
  activeId,
  onChange,
  ariaLabel,
}: {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  ariaLabel: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  function focusTab(index: number) {
    const tabs = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[index]?.focus();
    const item = items[index];
    if (item) onChange(item.id);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const current = items.findIndex((item) => item.id === activeId);
    if (current < 0) return;

    const last = items.length - 1;
    if (event.key === 'ArrowRight') focusTab(current === last ? 0 : current + 1);
    else if (event.key === 'ArrowLeft') focusTab(current === 0 ? last : current - 1);
    else if (event.key === 'Home') focusTab(0);
    else if (event.key === 'End') focusTab(last);
    else return;

    event.preventDefault();
  }

  return (
    <div className="dm-tabs" role="tablist" aria-label={ariaLabel} ref={listRef} onKeyDown={onKeyDown}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`dm-tab-${item.id}`}
            aria-selected={active}
            aria-controls={`dm-panel-${item.id}`}
            // Only the active tab is in the tab order; arrows do the rest.
            tabIndex={active ? 0 : -1}
            className={`dm-tab bh-focusable${active ? ' dm-tab--active' : ''}`}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({
  id,
  activeId,
  children,
}: {
  id: string;
  activeId: string;
  children: ReactNode;
}) {
  if (id !== activeId) return null;
  return (
    <div
      role="tabpanel"
      id={`dm-panel-${id}`}
      aria-labelledby={`dm-tab-${id}`}
      // Focusable so the panel is reachable from the tab it belongs to.
      tabIndex={0}
      className="dm-tabpanel bh-focusable"
    >
      {children}
    </div>
  );
}
