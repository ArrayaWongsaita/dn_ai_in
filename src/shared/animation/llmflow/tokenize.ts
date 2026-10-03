import { dur, ease } from '../motion'
import { baseParts, llmFlowExample } from './example'
import { revealPrompt } from './reveal'
import type { LlmFlowSceneDefinition, LlmFlowSceneState } from './index'

/** The scene focuses on the cut itself, so the token part shows the English pieces being made. */
const parts = baseParts('token').map((part) =>
  part.id === 'token' ? { ...part, sample: 'Summar · ize · app' } : part,
)

const tokenizeState: LlmFlowSceneState = {
  parts,
  prompt: llmFlowExample.prompt,
  tokens: llmFlowExample.tokens,
  caption: 'token ไม่เท่ากับคำ — ตัวอย่างนี้ถูกตัดเป็นชิ้นที่ไม่ตรงขอบเขตคำ เช่น Summar + ize หรือ app + .js',
}

/** Reveals the prompt, then cuts the shared English sample into its token pieces one by one. */
export function buildTokenizeTimeline(tl: gsap.core.Timeline) {
  revealPrompt(tl)
  llmFlowExample.tokens.forEach((token) => {
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
