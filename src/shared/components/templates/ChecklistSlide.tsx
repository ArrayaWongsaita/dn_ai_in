import { Heading, Icon, Stack, Text } from '@/shared/components/atoms'
import { SlideFrame } from '@/shared/components/organisms'
import s from './ChecklistSlide.module.css'
import type { ChecklistData } from '@/shared/types/slide'

/** Static checklist: title + 1–6 ticked items — the bound is the `ChecklistItems` type, not a runtime check. */
export function ChecklistSlide({ title, sub, items }: ChecklistData) {
  return (
    <SlideFrame>
      <Stack gap="lg">
        <Stack>
          <Heading>{title}</Heading>
          {sub && <Text variant="muted">{sub}</Text>}
        </Stack>
        <ul className={s.list}>
          {items.map((item, i) => (
            <li key={i} className={s.item}>
              {/* Item text is the real content, so the tick is decorative (spec § User Stories 4). */}
              <span className={s.tick}><Icon name="check" decorative /></span>
              <Text>{item}</Text>
            </li>
          ))}
        </ul>
      </Stack>
    </SlideFrame>
  )
}
