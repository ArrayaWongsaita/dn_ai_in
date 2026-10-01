import { AppLink } from '@/shared/components/atoms'
import s from './TocItem.module.css'

interface Props { n: number; to: string; title: string; summary?: string }

export function TocItem({ n, to, title, summary }: Props) {
  return (
    <li className={s.item}>
      <AppLink to={to} className={s.row}>
        <span className={s.n}>{n}</span>
        <span>{title}{summary && <small className={s.summary}>{summary}</small>}</span>
      </AppLink>
    </li>
  )
}
