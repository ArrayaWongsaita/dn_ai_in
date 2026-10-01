import { useRef, type ReactNode } from 'react'
import { Pill } from '@/shared/components/atoms'
import { ChromeBar, NavDots, ThemeToggle } from '@/shared/components/molecules'
import { useDeckNavigation } from '@/shared/hooks'

interface Props { count: number; backTo: string; backLabel: string; children: ReactNode }

/** Chrome + navigation around a list of SlideFrames. `count` = number of slides in `children`. */
export function Deck({ count, backTo, backLabel, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { current, goTo } = useDeckNavigation(ref)
  return (
    <div ref={ref} data-deck>
      <ChromeBar>
        <ThemeToggle />
        <Pill to={backTo}>{backLabel}</Pill>
      </ChromeBar>
      <NavDots count={count} current={current} onSelect={goTo} />
      {children}
    </div>
  )
}
