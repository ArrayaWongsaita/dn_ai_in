import { Badge } from '@/shared/components/atoms'
import s from './CodeBlock.module.css'

interface Props { code: string; language?: string }

/** Multi-line code sample with an optional language badge. Plain text, no highlighting.
    The box is the dark code surface — everything inside uses only --code-* colours. */
export const CodeBlock = ({ code, language }: Props) => (
  <figure className={s.block}>
    {language && <Badge tone="code">{language}</Badge>}
    <pre className={s.pre}><code>{code}</code></pre>
  </figure>
)
