import type { ReactNode } from 'react'
import { Heading, Kicker, Pill, Stack } from '@/shared/components/atoms'
import { ChromeBar, ThemeToggle } from '@/shared/components/molecules'
import s from './Dev.module.css'

interface Props { title: string; back?: boolean; children: ReactNode }

/** Plain scrolling page for dev tools. Deliberately not a deck. */
export function DevLayout({ title, back = true, children }: Props) {
  return (
    <main className={s.page}>
      <ChromeBar>
        <ThemeToggle />
        {back && <Pill to="/dev">← /dev</Pill>}
      </ChromeBar>
      <Stack gap="lg">
        <Stack>
          <Kicker>DEV ONLY — ไม่แสดงใน production</Kicker>
          <Heading>{title}</Heading>
        </Stack>
        {children}
      </Stack>
    </main>
  )
}

export function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className={s.section}>
      <h3 className={s.h3}>{title}</h3>
      {note && <p className={s.note}>{note}</p>}
      <div className={s.demos}>{children}</div>
    </section>
  )
}

export function Demo({ name, boxed, children }: { name: string; boxed?: boolean; children: ReactNode }) {
  return (
    <div className={s.demo}>
      <code className={s.name}>{name}</code>
      <div className={boxed ? s.boxed : undefined}>{children}</div>
    </div>
  )
}
