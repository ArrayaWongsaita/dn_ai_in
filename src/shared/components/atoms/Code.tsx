import type { ReactNode } from 'react'
import s from './Code.module.css'

/** Inline monospace snippet, e.g. an HTTP method or a tag name. */
export const Code = ({ children }: { children: ReactNode }) => <code className={s.code}>{children}</code>
