import type { ReactNode } from 'react'
import s from './BigNumber.module.css'

interface Props { label: string; children: ReactNode }

/** `label` is the final value for assistive tech, so screen readers skip the count-up. */
export function BigNumber({ label, children }: Props) {
  return <p className={s.big} aria-label={label}>{children}</p>
}
