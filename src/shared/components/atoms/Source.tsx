import type { ReactNode } from 'react'
import s from './Source.module.css'

export const Source = ({ children }: { children: ReactNode }) => <p className={s.source}>{children}</p>
