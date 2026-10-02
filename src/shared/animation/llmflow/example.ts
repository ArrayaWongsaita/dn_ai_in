import type { LlmFlowCandidate, LlmFlowContextItem, LlmFlowToken } from './index'

/** One running example shared by every llmflow scene — the sample conversation lives here, not in slide data. */
export const llmFlowExample = {
  prompt: 'สรุปไฟล์ app.js ให้เป็น 3 ข้อ',
  tokens: [
    { id: 'sum', text: 'สรุป' },
    { id: 'file', text: 'ไฟล์' },
    { id: 'app', text: 'app' },
    { id: 'js', text: '.js' },
    { id: 'three', text: '3' },
    { id: 'items', text: 'ข้อ' },
  ] satisfies LlmFlowToken[],
  candidates: [
    { id: 'one', text: '1.', probability: 0.42, selected: true },
    { id: 'summary', text: 'สรุป', probability: 0.23 },
    { id: 'file', text: 'ไฟล์', probability: 0.11 },
  ] satisfies LlmFlowCandidate[],
  answer: ['1.', ' สรุป', ' ', 'app.js', '…'],
  context: [
    { id: 'ask', text: 'คุณ: สรุปไฟล์ app.js ให้เป็น 3 ข้อ' },
    { id: 'reply', text: 'LLM: ได้เลย กำลังอ่านไฟล์…' },
    { id: 'older', text: 'บทสนทนาก่อนหน้า…', overflow: true },
  ] satisfies LlmFlowContextItem[],
}
