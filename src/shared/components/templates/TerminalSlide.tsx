import { Heading, Stack, Text } from '@/shared/components/atoms'
import { SlideFrame, TerminalFlow } from '@/shared/components/organisms'
import type { TerminalData } from '@/shared/types/slide'

/** A command slide backed by a registered terminal scene. */
export function TerminalSlide({ scene, command, title, sub }: TerminalData) {
  return (
    <SlideFrame>
      <Stack gap="lg">
        <Stack gap="sm">
          <Heading>{title}</Heading>
          {sub && <Text variant="muted">{sub}</Text>}
        </Stack>
        <TerminalFlow sceneId={scene} command={command} />
      </Stack>
    </SlideFrame>
  )
}
