import { dur, ease } from '../motion'
import { baseParts, llmFlowExample } from './example'
import { revealVerdict } from './reveal'
import type { LlmFlowContextItem, LlmFlowSceneDefinition, LlmFlowSceneState } from './index'

const contextState: LlmFlowSceneState = {
  parts: baseParts('model'),
  context: llmFlowExample.context,
  verdict: 'ส่วนที่ขีดฆ่าคือบทสนทนาที่หลุดออกนอก Context window — โมเดลมองไม่เห็นส่วนนั้นแล้ว',
  caption: 'Context window จำกัดจำนวน token ที่โมเดลมองเห็นในรอบเดียว — บทสนทนายาวจนของเก่าหลุดขอบ โมเดลจึงมองไม่เห็นส่วนนั้นและคุณภาพคำตอบตกเมื่อคุยยาว',
}

const windowEl = '[data-el="context-window"]'
const itemEl = (id: string) => `[data-el="context-item-${id}"]`

/** Fraction of an overflow item that ends up past the window's bottom border. */
const overflowVisibleFraction = 0.6

/** Measures how far one item must travel down to sit mostly outside the window (rects are transformed-free at build time). */
function overflowDropOffset(item: LlmFlowContextItem) {
  const frame = document.querySelector<HTMLElement>(windowEl)
  const element = document.querySelector<HTMLElement>(itemEl(item.id))
  if (!frame || !element) throw new Error(`Cannot measure Context window item: ${item.id}`)
  const frameRect = frame.getBoundingClientRect()
  const itemRect = element.getBoundingClientRect()
  return Math.round(frameRect.bottom - itemRect.bottom + itemRect.height * overflowVisibleFraction)
}

/** Reveals the window and its messages, then slides the overflowed part out past the bottom border. */
export function buildContextTimeline(tl: gsap.core.Timeline) {
  const overflowing = llmFlowExample.context.filter((item) => item.overflow)
  const drops = new Map(overflowing.map((item) => [item.id, overflowDropOffset(item)]))

  tl.addLabel('window').fromTo(windowEl, {
    opacity: 0, y: 12,
  }, {
    opacity: 1, y: 0, duration: dur.fast, ease: ease.out,
  })
  for (const item of llmFlowExample.context) {
    tl.addLabel(`item-${item.id}`).fromTo(itemEl(item.id), {
      opacity: 0, x: -12,
    }, {
      opacity: 1, x: 0, duration: dur.fast, ease: ease.out,
    })
  }
  for (const item of overflowing) {
    tl.addLabel(`drop-${item.id}`).fromTo(itemEl(item.id), {
      y: 0,
    }, {
      y: drops.get(item.id), duration: dur.base, ease: ease.out, immediateRender: false,
    })
  }
  revealVerdict(tl)
}

export const context: LlmFlowSceneDefinition = {
  title: 'Context window จำกัด',
  state: contextState,
  build: buildContextTimeline,
}
