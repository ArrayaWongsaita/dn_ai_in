import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/shared/lib/cx'
import s from './DiagramNode.module.css'

interface Props extends HTMLAttributes<HTMLDivElement> { title: string; sub?: string; children?: ReactNode }

/** A box in a diagram (client, server, …). `children` render inside, under the title. */
export function DiagramNode({ title, sub, children, className, ...rest }: Props) {
  return (
    <div className={cx(s.node, className)} {...rest}>
      <strong>{title}</strong>
      {sub && <small>{sub}</small>}
      {children}
    </div>
  )
}
