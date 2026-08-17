import { type ReactNode } from 'react';

/**
 * LOCAL COMPONENT — not part of @bighatpoland/ui.
 *
 * The grid/list view switch. A segmented control is a single choice with a
 * current value, which makes it a radio group — the same argument `Composer`
 * makes for its modes, except `Composer` keeps that machinery private.
 *
 * Rendering it as two buttons is the common shortcut and it loses the current
 * value for anyone who cannot see which half is filled. Real radios keep it,
 * and get arrow-key navigation from the browser for free.
 */
export type ToggleOption = { id: string; label: string; icon?: ReactNode };

export function ToggleGroup({
  legend,
  options,
  value,
  onChange,
  name,
}: {
  /** Names the choice. Visually hidden — the icons carry it on screen. */
  legend: string;
  options: ToggleOption[];
  value: string;
  onChange: (id: string) => void;
  name: string;
}) {
  return (
    <fieldset className="dm-togglegroup">
      <legend className="bh-visually-hidden">{legend}</legend>
      <div className="dm-togglegroup__track">
        {options.map((option) => {
          const active = option.id === value;
          return (
            <label
              key={option.id}
              className={`dm-toggle${active ? ' dm-toggle--active' : ''}`}
              title={option.label}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={active}
                onChange={() => onChange(option.id)}
                className="bh-visually-hidden"
              />
              {option.icon && (
                <span className="dm-toggle__icon" aria-hidden="true">
                  {option.icon}
                </span>
              )}
              <span className={option.icon ? 'bh-visually-hidden' : undefined}>{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
