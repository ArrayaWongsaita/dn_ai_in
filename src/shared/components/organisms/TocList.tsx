import { TocItem } from '@/shared/components/molecules'
import s from './TocList.module.css'

interface Item { to: string; title: string; summary?: string }

export function TocList({ items }: { items: Item[] }) {
  return (
    <ol className={s.list}>
      {items.map((it, i) => <TocItem key={it.to} n={i + 1} {...it} />)}
    </ol>
  )
}
