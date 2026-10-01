import { Heading, Kicker, Stack, Text } from '@/shared/components/atoms'
import { SlideFrame } from '@/shared/components/organisms'
import type { CoverData } from '@/shared/types/slide'

export function CoverSlide({ kicker, title, sub }: CoverData) {
  return (
    <SlideFrame>
      <Stack>
        {kicker && <Kicker>{kicker}</Kicker>}
        <Heading level="display">{title}</Heading>
        {sub && <Text variant="muted">{sub}</Text>}
      </Stack>
    </SlideFrame>
  )
}
