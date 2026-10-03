import { dur, ease } from '../motion'
import type { LlmFlowCandidate } from './index'

/** The candidate the scene's pick lands on, if the list marks one. */
export function chosenOf(candidates: LlmFlowCandidate[]) {
  return candidates.find((candidate) => candidate.selected)
}

/** Reveals the prompt block — the opening move of most scenes. */
export function revealPrompt(tl: gsap.core.Timeline) {
  tl.addLabel('prompt').fromTo('[data-el="prompt"]', {
    opacity: 0, y: 12,
  }, {
    opacity: 1, y: 0, duration: dur.fast, ease: ease.out,
  })
}

/** Reveals each candidate bar, pops the chosen one, then brings in the verdict. */
export function revealCandidates(tl: gsap.core.Timeline, candidates: LlmFlowCandidate[]) {
  candidates.forEach((candidate) => {
    tl.addLabel(`candidate-${candidate.id}`).fromTo(`[data-el="candidate-${candidate.id}"]`, {
      opacity: 0, x: -12,
    }, {
      opacity: 1, x: 0, duration: dur.fast, ease: ease.out,
    })
  })
  const chosen = chosenOf(candidates)
  if (!chosen) return
  tl.addLabel('choose').fromTo(`[data-el="candidate-${chosen.id}"]`, {
    scale: 1,
  }, {
    scale: 1.06, duration: dur.base, ease: ease.pop, immediateRender: false,
  })
  revealVerdict(tl)
}

/** Brings in the verdict line; loop names its label done. */
export function revealVerdict(tl: gsap.core.Timeline, label = 'verdict') {
  tl.addLabel(label).fromTo('[data-el="verdict"]', {
    opacity: 0, y: 8,
  }, {
    opacity: 1, y: 0, duration: dur.fast, ease: ease.out,
  })
}
