import type { HTMLAttributes, Ref } from 'react'
import { cx } from '@/shared/lib/cx'
import s from './Screen.module.css'

interface Props extends HTMLAttributes<HTMLElement> { as?: 'section' | 'main'; ref?: Ref<HTMLElement> }

/** Full-viewport, vertically centred, gutter-padded surface. */
export function Screen({ as: Tag = 'section', className, ...rest }: Props) {
  return <Tag className={cx(s.screen, className)} {...rest} />
}
