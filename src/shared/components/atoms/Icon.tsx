import s from './Icon.module.css'

type IconName = 'check' | 'warning' | 'bulb'

/** Exactly one of `decorative` (hidden from screen readers) or `label` (its text) — TypeScript, not an a11y tool, enforces it. */
export type IconProps =
  | { name: IconName; decorative: true; label?: never }
  | { name: IconName; decorative?: never; label: string }

const PATHS: Record<IconName, string[]> = {
  check: ['M5 12.8l4.6 4.6L19 7.6'],
  warning: ['M12 4.5l8.5 14.7h-17z', 'M12 9.8v4.6', 'M12 17.6v.01'],
  bulb: ['M9.8 15.2c0-1.3-.5-2-1.3-2.7A5.6 5.6 0 1 1 15.5 12.5c-.8.7-1.3 1.4-1.3 2.7', 'M9.4 18.4h5.2', 'M10.4 21.2h3.2'],
}

/** Thin-line icon drawn in the current text colour, sized to the surrounding text (1em). */
export function Icon(props: IconProps) {
  const draw = PATHS[props.name].map((d) => <path key={d} d={d} />)
  if (props.decorative) return <svg viewBox="0 0 24 24" className={s.icon} aria-hidden="true">{draw}</svg>
  return <svg viewBox="0 0 24 24" className={s.icon} role="img" aria-label={props.label}>{draw}</svg>
}
