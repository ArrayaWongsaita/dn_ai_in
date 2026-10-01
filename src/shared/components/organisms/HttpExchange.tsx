import { DiagramNode, Hop, Packet, Stack, Text } from '@/shared/components/atoms'
import { TimelineControls } from '@/shared/components/molecules'
import { buildHttpTimeline } from '@/shared/animation/httpTimeline'
import { useTimeline } from '@/shared/hooks'
import type { HttpExchangeData } from '@/shared/types/animation'
import s from './HttpExchange.module.css'

const captions = ({ method, path, status, statusText }: HttpExchangeData) => [
  `เบราว์เซอร์สร้าง Request: ${method} ${path}`,
  'Request เดินทางผ่านเครือข่ายไปยัง server',
  'Server ประมวลผลและเตรียมข้อมูล',
  `Server ส่ง Response: ${status} ${statusText}`,
  'Response เดินทางกลับผ่านเครือข่ายมายังเบราว์เซอร์',
  status >= 400 ? 'เบราว์เซอร์แสดงหน้าข้อผิดพลาด' : 'เบราว์เซอร์รับข้อมูลแล้วแสดงผลหน้าเว็บ',
]

/** Animated HTTP request → response walkthrough, with play/step/scrub controls. */
export function HttpExchange(props: HttpExchangeData) {
  const [scope, tl] = useTimeline(buildHttpTimeline)
  const { method, path, status, statusText, host = 'example.com' } = props
  const text = captions(props)

  return (
    <Stack gap="lg">
      <div ref={scope} className={s.stage}>
        <DiagramNode title="เบราว์เซอร์" sub="Client" data-el="client">
          <div className={s.page} data-el="page">
            {status >= 400 ? <span className={s.code}>{status}</span> : <><i /><i /><i /></>}
          </div>
        </DiagramNode>
        <div className={s.track}>
          <Hop at={33} data-el="hop-1" />
          <Hop at={66} data-el="hop-2" />
          <Packet kind="request" data-el="req">{method} {path}</Packet>
          <Packet kind="response" data-el="res">{status} {statusText}</Packet>
        </div>
        <DiagramNode title={host} sub="Server" data-el="server">
          <div className={s.work}><div data-el="work" /></div>
        </DiagramNode>
      </div>
      <div className={s.caption} aria-live="polite">
        <Text variant="label">{text[Math.min(tl.step, text.length - 1)]}</Text>
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
