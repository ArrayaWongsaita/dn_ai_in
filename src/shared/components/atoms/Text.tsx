import type { ReactNode } from 'react'
import s from './Text.module.css'

interface Props { variant?: 'body' | 'muted' | 'label'; children: ReactNode }

export function Text({ variant = 'body', children }: Props) {
  return <p className={s[variant]}>{children}</p>
}
