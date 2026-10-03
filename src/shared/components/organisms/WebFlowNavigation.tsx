import { Stack, Text } from '@/shared/components/atoms'
import { TimelineControls } from '@/shared/components/molecules'
import { useTimeline } from '@/shared/hooks'
import { revealThinkAnswer } from '@/shared/animation/webflow'
import type { WebFlowNavigationDefinition } from '@/shared/animation/webflow/navigation'
import { webFlowExample as example } from '@/shared/animation/webflow/example'
import s from './WebFlowNavigation.module.css'

/** Navigation uses the same fictional board; only MPA replaces the whole page. */
export function WebFlowNavigation({ scene, think = false }: { scene: WebFlowNavigationDefinition; think?: boolean }) {
  const [scope, tl] = useTimeline(think ? revealThinkAnswer : scene.build, { hold: think })
  return (
    <Stack gap="md">
      <div ref={scope} data-navigation-scene={scene.mode} data-think={think}>
        <Stack gap="md">
          {think && <Text>ลองคิด: กดลิงก์แล้วอะไรเปลี่ยน?</Text>}
          <div data-el={think ? 'think-answer' : undefined} className={think ? s.answer : undefined}>
            <Stack gap="md">
              <div className={s.exchange}>
                <strong>เบราว์เซอร์</strong>
                <div className={s.packets}>
                  {scene.mode === 'mpa' ? <Stack gap="sm">
                    <span data-el="request" className={s.packet}>GET /done →</span>
                    <span data-el="response" className={s.packet}>← HTML /done</span>
                  </Stack> : <Text variant="muted">JavaScript สลับเนื้อหาในหน้าเดิม</Text>}
                </div>
                {scene.mode === 'mpa' && <strong>Server</strong>}
              </div>
              <section data-el="navigation-page" className={s.page} aria-label={`${example.name} · ${scene.title}`}>
                <Stack gap="md">
                  <header data-el="navigation-header" className={s.header}>
                    <Stack gap="sm"><strong>{example.name}</strong><Text variant="muted">{example.label}</Text><span className={s.link}>บอร์ดงาน → งานที่เสร็จแล้ว</span></Stack>
                  </header>
                  <div className={s.body}>
                    <div data-el="old-body" className={s.panel}>
                      <Stack gap="md"><h3>{example.board}</h3><div className={s.columns}>
                        {example.columns.map((column, i) => <section key={column} className={s.column}><Stack gap="sm"><strong>{column}</strong>{example.tasks.filter(task => task.column === i).map(task => <article className={s.card} key={task.title}><Stack gap="sm"><strong>{task.title}</strong><Text variant="muted">{task.owner}</Text></Stack></article>)}</Stack></section>)}
                      </div></Stack>
                    </div>
                    <div data-el="new-body" className={`${s.panel} ${s.newBody}`}>
                      <Stack gap="md"><h3>งานที่เสร็จแล้ว</h3>{example.tasks.filter(task => task.column === 2).map(task => <article className={s.card} key={task.title}><Stack gap="sm"><strong>{task.title}</strong><Text variant="muted">{task.owner} · {example.columns[2]}</Text></Stack></article>)}</Stack>
                    </div>
                  </div>
                </Stack>
              </section>
              <div aria-live="polite"><Text variant="muted">{think ? 'MPA: กดลิงก์แล้วขอ HTML จาก server และโหลดทั้งหน้าใหม่ รวม header' : scene.captions[Math.min(tl.step, scene.captions.length - 1)]}</Text></div>
            </Stack>
          </div>
        </Stack>
      </div>
      <TimelineControls playing={tl.playing} progress={tl.progress} canPrev={tl.step > 0} canNext={tl.step < tl.stepCount - 1}
        onToggle={tl.toggle} onRestart={tl.restart} onPrev={() => tl.goToStep(tl.step - 1)} onNext={() => tl.goToStep(tl.step + 1)} onSeek={tl.seek} />
    </Stack>
  )
}
