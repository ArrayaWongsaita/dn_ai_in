import type { ReactNode } from 'react'
import { Badge, Icon, Text } from '@/shared/components/atoms'
import { cx } from '@/shared/lib/cx'
import s from './Callout.module.css'

interface Props {
  title: string
  children: ReactNode
  /** Picks the icon + edge colour only — every tone (and no tone) shares the --surface background. */
  tone?: 'concept' | 'remember' | 'warning'
}

const ICON = { concept: 'bulb', remember: 'check', warning: 'warning' } as const

/** Highlighted note on the shared --surface. The required `title` text carries the meaning,
    so a tone never speaks through colour alone (icon + edge: scripts/check-contrast.mjs). */
export const Callout = ({ title, children, tone }: Props) => (
  <aside className={cx(s.callout, tone && s[tone])}>
    <div className={s.head}>
      {tone && <span className={s.icon}><Icon name={ICON[tone]} decorative /></span>}
      <Badge tone="accent">{title}</Badge>
    </div>
    <Text>{children}</Text>
  </aside>
)
