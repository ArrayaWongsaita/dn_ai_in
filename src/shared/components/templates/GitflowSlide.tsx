import { Heading, Stack, Text } from '@/shared/components/atoms'
import { GitFlow, SlideFrame } from '@/shared/components/organisms'
import type { GitFlowData } from '@/shared/types/slide'

/** A command slide backed by a registered GitFlow scene. */
export function GitflowSlide({ scene, command, title, sub }: GitFlowData) {
  return (
    <SlideFrame>
      <Stack gap="lg">
        <Stack gap="sm">
          <Heading>{title}</Heading>
          {sub && <Text variant="muted">{sub}</Text>}
        </Stack>
        <GitFlow sceneId={scene} command={command} />
      </Stack>
    </SlideFrame>
  )
}
