import { Heading, Stack, Text } from '@/shared/components/atoms'
import { SlideFrame } from '@/shared/components/organisms'
import s from './FlowSlide.module.css'
import type { FlowData } from '@/shared/types/slide'

/** Static flow: title + 2–4 labelled steps joined by arrows — the bound is the `FlowSteps` type, not a runtime check. */
export function FlowSlide({ title, sub, steps }: FlowData) {
  return (
    <SlideFrame>
      <Stack gap="lg">
        <Stack>
          <Heading>{title}</Heading>
          {sub && <Text variant="muted">{sub}</Text>}
        </Stack>
        {/* The <ol> IS the order; each arrow is decoration, so it is aria-hidden (spec § User Stories 12). */}
        <ol className={s.steps}>
          {steps.map((step, i) => (
            <li key={i} className={s.step}>
              <Text>{step}</Text>
              {i < steps.length - 1 && (
                <svg viewBox="0 0 24 24" aria-hidden="true" className={s.arrow}>
                  <path d="M4 12h15" />
                  <path d="M13.5 6.5 19 12l-5.5 5.5" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </Stack>
    </SlideFrame>
  )
}
