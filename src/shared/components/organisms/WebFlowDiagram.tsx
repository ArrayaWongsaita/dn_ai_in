import { Stack, Text } from '@/shared/components/atoms'
import { TimelineControls } from '@/shared/components/molecules'
import { useTimeline } from '@/shared/hooks'
import type { WebFlowDiagramDefinition } from '@/shared/animation/webflow/types'
import s from './WebFlowDiagram.module.css'

/** A textual route and role diagram; captions follow the same labels as manual controls. */
export function WebFlowDiagram({ scene }: { scene: WebFlowDiagramDefinition }) {
  const [scope, tl] = useTimeline(scene.build)
  const caption = tl.step === 0 ? 'ดูบทบาททั้งสาม แล้วกดถัดไปเพื่อดูเส้นทางทีละขั้น' : scene.steps[tl.step - 1].caption
  return (
    <Stack gap="md">
      <div ref={scope}>
        <Stack gap="md">
          <section className={s.nodes} aria-label={scene.title}>
            {scene.nodes.map((node) => (
              <div className={s.node} key={node.label}>
                <Stack gap="sm"><strong>{node.label}</strong><Text variant="muted">{node.note}</Text></Stack>
              </div>
            ))}
          </section>
          <Stack gap="sm">
            {scene.steps.map((step, i) => (
              <div className={s.message} data-el={`message-${i}`} key={step.text}>
                <Text variant="muted">{step.text}</Text>
              </div>
            ))}
          </Stack>
        </Stack>
      </div>
      <div aria-live="polite"><Text variant="muted">{caption}</Text></div>
      <TimelineControls playing={tl.playing} progress={tl.progress}
        canPrev={tl.step > 0} canNext={tl.step < tl.stepCount - 1}
        onToggle={tl.toggle} onRestart={tl.restart}
        onPrev={() => tl.goToStep(tl.step - 1)} onNext={() => tl.goToStep(tl.step + 1)} onSeek={tl.seek} />
    </Stack>
  )
}
