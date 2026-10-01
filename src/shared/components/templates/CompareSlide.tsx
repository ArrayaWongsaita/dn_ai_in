import { Heading, Stack, Text } from '@/shared/components/atoms'
import { SwatchRow } from '@/shared/components/molecules'
import { SlideFrame } from '@/shared/components/organisms'
import type { CompareData } from '@/shared/types/slide'

export function CompareSlide({ title, items, sub, src }: CompareData) {
  return (
    <SlideFrame source={src}>
      <Stack gap="lg">
        <Heading>{title}</Heading>
        <SwatchRow items={items} />
        {sub && <Text variant="muted">{sub}</Text>}
      </Stack>
    </SlideFrame>
  )
}
