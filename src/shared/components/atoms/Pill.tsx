import type { ReactNode } from 'react'
import { AppLink } from './AppLink'
import s from './Pill.module.css'

interface Props { children: ReactNode; label?: string; to?: string; onClick?: () => void }

/** Small rounded control: a router link when `to` is set, otherwise a button. */
export function Pill({ children, label, to, onClick }: Props) {
  if (to) return <AppLink to={to} className={s.pill} aria-label={label}>{children}</AppLink>
  return <button type="button" className={s.pill} aria-label={label} onClick={onClick}>{children}</button>
}
