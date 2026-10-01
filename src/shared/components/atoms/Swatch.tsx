import type { ReactNode } from 'react'
import s from './Swatch.module.css'

interface Props { fg: string; bg: string; note?: string; children: ReactNode }

/** A colour sample. fg/bg are data (they ARE the demo), so they're the one allowed inline style. */
export function Swatch({ fg, bg, note, children }: Props) {
  return (
    <div className={s.swatch} style={{ color: fg, background: bg }}>
      {children}
      {note && <small>{note}</small>}
    </div>
  )
}
