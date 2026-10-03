import { revealSteps } from './reveal'
import type { WebFlowDiagramDefinition } from './types'

export const clientServer: WebFlowDiagramDefinition = {
  kind: 'diagram',
  title: 'Client / Server · เหมือนสั่งอาหาร',
  nodes: [
    { label: 'ลูกค้า ↔ Client', note: 'เบราว์เซอร์เป็นฝ่ายขอ เช่น ขอหน้าบอร์ดงาน' },
    { label: 'พนักงาน ↔ จุดรับคำขอ', note: 'รับรายการที่ขอและนำคำตอบกลับ · เป็นส่วนของฝั่ง server' },
    { label: 'ครัว ↔ งานบน Server', note: 'server ประมวลผลและเตรียมคำตอบ เหมือนครัวเตรียมอาหาร' },
  ],
  steps: [
    { text: 'ลูกค้า → พนักงาน → ครัว · สั่งอาหาร', caption: 'Request: client ส่งคำขอไปยัง server เหมือนลูกค้าสั่งอาหารผ่านพนักงาน' },
    { text: 'ครัวเตรียมอาหาร · Server เตรียมหน้าเว็บ', caption: 'Server รับคำขอและเตรียม response เช่น HTML ของหน้าบอร์ดงาน' },
    { text: 'ครัว → พนักงาน → ลูกค้า · ส่งอาหารกลับ', caption: 'Response: server ส่งคำตอบกลับ client เหมือนอาหารกลับมาถึงลูกค้า · พนักงานและครัวแทนงานฝั่ง server ไม่ใช่เครื่องแยกกันเสมอ' },
  ],
  build: (tl) => revealSteps(tl, 3),
}
