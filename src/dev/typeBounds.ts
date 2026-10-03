// Type-level bounds — deliberately NOT imported anywhere, so it never renders
// (not in sampleSlides, not in any route). `tsc -b` inside `pnpm build` still sees it
// (tsconfig.app.json includes all of src), so a loosened type fails the build here.
// Later tickets append their cases below: 07 — checklist with 7 items, 08 — flow with 1 step.

import { createElement } from 'react'
import { Icon } from '@/shared/components/atoms'

// Icon must demand exactly one of `decorative` or `label` (spec § User Stories 4, § Testing Decisions).
// @ts-expect-error — Icon with NEITHER `decorative` nor `label` must fail the build
export const iconWithoutAnnouncement = createElement(Icon, { name: 'check' })

// @ts-expect-error — Icon with BOTH `decorative` and `label` must fail the build too
export const iconWithBothAnnouncements = createElement(Icon, { name: 'bulb', decorative: true, label: 'idea' })
