import { Pill, Scrubber, Stack } from '@/shared/components/atoms'
import s from './TimelineControls.module.css'

interface Props {
  playing: boolean
  progress: number
  canPrev: boolean
  canNext: boolean
  onToggle: () => void
  onRestart: () => void
  onPrev: () => void
  onNext: () => void
  onSeek: (p: number) => void
}

/** Play/pause, restart, step back/forward and a scrubber for a timeline. Pure UI — logic is in useTimeline. */
export function TimelineControls(p: Props) {
  return (
    <Stack>
      <div className={s.row}>
        <Pill label="ขั้นก่อนหน้า" onClick={p.canPrev ? p.onPrev : undefined}>◀ ก่อนหน้า</Pill>
        <Pill label={p.playing ? 'หยุด' : 'เล่น'} onClick={p.onToggle}>{p.playing ? '❚❚ หยุด' : '▶ เล่น'}</Pill>
        <Pill label="ขั้นถัดไป" onClick={p.canNext ? p.onNext : undefined}>ถัดไป ▶</Pill>
        <Pill label="เล่นใหม่" onClick={p.onRestart}>↺</Pill>
      </div>
      <Scrubber label="ตำแหน่งแอนิเมชัน" value={p.progress} onChange={p.onSeek} />
    </Stack>
  )
}
