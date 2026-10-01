import type { ReactNode } from 'react'
import { cx } from '@/shared/lib/cx'
import s from './Badge.module.css'

interface Props { children: ReactNode; tone?: 'neutral' | 'accent' }

/** Static status/label chip. Meaning always lives in the text, never the colour alone. */
export const Badge = ({ children, tone = 'neutral' }: Props) => <span className={cx(s.badge, s[tone])}>{children}</span>
