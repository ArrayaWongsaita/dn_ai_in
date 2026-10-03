import { dur, ease } from '../motion'
import { baseParts, llmFlowExample } from './example'
import { chosenOf, revealCandidates, revealPrompt } from './reveal'
import type { LlmFlowSceneDefinition, LlmFlowSceneState } from './index'

const chosen = chosenOf(llmFlowExample.candidates)

const predictState: LlmFlowSceneState = {
  parts: baseParts('model'),
  prompt: llmFlowExample.prompt,
  tokens: llmFlowExample.tokens,
  candidates: llmFlowExample.candidates,
  verdict: chosen ? `โมเดลเลือก '${chosen.text}' เป็นชิ้นถัดไป` : undefined,
  caption: 'แต่ละชิ้นมีความน่าจะเป็นของตัวเองเป็นตัวเลขจำลอง แล้วโมเดลเลือกหนึ่งชิ้นเป็นชิ้นถัดไป',
}

/** Reveals the prompt, token strip and candidate bars, then pops the chosen one and states the verdict. */
export function buildPredictTimeline(tl: gsap.core.Timeline) {
  revealPrompt(tl)
  tl.addLabel('tokens').fromTo('[data-el="tokens"]', {
    opacity: 0, y: 12,
  }, {
    opacity: 1, y: 0, duration: dur.fast, ease: ease.out,
  })
  revealCandidates(tl, llmFlowExample.candidates)
}

export const predict: LlmFlowSceneDefinition = {
  title: 'ทำนายชิ้นถัดไป',
  state: predictState,
  build: buildPredictTimeline,
}
