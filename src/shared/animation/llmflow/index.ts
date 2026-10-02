import type { LlmFlowSceneId } from '@/shared/types/slide'
import { overview } from './overview'

export { llmFlowExample } from './example'

export type LlmFlowPartId = 'prompt' | 'token' | 'model' | 'answer'

export interface LlmFlowPart {
  id: LlmFlowPartId
  label: string
  note: string
  /** Short example under the label; token examples stay short English fragments. */
  sample?: string
  /** Emphasised when this part is the focus of the scene. */
  active?: boolean
}

export interface LlmFlowToken { id: string; text: string }

export interface LlmFlowCandidate {
  id: string
  text: string
  /** Simulated probability 0..1 — the organism labels these numbers as ตัวอย่าง. */
  probability: number
  /** Short verdict shown next to the candidate (e.g. ผิด) so meaning never lives in colour alone. */
  note?: string
  selected?: boolean
  wrong?: boolean
}

export interface LlmFlowContextItem { id: string; text: string; overflow?: boolean }

/**
 * Superset of every scene's fields: the organism renders each section only when present,
 * so tickets that add scenes never touch the organism. Scenes drive timing through `build`,
 * using the organism's hooks: part-<id>, arrow-<i>, arrow-loop, prompt, tokens, token-<id>,
 * candidate-<id>, answer, answer-piece-<i>, context-window, context-item-<id>, verdict.
 */
export interface LlmFlowSceneState {
  parts: LlmFlowPart[]
  caption: string
  prompt?: string
  tokens?: LlmFlowToken[]
  candidates?: LlmFlowCandidate[]
  answer?: string[]
  context?: LlmFlowContextItem[]
  verdict?: string
}

export interface LlmFlowSceneDefinition {
  title: string
  state: LlmFlowSceneState
  build: (tl: gsap.core.Timeline) => void
}

/** Every registered scene gets an automatic dev example through this registry. */
export const llmFlowScenes = { overview } satisfies Partial<Record<LlmFlowSceneId, LlmFlowSceneDefinition>>
