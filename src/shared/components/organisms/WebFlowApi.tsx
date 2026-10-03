import { Stack, Text } from '@/shared/components/atoms'
import { TimelineControls } from '@/shared/components/molecules'
import { useTimeline } from '@/shared/hooks'
import type { WebFlowApiDefinition } from '@/shared/animation/webflow/api-db'
import { webFlowExample as example } from '@/shared/animation/webflow/example'
import s from './WebFlowApi.module.css'

/** The browser talks to the API; only the server talks to the database. */
export function WebFlowApi({ scene }: { scene: WebFlowApiDefinition }) {
  const [scope, tl] = useTimeline(scene.build)
  const json = `{\n  "tasks": [\n${example.tasks.map(task => `    ${JSON.stringify(task)}`).join(",\n")}\n  ]\n}`
  return (
    <Stack gap="md">
      <div ref={scope} data-api-scene="api-db">
        <Stack gap="md">
          <Text variant="muted">{example.name} · {example.label}</Text>
          <div className={s.flow}>
            <section className={s.node} aria-label="หน้าเว็บ"><Stack gap="sm">
              <strong>หน้าเว็บ · Client</strong><Text>{example.board}</Text>

            </Stack></section>
            <div className={s.messages}><Stack gap="sm">
              <span data-el="api-request" className={s.hidden}>GET /api/tasks →</span>
              <div data-el="json-response" className={s.hidden}><Stack gap="sm"><strong>← Response · JSON</strong></Stack></div>
            </Stack></div>
            <section className={s.node} aria-label="API บน server"><Stack gap="sm"><strong>API · Server</strong><Text>รับคำขอ /api/tasks</Text><Text variant="muted">อ่านข้อมูลและจัดเป็น JSON</Text></Stack></section>
            <div className={s.messages}><Stack gap="sm"><span data-el="db-query" className={s.hidden}>ขอรายการงาน →</span><span data-el="db-result" className={s.hidden}>← รายการงาน</span></Stack></div>
            <section className={s.node} aria-label="ฐานข้อมูล"><Stack gap="sm"><strong>ฐานข้อมูล · Database</strong><Text>เก็บรายการงาน</Text><Text variant="muted">{example.tasks.length} งาน · ข้อมูลสมมติ</Text></Stack></section>
          </div>
          <div className={s.results}>
            <div data-el="json-payload" className={s.hidden}><Stack gap="sm"><strong>JSON · ข้อมูลที่ server ส่งกลับ</strong><pre className={s.json}>{json}</pre></Stack></div>
              <div data-el="api-board" className={s.hidden}><Stack gap="sm">
                {example.tasks.map(task => <article key={task.title} className={s.task}><Stack gap="sm"><strong>{task.title}</strong><Text variant="muted">{task.owner} · {example.columns[task.column]}</Text></Stack></article>)}
              </Stack></div>
          </div>
          <div aria-live="polite"><Text variant="muted">{scene.captions[Math.min(tl.step, scene.captions.length - 1)]}</Text></div>
        </Stack>
      </div>
      <TimelineControls playing={tl.playing} progress={tl.progress} canPrev={tl.step > 0} canNext={tl.step < tl.stepCount - 1}
        onToggle={tl.toggle} onRestart={tl.restart} onPrev={() => tl.goToStep(tl.step - 1)} onNext={() => tl.goToStep(tl.step + 1)} onSeek={tl.seek} />
    </Stack>
  )
}
