import { dur, ease } from '../motion'
import { baseParts, llmFlowExample } from './example'
import { revealPrompt, revealVerdict } from './reveal'
import type { LlmFlowSceneDefinition, LlmFlowSceneState } from './index'

/** Pieces per summary item in llmFlowExample.answer — after each item's last piece the loop arrow pulses back to predict, except the final item, which ends the answer instead. */
const piecesPerItem = 4
const itemEndPieces = new Set(
  llmFlowExample.answer
    .map((_, i) => i)
    .filter((i) => (i + 1) % piecesPerItem === 0)
    .slice(0, -1),
)

const loopState: LlmFlowSceneState = {
  parts: baseParts('answer'),
  prompt: llmFlowExample.prompt,
  answer: llmFlowExample.answer,
  caption: 'ชิ้นที่เลือกถูกต่อท้ายคำตอบ แล้ววนกลับไปทำนายชิ้นถัดไป จนได้ครบสามข้อ',
  verdict: 'คำตอบครบสามข้อแล้ว',
}

/** Appends each predicted piece, pulsing the loop arrow between items, until all three items are complete. */
export function buildLoopTimeline(tl: gsap.core.Timeline) {
  revealPrompt(tl)
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
  revealVerdict(tl, 'done')
}

export const loop: LlmFlowSceneDefinition = {
  title: 'วนทำนายจนครบ',
  state: loopState,
  build: buildLoopTimeline,
}
