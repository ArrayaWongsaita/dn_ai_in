import s from './Scrubber.module.css'

interface Props { label: string; value: number; onChange: (v: number) => void }

/** Range input for scrubbing a 0–1 value (timeline progress). */
export const Scrubber = ({ label, value, onChange }: Props) => (
  <input
    className={s.range}
    type="range" min={0} max={1} step={0.001}
    aria-label={label} value={value}
    onChange={(e) => onChange(e.currentTarget.valueAsNumber)}
  />
)
