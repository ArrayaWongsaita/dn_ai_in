import type { ReactNode } from 'react'
import { Badge, Text } from '@/shared/components/atoms'
import s from './Callout.module.css'

interface Props { title: string; children: ReactNode }

/** Highlighted note block: a Badge title over body text, marked by a purple edge. */
export const Callout = ({ title, children }: Props) => (
  <aside className={s.callout}>
    <Badge tone="accent">{title}</Badge>
    <Text>{children}</Text>
  </aside>
)
