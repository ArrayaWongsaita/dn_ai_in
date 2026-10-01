import type { ReactNode } from 'react'
import s from './Kicker.module.css'

export const Kicker = ({ children }: { children: ReactNode }) => <p className={s.kicker}>{children}</p>
