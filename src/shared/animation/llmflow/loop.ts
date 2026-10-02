import { dur, ease } from '../motion'
import { llmFlowExample } from './example'
import type { LlmFlowPart, LlmFlowSceneDefinition, LlmFlowSceneState } from './index'

const parts: LlmFlowPart[] = [
  { id: 'prompt', label: 'Prompt', note: 'ข้อความที่คุณพิมพ์', sample: llmFlowExample.prompt },
  { id: 'token', label: 'Token', note: 'ข้อความถูกตัดเป็นชิ้น', sample: 'app · .js · 3' },
  { id: 'model', label: 'โมเดล', note: 'ทำนายชิ้นถัดไปจากความน่าจะเป็น', sample: '?' },
  { id: 'answer', label: 'คำตอบ', note: 'ต่อชิ้นที่เลือกทีละชิ้น', sample: '…', active: true },
]

/** Last answer piece of each of the three items — after these the loop arrow pulses back to predict. */
const itemEndPieces = new Set([3, 7])

const loopState: LlmFlowSceneState = {
  parts,
  prompt: llmFlowExample.prompt,
  answer: llmFlowExample.answer,
  caption: 'ชิ้นที่เลือกถูกต่อท้ายคำตอบ แล้ววนกลับไปทำนายชิ้นถัดไป จนได้ครบสามข้อ',
  verdict: 'คำตอบครบสามข้อแล้ว',
}

/** Appends each predicted piece, pulsing the loop arrow between items, until all three items are complete. */
export function buildLoopTimeline(tl: gsap.core.Timeline) {
  tl.addLabel('prompt').fromTo('[data-el="prompt"]', {
    opacity: 0, y: 12,
  }, {
    opacity: 1, y: 0, duration: dur.fast, ease: ease.out,
  })
  for (const [i] of llmFlowExample.answer.entries()) {
    tl.addLabel(`piece-${i}`).fromTo(`[data-el="answer-piece-${i}"]`, {
      opacity: 0,
    }, {
      opacity: 1, duration: dur.fast, ease: ease.out,
    })
    if (!itemEndPieces.has(i)) continue
    tl.addLabel(`loop-${i}`).fromTo('[data-el="arrow-loop"]', {
      scale: 1,
    }, {
      scale: 1.08, duration: dur.wobble, ease: ease.wobble, yoyo: true, repeat: 1,
      immediateRender: false,
    })
  }
  tl.addLabel('done').fromTo('[data-el="verdict"]', {
    opacity: 0, y: 8,
  }, {
    opacity: 1, y: 0, duration: dur.fast, ease: ease.out,
  })
}

export const loop: LlmFlowSceneDefinition = {
  title: 'วนทำนายจนครบ',
  state: loopState,
  build: buildLoopTimeline,
}
