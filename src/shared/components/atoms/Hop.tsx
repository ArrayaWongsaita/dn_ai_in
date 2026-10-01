import type { HTMLAttributes } from 'react'
import s from './Hop.module.css'

interface Props extends HTMLAttributes<HTMLSpanElement> { at: number }

/** A relay point (router) on a track, `at` = 0–100 % along it. Pulses when a packet passes. */
export const Hop = ({ at, ...rest }: Props) => <span className={s.hop} style={{ left: `${at}%` }} {...rest} />
