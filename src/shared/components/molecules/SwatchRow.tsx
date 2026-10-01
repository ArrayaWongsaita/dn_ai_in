import { Swatch } from '@/shared/components/atoms'
import type { CompareItem } from '@/shared/types/slide'
import s from './SwatchRow.module.css'

export function SwatchRow({ items }: { items: CompareItem[] }) {
  return (
    <div className={s.row} role="group">
      {items.map((it) => <Swatch key={it.text} fg={it.fg} bg={it.bg} note={it.note}>{it.text}</Swatch>)}
    </div>
  )
}
