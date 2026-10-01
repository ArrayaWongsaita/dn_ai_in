import { Pill } from '@/shared/components/atoms'
import { toggleTheme } from '@/shared/lib/theme'

export const ThemeToggle = () => <Pill label="สลับธีมสว่าง/มืด" onClick={toggleTheme}>ธีม</Pill>
