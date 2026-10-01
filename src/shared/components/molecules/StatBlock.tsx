import { Stack, Text } from '@/shared/components/atoms'
import { CountUp } from './CountUp'

interface Props { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }

export function StatBlock({ label, ...num }: Props) {
  return (
    <Stack gap="sm">
      <CountUp {...num} />
      <Text variant="label">{label}</Text>
    </Stack>
  )
}
