import type { LlmFlowCandidate, LlmFlowContextItem, LlmFlowPart, LlmFlowPartId, LlmFlowToken } from './index'

/** One running example shared by every llmflow scene — the sample conversation lives here, not in slide data. */
export const llmFlowExample = {
  prompt: 'สรุปไฟล์ app.js ให้เป็น 3 ข้อ',
  /** English sample cut across word boundaries (spec: token pieces in the diagram are English, badged ตัวอย่าง). */
  tokens: [
    { id: 'summ', text: 'Summar' },
    { id: 'ize', text: 'ize' },
    { id: 'app', text: 'app' },
    { id: 'js', text: '.js' },
    { id: 'in', text: 'in' },
    { id: 'three', text: '3' },
    { id: 'items', text: 'items' },
  ] satisfies LlmFlowToken[],
  candidates: [
    { id: 'one', text: '1.', probability: 0.42, selected: true },
    { id: 'summary', text: 'สรุป', probability: 0.23 },
    { id: 'file', text: 'ไฟล์', probability: 0.11 },
  ] satisfies LlmFlowCandidate[],
  answer: [
    '1.', ' สรุป', 'การทำงาน', 'โดยรวม',
    '\n2.', ' อธิบาย', 'ฟังก์ชัน', 'สำคัญ',
    '\n3.', ' แนะนำ', 'จุด', 'ที่ปรับได้',
  ],
  context: [
    { id: 'ask', text: 'คุณ: สรุปไฟล์ app.js ให้เป็น 3 ข้อ' },
    { id: 'reply', text: 'LLM: ได้เลย นี่คือสรุป 3 ข้อ' },
    { id: 'older', text: 'บทสนทนาก่อนหน้า…', overflow: true },
  ] satisfies LlmFlowContextItem[],
}

/** The four cycle parts every scene repeats; `active` marks the scene's focus. */
export function baseParts(active?: LlmFlowPartId): LlmFlowPart[] {
  const parts: LlmFlowPart[] = [
    { id: 'prompt', label: 'Prompt', note: 'ข้อความที่คุณพิมพ์', sample: llmFlowExample.prompt },
    { id: 'token', label: 'Token', note: 'ข้อความถูกตัดเป็นชิ้น', sample: 'app · .js · 3' },
    { id: 'model', label: 'โมเดล', note: 'ทำนายชิ้นถัดไปจากความน่าจะเป็น', sample: '?' },
    { id: 'answer', label: 'คำตอบ', note: 'ต่อชิ้นที่เลือกทีละชิ้น', sample: '…' },
  ]
  return parts.map((part) => (part.id === active ? { ...part, active: true } : part))
}
