import { dur, ease } from '../motion'
import { llmFlowExample } from './example'
import type { LlmFlowPart, LlmFlowSceneDefinition, LlmFlowSceneState, LlmFlowToken } from './index'

/** English sample whose pieces cross word boundaries — the organism adds the ตัวอย่าง badge automatically. */
const englishSample: LlmFlowToken[] = [
  { id: 'summ', text: 'Summar' },
  { id: 'ize', text: 'ize' },
  { id: 'app', text: 'app' },
  { id: 'js', text: '.js' },
  { id: 'in', text: 'in' },
  { id: 'three', text: '3' },
  { id: 'items', text: 'items' },
]

const parts: LlmFlowPart[] = [
  { id: 'prompt', label: 'Prompt', note: 'ข้อความที่คุณพิมพ์', sample: llmFlowExample.prompt },
  { id: 'token', label: 'Token', note: 'ข้อความถูกตัดเป็นชิ้น', sample: 'Summar · ize · app', active: true },
  { id: 'model', label: 'โมเดล', note: 'ทำนายชิ้นถัดไปจากความน่าจะเป็น' },
  { id: 'answer', label: 'คำตอบ', note: 'ต่อชิ้นที่เลือกทีละชิ้น' },
]

const tokenizeState: LlmFlowSceneState = {
  parts,
  prompt: llmFlowExample.prompt,
  tokens: englishSample,
  caption: 'token ไม่เท่ากับคำ — ตัวอย่างนี้ถูกตัดเป็นชิ้นที่ไม่ตรงขอบเขตคำ เช่น Summar + ize หรือ app + .js',
}

/** Reveals the prompt, then cuts the English sample into its token pieces one by one. */
export function buildTokenizeTimeline(tl: gsap.core.Timeline) {
  tl.addLabel('prompt').fromTo('[data-el="prompt"]', {
    opacity: 0, y: 12,
  }, {
    opacity: 1, y: 0, duration: dur.fast, ease: ease.out,
  })
  englishSample.forEach((token) => {
    tl.addLabel(`token-${token.id}`).fromTo(`[data-el="token-${token.id}"]`, {
      opacity: 0, scale: 0.85,
    }, {
      opacity: 1, scale: 1, duration: dur.fast, ease: ease.out,
    })
  })
}

export const tokenize: LlmFlowSceneDefinition = {
  title: 'ตัดข้อความเป็น token',
  state: tokenizeState,
  build: buildTokenizeTimeline,
}
