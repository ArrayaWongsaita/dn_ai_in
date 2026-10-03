// Type-level bounds — deliberately NOT imported anywhere, so it never renders
// (not in sampleSlides, not in any route). `tsc -b` inside `pnpm build` still sees it
// (tsconfig.app.json includes all of src), so a loosened type fails the build here.
// Later tickets append their cases below: 07 — checklist with 7 items, 08 — flow with 1 step.

import { createElement } from 'react'
import { Icon } from '@/shared/components/atoms'
import type { SlideData } from '@/shared/types/slide'

// Icon must demand exactly one of `decorative` or `label` (spec § User Stories 4, § Testing Decisions).
// @ts-expect-error — Icon with NEITHER `decorative` nor `label` must fail the build
export const iconWithoutAnnouncement = createElement(Icon, { name: 'check' })

// @ts-expect-error — Icon with BOTH `decorative` and `label` must fail the build too
export const iconWithBothAnnouncements = createElement(Icon, { name: 'bulb', decorative: true, label: 'idea' })

// Checklist bounds `items` with a tuple union of length 1–6, not `string[]` (spec § User Stories 11).
// @ts-expect-error — checklist with 7 items must fail the build
export const checklistWithSevenItems: SlideData = { type: 'checklist', title: 'ตัวอย่างที่ล้นขอบเขต', items: ['หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด'] }

// @ts-expect-error — checklist with no item must fail the build too
export const checklistWithNoItems: SlideData = { type: 'checklist', title: 'ไม่มีรายการ', items: [] }

// Flow bounds `steps` with a tuple union of length 2–4, not `string[]` (spec § User Stories 12).
// @ts-expect-error — flow with 1 step must fail the build
export const flowWithOneStep: SlideData = { type: 'flow', title: 'ขั้นเดียวไม่ได้', steps: ['State'] }

// @ts-expect-error — flow with 5 steps must fail the build too
export const flowWithFiveSteps: SlideData = { type: 'flow', title: 'ห้าขั้นไม่ได้', steps: ['หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า'] }
