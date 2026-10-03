import { dur, ease } from '../motion'
import { baseParts } from './example'
import type { LlmFlowSceneDefinition, LlmFlowSceneState } from './index'

const overviewState: LlmFlowSceneState = {
  parts: baseParts(),
  caption: 'prompt ถูกตัดเป็น token โมเดลทำนายชิ้นถัดไปแล้วต่อเป็นคำตอบ วนซ้ำจนได้ครบ',
}

/** Reveals the four parts with their arrows, then the loop back — one full cycle. */
export function buildOverviewTimeline(tl: gsap.core.Timeline) {
  overviewState.parts.forEach((part, i) => {
    tl.addLabel(part.id).fromTo(`[data-el="part-${part.id}"]`, {
      opacity: 0, y: 12,
    }, {
      opacity: 1, y: 0, duration: dur.fast, ease: ease.out,
    })
    if (i < overviewState.parts.length - 1) {
      tl.addLabel(`arrow-${i}`).fromTo(`[data-el="arrow-${i}"]`, {
        opacity: 0,
      }, {
        opacity: 1, duration: dur.fast, ease: ease.out,
      })
    }
  })
  tl.addLabel('loop').fromTo('[data-el="arrow-loop"]', {
    opacity: 0,
  }, {
    opacity: 1, duration: dur.base, ease: ease.out,
  })
}

export const overview: LlmFlowSceneDefinition = {
  title: 'ภาพรวมวงจร',
  state: overviewState,
  build: buildOverviewTimeline,
}
