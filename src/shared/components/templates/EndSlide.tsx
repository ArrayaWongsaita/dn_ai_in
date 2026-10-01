import { AppLink, Heading, Kicker, Stack } from '@/shared/components/atoms'
import { SlideFrame } from '@/shared/components/organisms'
import type { NextChapter } from '@/shared/types/slide'

/** Last slide of a chapter: link to the next chapter, or back to the index. */
export function EndSlide({ next }: { next?: NextChapter }) {
  return (
    <SlideFrame>
      <Stack>
        {next && <Kicker>บทถัดไป</Kicker>}
        <Heading>
          {next ? <AppLink to={next.to}>{next.title} →</AppLink> : <AppLink to="/">← กลับสารบัญ</AppLink>}
        </Heading>
      </Stack>
    </SlideFrame>
  )
}
