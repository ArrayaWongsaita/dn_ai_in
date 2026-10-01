import { useEffect, useState } from 'react'
import { BigNumber } from '@/shared/components/atoms'
import { useReducedMotion, useSeen } from '@/shared/hooks'

interface Props { value: number; decimals?: number; prefix?: string; suffix?: string }

/** BigNumber that counts up from 0 the first time its slide is seen (skipped for reduced motion). */
export function CountUp({ value, decimals = 0, prefix = '', suffix = '' }: Props) {
  const seen = useSeen()
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!seen || reduced) return
    const t0 = performance.now()
    let raf = requestAnimationFrame(function tick(t) {
      const p = Math.min(1, (t - t0) / 900)
      setN(value * (1 - (1 - p) ** 3))
      if (p < 1) raf = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(raf)
  }, [seen, reduced, value])

  const shown = reduced ? value : n
  return <BigNumber label={`${prefix}${value}${suffix}`}>{prefix}{shown.toFixed(decimals)}{suffix}</BigNumber>
}
