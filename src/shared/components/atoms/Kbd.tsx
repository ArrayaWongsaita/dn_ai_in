import type { ReactNode } from 'react'
import s from './Kbd.module.css'

/** Keyboard key hint, e.g. <Kbd>→</Kbd>. */
export const Kbd = ({ children }: { children: ReactNode }) => <kbd className={s.kbd}>{children}</kbd>
