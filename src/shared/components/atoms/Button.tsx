import type { ReactNode } from 'react'
import { cx } from '@/shared/lib/cx'
import { AppLink } from './AppLink'
import s from './Button.module.css'

interface Props {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  to?: string
  disabled?: boolean
  label?: string
  onClick?: () => void
}

/** Action control: primary (filled purple), secondary (outline) or ghost (text). Router link when `to` is set. */
export function Button({ children, variant = 'primary', size = 'md', to, disabled, label, onClick }: Props) {
  const className = cx(s.button, s[variant], s[size])
  if (to) return <AppLink to={to} className={className} aria-label={label}>{children}</AppLink>
  return <button type="button" className={className} aria-label={label} disabled={disabled} onClick={onClick}>{children}</button>
}
