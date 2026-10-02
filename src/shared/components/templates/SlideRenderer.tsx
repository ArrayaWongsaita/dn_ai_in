import type { SlideData } from '@/shared/types/slide'
import { CompareSlide } from './CompareSlide'
import { CoverSlide } from './CoverSlide'
import { StatSlide } from './StatSlide'
import { StatementSlide } from './StatementSlide'
import { GitflowSlide } from './GitflowSlide'
import { LlmflowSlide } from './LlmflowSlide'
import { TerminalSlide } from './TerminalSlide'

/** SlideData → template. The `never` check makes a missing case a compile error. */
export function SlideRenderer({ slide }: { slide: SlideData }) {
  switch (slide.type) {
    case 'cover': return <CoverSlide {...slide} />
    case 'stat': return <StatSlide {...slide} />
    case 'statement': return <StatementSlide {...slide} />
    case 'compare': return <CompareSlide {...slide} />
    case 'gitflow': return <GitflowSlide {...slide} />
    case 'llmflow': return <LlmflowSlide {...slide} />
    case 'terminal': return <TerminalSlide {...slide} />
    default: { const _exhaustive: never = slide; return _exhaustive }
  }
}
