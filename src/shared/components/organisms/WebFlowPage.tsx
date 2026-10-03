import { useState } from 'react'
import { Stack, Text } from '@/shared/components/atoms'
import { TimelineControls } from '@/shared/components/molecules'
import { useTimeline } from '@/shared/hooks'
import type { WebFlowPageDefinition } from '@/shared/animation/webflow/page'
import { webFlowExample as example } from '@/shared/animation/webflow/example'
import s from './WebFlowPage.module.css'

/** The same board markup gains presentation, then a local task-moving behavior. */
export function WebFlowPage({ scene }: { scene: WebFlowPageDefinition }) {
  const [moved, setMoved] = useState(false)
  const [scope, tl] = useTimeline(scene.build)
  const interactive = scene.layer === 'js' && tl.step > 0
  return (
    <Stack gap="md">
      <div ref={scope} data-board-scene={scene.layer}>
        <section data-el="board" className={scene.layer === 'html' ? s.plain : s.styled} aria-label={`${example.name} · ${scene.title}`}>
          <Stack gap="md">
            <header className={s.header}>
              <Stack gap="sm"><strong>{example.name}</strong><Text variant="muted">{example.label}</Text></Stack>
            </header>
            <h3>{example.board}</h3>
            <div className={s.columns}>
              {example.columns.map((column, columnIndex) => (
                <section className={s.column} key={column} aria-label={column}>
                  <Stack gap="sm">
                    <h4>{column}</h4>
                    {example.tasks.map((task, taskIndex) => (
                      (taskIndex === 0 && moved && interactive ? 2 : task.column) === columnIndex && (
                        <article className={s.card} key={task.title}>
                          <Stack gap="sm">
                            <strong>{task.title}</strong><Text variant="muted">{task.owner}</Text>
                            {taskIndex === 0 && !(moved && interactive) && (
                              <button className={s.action} disabled={!interactive} onClick={() => setMoved(true)}>{example.move}</button>
                            )}
                          </Stack>
                        </article>
                      )
                    ))}
                  </Stack>
                </section>
              ))}
            </div>
            {moved && interactive && <div role="status"><Text variant="muted">{example.moved}</Text></div>}
          </Stack>
        </section>
      </div>
      <div aria-live="polite"><Text variant="muted">{scene.caption}</Text></div>
      <TimelineControls playing={tl.playing} progress={tl.progress}
        canPrev={tl.step > 0} canNext={tl.step < tl.stepCount - 1}
        onToggle={tl.toggle} onRestart={() => { setMoved(false); tl.restart() }}
        onPrev={() => { setMoved(false); tl.goToStep(tl.step - 1) }}
        onNext={() => tl.goToStep(tl.step + 1)} onSeek={tl.seek} />
    </Stack>
  )
}
