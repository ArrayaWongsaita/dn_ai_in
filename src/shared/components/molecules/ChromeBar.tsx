import type { ReactNode } from 'react'
import s from './ChromeBar.module.css'

/** Fixed top-left row for page-level controls (theme, back link). */
export const ChromeBar = ({ children }: { children: ReactNode }) => <div className={s.bar}>{children}</div>
