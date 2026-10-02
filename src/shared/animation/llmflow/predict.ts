import { dur, ease } from '../motion'
import { llmFlowExample } from './example'
import type { LlmFlowPart, LlmFlowSceneDefinition, LlmFlowSceneState } from './index'

const parts: LlmFlowPart[] = [
  { id: 'prompt', label: 'Prompt', note: 'ข้อความที่คุณพิมพ์', sample: llmFlowExample.prompt },
  { id: 'token', label: 'Token', note: 'ข้อความถูกตัดเป็นชิ้น', sample: 'app · .js · 3' },
  { id: 'model', label: 'โมเดล', note: 'ทำนายชิ้นถัดไปจากความน่าจะเป็น', sample: '?', active: true },
  { id: 'answer', label: 'คำตอบ', note: 'ต่อชิ้นที่เลือกทีละชิ้น' },
]

const chosen = llmFlowExample.candidates.find((candidate) => candidate.selected)

const predictState: LlmFlowSceneState = {
  parts,
  prompt: llmFlowExample.prompt,
  tokens: llmFlowExample.tokens,
  candidates: llmFlowExample.candidates,
  verdict: chosen ? `โมเดลเลือก '${chosen.text}' เป็นชิ้นถัดไป` : undefined,
  caption: 'แต่ละชิ้นมีความน่าจะเป็นของตัวเองเป็นตัวเลขจำลอง แล้วโมเดลเลือกหนึ่งชิ้นเป็นชิ้นถัดไป',
}

/** Reveals the candidate bars, then pops the chosen one and states the verdict. */
export function buildPredictTimeline(tl: gsap.core.Timeline) {
  tl.addLabel('prompt').fromTo('[data-el="prompt"]', {
    opacity: 0, y: 12,
  }, {
    opacity: 1, y: 0, duration: dur.fast, ease: ease.out,
  })
  tl.addLabel('tokens').fromTo('[data-el="tokens"]', {
    opacity: 0, y: 12,
  }, {
    opacity: 1, y: 0, duration: dur.fast, ease: ease.out,
  })
  llmFlowExample.candidates.forEach((candidate) => {
    tl.addLabel(`candidate-${candidate.id}`).fromTo(`[data-el="candidate-${candidate.id}"]`, {
      opacity: 0, x: -12,
    }, {
      opacity: 1, x: 0, duration: dur.fast, ease: ease.out,
    })
  })
  if (!chosen) return
  tl.addLabel('choose').fromTo(`[data-el="candidate-${chosen.id}"]`, {
    scale: 1,
  }, {
    scale: 1.06, duration: dur.base, ease: ease.pop, immediateRender: false,
  })
  tl.addLabel('verdict').fromTo('[data-el="verdict"]', {
    opacity: 0, y: 8,
  }, {
    opacity: 1, y: 0, duration: dur.fast, ease: ease.out,
  })
}

export const predict: LlmFlowSceneDefinition = {
  title: 'ทำนายชิ้นถัดไป',
  state: predictState,
  build: buildPredictTimeline,
}
