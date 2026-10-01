import { Heading, Stack, Text } from '@/shared/components/atoms'
import { SlideFrame } from '@/shared/components/organisms'
import type { StatementData } from '@/shared/types/slide'

export function StatementSlide({ title, sub, src }: StatementData) {
  return (
    <SlideFrame source={src}>
      <Stack gap="lg">
        <Heading>{title}</Heading>
        {sub && <Text variant="muted">{sub}</Text>}
      </Stack>
    </SlideFrame>
  )
}
