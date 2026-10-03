import type { ReactNode } from 'react'
import { Screen, Source } from '@/shared/components/atoms'
import { SeenContext, useInView } from '@/shared/hooks'
import { cx } from '@/shared/lib/cx'
import s from './SlideFrame.module.css'

interface Props { source?: string; background?: 'bg' | 'surface'; children: ReactNode }

/** One slide: a snap-aligned Screen that reveals on first view and shares `seen` with its children.
    `background` paints the frame itself (not the children) so the colour holds through the reveal. */
export function SlideFrame({ source, background = 'bg', children }: Props) {
  const { ref, seen } = useInView<HTMLElement>()
  return (
    <SeenContext value={seen}>
      <Screen ref={ref} data-slide className={cx(s.frame, s[background], seen && s.seen)}>
        {children}
        {source && <div className={s.footer}><Source>{source}</Source></div>}
      </Screen>
    </SeenContext>
  )
}
