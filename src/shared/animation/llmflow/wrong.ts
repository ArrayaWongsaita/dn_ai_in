import { dur, ease } from '../motion'
import { llmFlowExample } from './example'
import type { LlmFlowCandidate, LlmFlowPart, LlmFlowSceneDefinition, LlmFlowSceneState } from './index'

/** Candidates for one more piece of the running summary: the likeliest bar sounds plausible but is not in the file. */
const wrongCandidates: LlmFlowCandidate[] = [
  { id: 'format', text: 'ฟังก์ชันจัดรูปแบบ', probability: 0.34 },
  { id: 'invented', text: 'เชื่อมต่อฐานข้อมูล', probability: 0.42, selected: true, wrong: true, note: 'น่าเชื่อแต่ผิด' },
  { id: 'reads', text: 'อ่านค่าตั้งต้น', probability: 0.24 },
]

const parts: LlmFlowPart[] = [
  { id: 'prompt', label: 'Prompt', note: 'ข้อความที่คุณพิมพ์', sample: llmFlowExample.prompt },
  { id: 'token', label: 'Token', note: 'ข้อความถูกตัดเป็นชิ้น', sample: 'app · .js · 3' },
  { id: 'model', label: 'โมเดล', note: 'ทำนายชิ้นถัดไปจากความน่าจะเป็น', sample: '?', active: true },
  { id: 'answer', label: 'คำตอบ', note: 'ต่อชิ้นที่เลือกทีละชิ้น' },
]

const chosen = wrongCandidates.find((candidate) => candidate.selected)

const wrongState: LlmFlowSceneState = {
  parts,
  prompt: llmFlowExample.prompt,
  candidates: wrongCandidates,
  verdict: chosen
    ? `โมเดลเลือก '${chosen.text}' ที่น่าเชื่อแต่ผิด — Hallucination เกิดจากกลไกเดียวกับตอนตอบถูก ไม่ใช่การโกหก จึงต้องตรวจเสมอ`
    : undefined,
  caption: 'โมเดลเลือกชิ้นถัดไปจากกองความน่าจะเป็นด้วยกลไกเดียวกับตอนตอบถูก ชิ้นที่ฟังดูน่าเชื่อจึงอาจผิดได้ — Hallucination จึงต้องตรวจคำตอบเสมอ',
}

/** Reveals the prompt and candidate bars, pops the plausible-but-wrong pick, then states why verification is required. */
export function buildWrongTimeline(tl: gsap.core.Timeline) {
  tl.addLabel('prompt').fromTo('[data-el="prompt"]', {
    opacity: 0, y: 12,
  }, {
    opacity: 1, y: 0, duration: dur.fast, ease: ease.out,
  })
  wrongCandidates.forEach((candidate) => {
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

export const wrong: LlmFlowSceneDefinition = {
  title: 'ตอบมั่นแต่ผิด',
  state: wrongState,
  build: buildWrongTimeline,
}
