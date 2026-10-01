import type { HTMLAttributes } from 'react'
import { cx } from '@/shared/lib/cx'
import s from './Packet.module.css'

interface Props extends HTMLAttributes<HTMLSpanElement> { kind: 'request' | 'response' }

/** A labelled message that travels along a diagram track. Position/trail are driven by the timeline. */
export function Packet({ kind, className, children, ...rest }: Props) {
  return (
    <span className={cx(s.packet, s[kind], className)} {...rest}>
      <i className={s.trail} data-trail aria-hidden />
      {children}
    </span>
  )
}
