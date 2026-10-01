import { useRef, useState, type RefObject } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(useGSAP)

export interface TimelineApi {
  progress: number
  playing: boolean
  /** index of the last label the playhead has reached */
  step: number
  stepCount: number
  toggle: () => void
  restart: () => void
  seek: (progress: number) => void
  goToStep: (i: number) => void
}

const EMPTY = { time: 0, duration: 0, playing: false, stops: [] as number[] }

/**
 * Builds a paused GSAP timeline scoped to `scope`, auto-plays it (unless reduced motion → jumps to the
 * end frame), and returns `[scope, controls]` — attach `scope` to the diagram root.
 * (A tuple, not an object: React Compiler rejects reading properties off an object that holds a ref.) Labels added in `build` become the step stops.
 */
export function useTimeline(build: (tl: gsap.core.Timeline) => void): [RefObject<HTMLDivElement | null>, TimelineApi] {
  const scope = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const reduced = useReducedMotion()
  const [s, setS] = useState(EMPTY)

  useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,
      onUpdate: () => setS((p) => ({ ...p, time: tl.time() })),
      onComplete: () => setS((p) => ({ ...p, playing: false })),
    })
    build(tl)
    tlRef.current = tl
    const stops = Object.values(tl.labels).sort((a, b) => a - b)
    if (reduced) tl.progress(1)
    else tl.play()
    setS({ time: tl.time(), duration: tl.duration(), playing: !reduced, stops })
  }, { scope, dependencies: [reduced] })

  const jump = (time: number) => {
    const tl = tlRef.current
    if (!tl) return
    tl.pause().time(time, false)
    setS((p) => ({ ...p, time, playing: false }))
  }

  const step = Math.max(0, s.stops.filter((t) => t <= s.time + 0.001).length - 1)

  const api: TimelineApi = {
    progress: s.duration ? s.time / s.duration : 0,
    playing: s.playing,
    step,
    stepCount: s.stops.length,
    toggle: () => {
      const tl = tlRef.current
      if (!tl) return
      if (s.playing) { tl.pause(); setS((p) => ({ ...p, playing: false })) }
      else { if (tl.progress() === 1) tl.restart(); else tl.play(); setS((p) => ({ ...p, playing: true })) }
    },
    restart: () => { tlRef.current?.restart(); setS((p) => ({ ...p, playing: true })) },
    seek: (p) => jump(p * s.duration),
    goToStep: (i) => jump(s.stops[Math.max(0, Math.min(s.stops.length - 1, i))] ?? 0),
  }
  return [scope, api]
}
