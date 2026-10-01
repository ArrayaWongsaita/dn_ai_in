import { SlideDeck } from '@/shared/components/templates'
import { sampleSlides } from './sample-slides'

/** /dev/slides — every slide type rendered as a real deck (keyboard, nav dots, #n all work). */
export default function DevSlides() {
  return (
    <SlideDeck
      slides={sampleSlides}
      next={{ to: '/dev/components', title: 'Component gallery' }}
      backTo="/dev"
      backLabel="← /dev"
    />
  )
}
