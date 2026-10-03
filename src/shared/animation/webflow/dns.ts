import { webFlowExample as example } from './example'
import { revealSteps } from './reveal'
import type { WebFlowDiagramDefinition } from './types'

export const dns: WebFlowDiagramDefinition = {
  kind: 'diagram',
  title: 'DNS · จากชื่อโดเมนถึงที่อยู่',
  nodes: [
    { label: 'Client · เบราว์เซอร์', note: `เปิด https://${example.domain}${example.path}` },
    { label: 'DNS · หาที่อยู่', note: 'จับคู่ชื่อโดเมนกับที่อยู่ IP ของ server' },
    { label: 'Server · เครื่องปลายทาง', note: `IP ตัวอย่าง: ${example.address}` },
  ],
  steps: [
    { text: `Client → DNS · ${example.domain} อยู่ที่ไหน?`, caption: 'ก่อนขอหน้าเว็บ ต้องรู้ที่อยู่ของ server จากชื่อโดเมน · ภาพนี้แสดงกรณีต้องถาม DNS' },
    { text: `DNS → Client · ${example.domain} → ${example.address}`, caption: 'DNS คืนที่อยู่ IP ให้ client · ชื่อโดเมนและ IP ในภาพเป็นตัวอย่างสมมติ หากมีที่อยู่ในแคชแล้วอาจใช้ค่านั้นได้' },
    { text: `Client → Server (${example.address}) · GET ${example.path}`, caption: 'เมื่อรู้ที่อยู่และเชื่อมต่อกับ server แล้ว client จึงส่ง HTTP request เพื่อขอหน้าเว็บ · DNS หาที่อยู่ ไม่ได้ส่งหน้าเว็บกลับมา' },
  ],
  build: (tl) => revealSteps(tl, 3),
}
