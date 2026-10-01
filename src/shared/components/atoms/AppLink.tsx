import { Link, type LinkProps } from 'react-router'
import { cx } from '@/shared/lib/cx'
import s from './AppLink.module.css'

/** The only place in shared/ that touches the router. */
export function AppLink({ className, ...rest }: LinkProps) {
  return <Link className={cx(s.link, className)} {...rest} />
}
