import { Stack, Text } from '@/shared/components/atoms'
import { TimelineControls } from '@/shared/components/molecules'
import { useTimeline } from '@/shared/hooks'
import { dur, ease } from '@/shared/animation/motion'
import s from './HeldTimelineDemo.module.css'

const build: Parameters<typeof useTimeline>[0] = (tl) => {
  tl.addLabel('question', 0)
  tl.fromTo('[data-el="held-answer"]', { autoAlpha: 0 }, {
    autoAlpha: 1, duration: dur.base, ease: ease.out,
  })
  tl.addLabel('answer')
}

/** Small held timeline fixture: first-seen and reduced motion both keep the answer hidden. */
export function HeldTimelineDemo() {
  const [scope, tl] = useTimeline(build, { hold: true })
  return (
    <Stack gap="md">
      <div ref={scope}>
        <Stack>
          <Text>ลองคิด: ฝั่งไหนส่งคำขอ?</Text>
          <div data-el="held-answer" className={s.answer}>
            <Text>เฉลย: client ส่งคำขอ และ server ส่งคำตอบ</Text>
          </div>
        </Stack>
      </div>
      <div aria-live="polite"><Text>{tl.step === 0 ? 'รอผู้เรียนกดถัดไป' : 'แสดงเฉลยแล้ว'}</Text></div>
      <TimelineControls
        playing={tl.playing} progress={tl.progress}
        canPrev={tl.step > 0} canNext={tl.step < tl.stepCount - 1}
        onToggle={tl.toggle} onRestart={tl.restart} onSeek={tl.seek}
        onPrev={() => tl.goToStep(tl.step - 1)}
        onNext={() => tl.goToStep(tl.step + 1)}
      />
    </Stack>
  )
}
