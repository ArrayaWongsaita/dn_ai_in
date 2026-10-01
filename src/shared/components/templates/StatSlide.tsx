import { StatBlock } from '@/shared/components/molecules'
import { SlideFrame } from '@/shared/components/organisms'
import type { StatData } from '@/shared/types/slide'

export function StatSlide({ src, value, decimals, prefix, suffix, label }: StatData) {
  return (
    <SlideFrame source={src}>
      <StatBlock value={value} decimals={decimals} prefix={prefix} suffix={suffix} label={label} />
    </SlideFrame>
  )
}
