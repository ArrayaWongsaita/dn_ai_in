import s from './Dot.module.css'

interface Props { label: string; active?: boolean; onClick: () => void }

export const Dot = ({ label, active, onClick }: Props) => (
  <button type="button" className={s.dot} aria-label={label} aria-current={active || undefined} onClick={onClick} />
)
