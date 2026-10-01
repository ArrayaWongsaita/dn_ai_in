import type { ReactNode } from 'react'
import s from './Heading.module.css'

interface Props { level?: 'display' | 'title'; children: ReactNode }

/** `display` → h1 (cover), `title` → h2. "\n" in strings becomes a line break. */
export function Heading({ level = 'title', children }: Props) {
  const Tag = level === 'display' ? 'h1' : 'h2'
  return <Tag className={s[level]}>{children}</Tag>
}
