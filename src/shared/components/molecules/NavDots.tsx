import { Dot } from '@/shared/components/atoms'
import s from './NavDots.module.css'

interface Props { count: number; current: number; onSelect: (i: number) => void }

export function NavDots({ count, current, onSelect }: Props) {
  return (
    <nav className={s.nav} aria-label="สไลด์">
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} label={`สไลด์ ${i + 1}`} active={i === current} onClick={() => onSelect(i)} />
      ))}
    </nav>
  )
}
