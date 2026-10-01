import s from './ProgressBar.module.css'

interface Props { value: number; label: string }

/** Determinate progress, `value` 0–100. `label` is read by screen readers. */
export function ProgressBar({ value, label }: Props) {
  const v = Math.min(100, Math.max(0, value))
  return (
    <div className={s.track} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={v}>
      <div className={s.fill} style={{ width: `${v}%` }} />
    </div>
  )
}
