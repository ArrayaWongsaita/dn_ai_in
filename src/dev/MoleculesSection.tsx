import { useState } from 'react'
import { Button, Stack } from '@/shared/components/atoms'
import { Callout, Card, ChromeBar, CodeBlock, CountUp, NavDots, StatBlock, SwatchRow, ThemeToggle, TocItem } from '@/shared/components/molecules'
import { TocList } from '@/shared/components/organisms'
import { SeenContext } from '@/shared/hooks'
import { Demo, Section } from './DevLayout'

const toc = [
  { to: '/dev', title: 'รายการที่ 1', summary: 'คำอธิบายสั้น' },
  { to: '/dev', title: 'รายการที่ 2' },
]

export function MoleculesSection() {
  const [cur, setCur] = useState(1)
  return (
    <>
      <Section title="Molecules" note="src/shared/components/molecules — CountUp/StatBlock ต้องอยู่ใน SeenContext (ปกติมาจาก SlideFrame)">
        <SeenContext value>
          <Demo name="CountUp"><CountUp value={87.5} decimals={1} suffix="%" /></Demo>
          <Demo name="StatBlock"><StatBlock value={12} prefix="+" suffix="%" label="คำอธิบายใต้ตัวเลข" /></Demo>
        </SeenContext>
        <Demo name="SwatchRow">
          <SwatchRow items={[
            { text: 'A', note: 'note', fg: '#000000', bg: '#ffffff' },
            { text: 'B', fg: '#e4e2da', bg: '#1c1d1f' },
          ]} />
        </Demo>
        <Demo name="Callout (concept / remember / warning / ไม่ระบุ tone)">
          <Stack>
            <Callout tone="concept" title="แนวคิดหลัก">แนวคิดที่ต้องเข้าใจก่อนไปต่อ</Callout>
            <Callout tone="remember" title="จดจำ">สรุปสั้นๆ ที่ควรจำจากสไลด์นี้</Callout>
            <Callout tone="warning" title="ข้อควรระวัง">จุดที่ผู้เรียนมักทำผิด</Callout>
            <Callout title="ควรรู้">ข้อความเน้นสั้นๆ หนึ่งประเด็นต่อกล่อง</Callout>
          </Stack>
        </Demo>
        <Demo name="CodeBlock">
          <CodeBlock language="http" code={'GET /index.html HTTP/1.1\nHost: example.com'} />
        </Demo>
        <Demo name="Card (+ action)">
          <Card title="หัวข้อการ์ด" action={<Button size="sm" variant="secondary" onClick={() => {}}>เปิดอ่าน</Button>}>
            คำอธิบายสั้นของการ์ด
          </Card>
        </Demo>
        <Demo name="ThemeToggle"><ThemeToggle /></Demo>
        <Demo name="NavDots (fixed → ถูกกักในกล่อง)" boxed>
          <NavDots count={5} current={cur} onSelect={setCur} />
        </Demo>
        <Demo name="ChromeBar (fixed → ถูกกักในกล่อง)" boxed>
          <ChromeBar><ThemeToggle /></ChromeBar>
        </Demo>
        <Demo name="TocItem">
          <ol style={{ listStyle: 'none', padding: 0 }}><TocItem n={1} {...toc[0]} /></ol>
        </Demo>
      </Section>
      <Section title="Organisms" note="Deck / SlideFrame ดูที่ /dev/slides (ต้องเต็มจอ)">
        <Demo name="TocList"><TocList items={toc} /></Demo>
      </Section>
    </>
  )
}
