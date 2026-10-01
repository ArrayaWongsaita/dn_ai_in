import type { ReactNode } from 'react'
import { cx } from '@/shared/lib/cx'
import s from './Stack.module.css'

interface Props { gap?: 'sm' | 'md' | 'lg'; children: ReactNode }

/** Vertical rhythm lives here — atoms never set their own margins. */
export const Stack = ({ gap = 'md', children }: Props) => <div className={cx(s.stack, s[gap])}>{children}</div>
