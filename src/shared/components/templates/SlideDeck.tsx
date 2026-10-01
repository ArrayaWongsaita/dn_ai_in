import { Deck } from '@/shared/components/organisms'
import type { NextChapter, SlideData } from '@/shared/types/slide'
import { EndSlide } from './EndSlide'
import { SlideRenderer } from './SlideRenderer'

interface Props { slides: SlideData[]; next?: NextChapter; backTo?: string; backLabel?: string }

/** A whole chapter: its slides + the closing EndSlide, wrapped in a Deck. */
export function SlideDeck({ slides, next, backTo = '/', backLabel = '← สารบัญ' }: Props) {
  return (
    <Deck count={slides.length + 1} backTo={backTo} backLabel={backLabel}>
      {slides.map((slide, i) => <SlideRenderer key={i} slide={slide} />)}
      <EndSlide next={next} />
    </Deck>
  )
}
