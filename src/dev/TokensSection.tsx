import { Text } from '@/shared/components/atoms'
import { Demo, Section } from './DevLayout'
import s from './Dev.module.css'

const colors = ['--bg', '--fg', '--muted', '--accent', '--line']
const sizes = ['--fs-small', '--fs-body', '--fs-label', '--fs-title']

export function TokensSection() {
  return (
    <Section title="Design tokens" note="src/shared/styles/tokens.css — สลับธีมเพื่อดูทั้งสองชุด">
      <Demo name="colors">
        <div className={s.tokens}>
          {colors.map((c) => (
            <div key={c} className={s.token} style={{ background: `var(${c})`, color: c === '--fg' ? 'var(--bg)' : 'var(--fg)' }}>{c}</div>
          ))}
        </div>
      </Demo>
      <Demo name="type scale">
        {sizes.map((z) => <div key={z} style={{ fontSize: `var(${z})` }}><Text>{z} — ตัวอย่างข้อความ Aa</Text></div>)}
      </Demo>
    </Section>
  )
}
