import { baseParts, llmFlowExample } from './example'
import { chosenOf, revealCandidates, revealPrompt } from './reveal'
import type { LlmFlowCandidate, LlmFlowSceneDefinition, LlmFlowSceneState } from './index'

/** One more piece of the running summary: the truly correct piece is right there, but the likeliest bar sounds plausible and is not in the file. */
const wrongCandidates: LlmFlowCandidate[] = [
  { id: 'format', text: 'ฟังก์ชันจัดรูปแบบ', probability: 0.34 },
  { id: 'invented', text: 'เชื่อมต่อฐานข้อมูล', probability: 0.42, selected: true, wrong: true, note: 'น่าเชื่อแต่ผิด' },
  { id: 'reads', text: 'อ่านค่าตั้งต้น', probability: 0.24, correct: true, note: 'ถูกจริง' },
]

const chosen = chosenOf(wrongCandidates)

const wrongState: LlmFlowSceneState = {
  parts: baseParts('model'),
  prompt: llmFlowExample.prompt,
  candidates: wrongCandidates,
  verdict: chosen
    ? `โมเดลเลือก '${chosen.text}' ที่น่าเชื่อแต่ผิด — Hallucination เกิดจากกลไกเดียวกับตอนตอบถูก ไม่ใช่การโกหก จึงต้องตรวจเสมอ`
    : undefined,
  caption: 'โมเดลเลือกชิ้นถัดไปจากกองความน่าจะเป็นด้วยกลไกเดียวกับตอนตอบถูก ชิ้นที่ฟังดูน่าเชื่อจึงอาจผิดได้ — Hallucination จึงต้องตรวจคำตอบเสมอ',
}

/** Reveals the prompt and candidate bars, pops the plausible-but-wrong pick, then states why verification is required. */
export function buildWrongTimeline(tl: gsap.core.Timeline) {
  revealPrompt(tl)
  revealCandidates(tl, wrongCandidates)
}

export const wrong: LlmFlowSceneDefinition = {
  title: 'ตอบมั่นแต่ผิด',
  state: wrongState,
  build: buildWrongTimeline,
}
