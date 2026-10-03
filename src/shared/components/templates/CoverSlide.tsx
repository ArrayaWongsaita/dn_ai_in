import { Heading, Kicker, Stack, Text } from '@/shared/components/atoms'
import { SlideFrame } from '@/shared/components/organisms'
import s from './CoverSlide.module.css'
import type { CoverData } from '@/shared/types/slide'

export function CoverSlide({ kicker, title, sub }: CoverData) {
  return (
    <SlideFrame background="surface">
      <Stack>
        {kicker && <Kicker>{kicker}</Kicker>}
        <Heading level="display">{title}</Heading>
        <span aria-hidden="true" className={s.bar} />
        {sub && <Text variant="muted">{sub}</Text>}
      </Stack>
    </SlideFrame>
  )
}
