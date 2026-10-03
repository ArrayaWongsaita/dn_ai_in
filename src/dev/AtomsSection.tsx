import { AppLink, Badge, BigNumber, Button, Code, Divider, Dot, Heading, Icon, Kbd, Kicker, Pill, ProgressBar, Source, Stack, Swatch, Text } from '@/shared/components/atoms'
import { Demo, Section } from './DevLayout'
import s from './Dev.module.css'

export function AtomsSection() {
  return (
    <Section title="Atoms" note="src/shared/components/atoms — หน่วยเล็กสุด">
      <Demo name="Heading level=display | title">
        <Heading level="display">Display</Heading>
        <Heading>Title</Heading>
      </Demo>
      <Demo name="Text variant=body | muted | label">
        <Text>Body — ข้อความปกติ</Text>
        <Text variant="muted">Muted — ข้อความรอง</Text>
        <Text variant="label">Label — คำอธิบายใต้ตัวเลข</Text>
      </Demo>
      <Demo name="Kicker / Source">
        <Kicker>KICKER</Kicker>
        <Source>Source — แหล่งที่มา</Source>
      </Demo>
      <Demo name="BigNumber"><BigNumber label="12.3%">12.3%</BigNumber></Demo>
      <Demo name="Stack gap=sm | md | lg">
        <div className={s.row}>
          {(['sm', 'md', 'lg'] as const).map((g) => (
            <Stack key={g} gap={g}><Text>{g}</Text><Text>{g}</Text><Text>{g}</Text></Stack>
          ))}
        </div>
      </Demo>
      <Demo name="Button variant=primary | secondary | ghost">
        <div className={s.row}>
          <Button onClick={() => {}}>ถัดไป</Button>
          <Button variant="secondary" onClick={() => {}}>ย้อนกลับ</Button>
          <Button variant="ghost" onClick={() => {}}>ข้าม</Button>
        </div>
      </Demo>
      <Demo name="Button size=sm | disabled | to (link) — Tab เพื่อดู focus ring">
        <div className={s.row}>
          <Button size="sm" onClick={() => {}}>เล็ก</Button>
          <Button disabled>ปิดใช้งาน</Button>
          <Button variant="secondary" disabled>ปิดใช้งาน</Button>
          <Button variant="ghost" disabled>ปิดใช้งาน</Button>
          <Button variant="secondary" to="/dev">ไปหน้า /dev</Button>
        </div>
      </Demo>
      <Demo name="Badge tone=neutral | accent | new | hot | code">
        <div className={s.row}>
          <Badge>HTML</Badge>
          <Badge tone="accent">สำคัญ</Badge>
          <Badge tone="new">ใหม่</Badge>
          <Badge tone="hot">ยอดนิยม</Badge>
          <Badge tone="code">tsx</Badge>
        </div>
        <div className={s.surface}>
          <Text variant="muted">บนพื้น surface —</Text>
          <Badge tone="new">ใหม่</Badge>
          <Badge tone="hot">ยอดนิยม</Badge>
          <Badge>HTML</Badge>
        </div>
      </Demo>
      <Demo name="Code / Kbd">
        <Text>เมธอด <Code>GET</Code> · กด <Kbd>→</Kbd> เพื่อไปสไลด์ถัดไป</Text>
      </Demo>
      <Demo name="Icon name=check | warning | bulb (decorative / labelled)">
        <div className={s.row}>
          <Icon name="check" decorative />
          <Icon name="warning" decorative />
          <Icon name="bulb" decorative />
        </div>
        <div className={s.row}>
          <Icon name="check" label="สำเร็จ" />
          <Icon name="warning" label="คำเตือน" />
          <Icon name="bulb" label="แนวคิดหลัก" />
        </div>
        <Text variant="muted">ตัวใหญ่: <Icon name="bulb" decorative /> สเกลตามตัวอักษร ลากเส้นตามสีข้อความ</Text>
      </Demo>
      <Demo name="ProgressBar"><ProgressBar value={60} label="ความคืบหน้า 60%" /></Demo>
      <Demo name="Divider"><Divider /></Demo>
      <Demo name="Pill (button / link)">
        <div className={s.row}>
          <Pill onClick={() => {}}>button</Pill>
          <Pill to="/dev">link</Pill>
        </div>
      </Demo>
      <Demo name="Dot (inactive / active)">
        <div className={s.row}>
          <Dot label="inactive" onClick={() => {}} />
          <Dot label="active" active onClick={() => {}} />
        </div>
      </Demo>
      <Demo name="Swatch"><Swatch fg="#2b2a26" bg="#f7f5f0" note="note">ตัวอย่าง</Swatch></Demo>
      <Demo name="AppLink"><AppLink to="/dev">ลิงก์ภายใน (hover เป็นสีม่วง)</AppLink></Demo>
      <Demo name="Screen">ใช้เป็นพื้นผิวเต็มจอของสไลด์และหน้า Home — ดูที่ /dev/slides</Demo>
    </Section>
  )
}
