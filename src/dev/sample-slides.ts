import type { SlideData } from '@/shared/types/slide'

/** Dummy content covering every slide type and its edge cases. NOT real content. */
export const sampleSlides: SlideData[] = [
  { type: 'cover', kicker: 'ตัวอย่าง · Cover', title: 'หัวข้อตัวอย่าง\nสองบรรทัด', sub: 'บรรทัดรองสำหรับอธิบายบท' },
  { type: 'cover', title: 'Cover แบบไม่มี kicker และไม่มี sub' },
  { type: 'stat', value: 42, label: 'Stat จำนวนเต็ม พร้อมแหล่งที่มา', src: 'แหล่งที่มาตัวอย่าง' },
  { type: 'stat', value: 3.14, decimals: 2, suffix: 's', label: 'Stat ทศนิยม 2 ตำแหน่ง มีหน่วย', src: 'แหล่งที่มาตัวอย่าง' },
  { type: 'stat', value: 7, prefix: '−', suffix: '%', label: 'Stat มี prefix (เครื่องหมายลบ) และ suffix' },
  { type: 'stat', value: 100, suffix: '%', label: 'Stat ที่ label ยาวมาก เพื่อดูว่าตัดบรรทัดอย่างไรเมื่อข้อความยาวเกินความกว้างสูงสุดของบรรทัด', src: 'ไม่มี src ก็ได้' },
  { type: 'statement', title: 'Statement สั้นๆ' },
  {
    type: 'statement',
    title: 'Statement ที่หัวข้อยาว\nและมีสองบรรทัด',
    sub: 'ข้อความรองอธิบายเพิ่มเติม ใช้สีจางเพื่อลำดับความสำคัญ',
    src: 'แหล่งที่มาตัวอย่าง',
  },
  {
    type: 'compare',
    title: 'Compare สองกล่อง',
    items: [
      { text: 'ตัวอย่าง A', note: 'หมายเหตุของ A', fg: '#000000', bg: '#ffffff' },
      { text: 'ตัวอย่าง B', note: 'หมายเหตุของ B', fg: '#2b2a26', bg: '#f7f5f0' },
    ],
    sub: 'ข้อความรองใต้กล่องเปรียบเทียบ',
    src: 'แหล่งที่มาตัวอย่าง',
  },
  {
    type: 'compare',
    title: 'Compare สามกล่อง ไม่มี note',
    items: [
      { text: 'หนึ่ง', fg: '#ffffff', bg: '#6b3fc0' },
      { text: 'สอง', fg: '#1c1d1f', bg: '#b69cf5' },
      { text: 'สาม', fg: '#e4e2da', bg: '#1c1d1f' },
    ],
  },
  { type: 'gitflow', scene: 'overview', command: '', title: 'ตัวอย่าง GitFlow · overview' },
  { type: 'gitflow', scene: 'init', command: 'git init', title: 'ตัวอย่าง GitFlow · init' },
  { type: 'llmflow', scene: 'overview', title: 'ตัวอย่าง LLMFlow · overview', sub: 'ข้อความรองของภาพวงจร (ข้อมูลสมมติ)' },
  { type: 'webflow', scene: 'http-200', title: 'ตัวอย่าง WebFlow · HTTP 200', sub: 'ขอหน้าบอร์ดงาน TaskFlow' },
  { type: 'webflow', scene: 'http-404', title: 'ตัวอย่าง WebFlow · HTTP 404', http: { method: 'GET', path: '/missing', status: 404, host: 'taskflow.local' } },
  { type: 'webflow', scene: 'build-html', think: true, title: 'ลองคิด: หน้าเว็บมาจากอะไร' },
  { type: 'terminal', scene: 'pwd', command: 'pwd', title: 'ตัวอย่าง Terminal · pwd' },
  {
    type: 'terminal',
    scene: 'mkdir',
    command: 'mkdir my-site',
    title: 'ตัวอย่าง Terminal · mkdir',
    sub: 'ข้อความรองสองบรรทัด\nเพื่อทดสอบการตัดบรรทัด',
  },
  { type: 'webflow', scene: 'mpa', think: true, title: 'ลองคิด: กดลิงก์แล้วอะไรเปลี่ยน' },
  { type: 'webflow', scene: 'mpa', title: 'MPA · กดลิงก์แล้วโหลดทั้งหน้าใหม่', sub: 'ขอ HTML หน้าใหม่จาก server · ทั้งเนื้อหาและ header โหลดใหม่' },
  { type: 'webflow', scene: 'spa', title: 'SPA · เปลี่ยนเนื้อหาในหน้าเดิม', sub: 'JavaScript สลับส่วนเนื้อหา · header เดิมยังอยู่\nSPA ยังขอข้อมูลจาก server ได้', src: 'MDN · SPA · https://developer.mozilla.org/en-US/docs/Glossary/SPA' },
  { type: 'compare', title: 'MPA / SPA · กดลิงก์แล้วต่างกันอย่างไร', items: [
    { text: 'MPA', note: 'ขอหน้าใหม่จาก server\nโหลดทั้งหน้า รวม header', fg: 'var(--fg)', bg: 'var(--bg)' },
    { text: 'SPA', note: 'JavaScript สลับเนื้อหา\nheader เดิมคงอยู่ · อาจขอข้อมูลเพิ่ม', fg: 'var(--fg)', bg: 'var(--bg)' },
  ], src: 'MDN · SPA · https://developer.mozilla.org/en-US/docs/Glossary/SPA' },
  { type: 'checklist', title: 'ตัวอย่าง Checklist · 1 ข้อ (ขอบเขตต่ำสุด)', items: ['รายการเดียว'] },
  {
    type: 'checklist',
    title: 'ตัวอย่าง Checklist · 4 ข้อ',
    sub: 'ข้อความรองใต้หัวข้อ',
    items: ['หนึ่ง', 'ข้อความยาวพอที่จะตัดบรรทัด เพื่อดูว่าไอคอนติ๊กยังชิดบรรทัดแรก', 'สาม', 'สี่'],
  },
  { type: 'checklist', title: 'ตัวอย่าง Checklist · 6 ข้อ (ขอบเขตสูงสุด)', items: ['หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก'] },
]
