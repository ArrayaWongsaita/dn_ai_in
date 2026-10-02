import { Fragment } from 'react'
import { Stack, Text } from '@/shared/components/atoms'
import { Terminal, TimelineControls } from '@/shared/components/molecules'
import { gitFlowScenes, type GitFlowZoneId } from '@/shared/animation/gitflow'
import { useTimeline } from '@/shared/hooks'
import s from './GitFlow.module.css'

const zones: { id: GitFlowZoneId; label: string }[] = [
  { id: 'working', label: 'โฟลเดอร์ทำงาน' },
  { id: 'staging', label: 'พื้นที่เตรียม' },
  { id: 'repository', label: 'ที่เก็บประวัติ' },
  { id: 'remote', label: 'รีโมต · GitHub' },
]

/** Four-zone Git diagram and terminal, controlled by the shared timeline UI. */
export function GitFlow({ sceneId, command }: { sceneId: string; command: string }) {
  const scene = gitFlowScenes[sceneId]
  if (!scene) throw new Error(`Unknown GitFlow scene: ${sceneId}`)
  if (scene.command !== command) throw new Error(`Command does not match GitFlow scene: ${sceneId}`)
  const [scope, tl] = useTimeline(scene.build)

  return (
    <Stack gap="md">
      <div ref={scope} className={s.layout} data-current-branch="none">
        <Stack gap="md">
          <div className={s.stage} role="group" aria-label="แผนผัง 4 พื้นที่ของ Git">
            {zones.map((zone, i) => (
              <Fragment key={zone.id}>
                {i === 3 && <div className={s.internet} data-el="internet-line" aria-label="อินเทอร์เน็ต">
                  <span className={s.internetLine} />
                  <span className={s.internetLabel}>อินเทอร์เน็ต</span>
                </div>}
                <section
                  className={s.zone}
                  data-el={`zone-${zone.id}`}
                  data-zone={zone.id}
                  data-zone-state={scene.state.zones[zone.id].state}
                  aria-label={`${zone.label}: ${scene.state.zones[zone.id].note}`}
                >
                  <strong className={s.zoneTitle}>{zone.label}</strong>
                  <span className={s.zoneNote}>{scene.state.zones[zone.id].note}</span>
                  <div className={s.cards}>
                    {scene.state.cards.filter((card) => card.zone === zone.id).map((card) => (
                      <div
                        className={s.card}
                        key={card.id}
                        data-el={`card-${card.id}`}
                        data-zone={card.zone}
                        data-state={card.state}
                      >
                        <strong className={s.cardName}>{card.name}</strong>
                        <span className={s.cardLabel}>{card.label}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </Fragment>
            ))}
          </div>
          <Terminal command={command} output={scene.state.output} />
        </Stack>
      </div>
      <div className={s.caption} aria-live="polite">
        <Text variant="label">{scene.state.caption}</Text>
      </div>
      <TimelineControls
        playing={tl.playing}
        progress={tl.progress}
        canPrev={tl.step > 0}
        canNext={tl.step < tl.stepCount - 1}
        onToggle={tl.toggle}
        onRestart={tl.restart}
        onPrev={() => tl.goToStep(tl.step - 1)}
        onNext={() => tl.goToStep(tl.step + 1)}
        onSeek={tl.seek}
      />
    </Stack>
  )
}
