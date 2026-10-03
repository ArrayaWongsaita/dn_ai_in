import { Heading, Stack, Text } from '@/shared/components/atoms'
import { LlmFlow, SlideFrame } from '@/shared/components/organisms'
import type { LlmFlowData } from '@/shared/types/slide'

/** A scene slide backed by a registered LlmFlow scene. */
export function LlmflowSlide({ scene, title, sub }: LlmFlowData) {
  return (
    <SlideFrame>
      <Stack gap="lg">
        <Stack gap="sm">
          <Heading>{title}</Heading>
          {sub && <Text variant="muted">{sub}</Text>}
        </Stack>
        <LlmFlow sceneId={scene} />
      </Stack>
    </SlideFrame>
  )
}
