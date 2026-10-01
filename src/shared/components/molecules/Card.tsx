import type { ReactNode } from 'react'
import { Text } from '@/shared/components/atoms'
import s from './Card.module.css'

interface Props { title: string; children: ReactNode; action?: ReactNode }

/** Bordered content box: title, body and an optional action (e.g. a Button). */
export const Card = ({ title, children, action }: Props) => (
  <article className={s.card}>
    <h3 className={s.title}>{title}</h3>
    <Text variant="muted">{children}</Text>
    {action}
  </article>
)
