import { Heading, Stack, Text } from '@/shared/components/atoms'
import { SlideFrame, WebFlow } from '@/shared/components/organisms'
import s from './WebflowSlide.module.css'
import type { WebflowData } from '@/shared/types/slide'

/** A web walkthrough selected from the WebFlow scene registry. */
export function WebflowSlide({ scene, title, sub, http, src, think }: WebflowData) {
  return (
    <SlideFrame source={src}>
      <div className={s.content}><Stack gap="md">
        <Stack gap="sm">
          <Heading>{title}</Heading>
          {sub && <Text variant="muted">{sub}</Text>}
        </Stack>
        <WebFlow sceneId={scene} http={http} think={think} />
      </Stack></div>
    </SlideFrame>
  )
}
