import type { SlideData } from '@/shared/types/slide'

const slides: SlideData[] = [
  {
    type: 'cover',
    kicker: 'บท A1 · เข้าใจเว็บ',
    title: 'เว็บทำงานอย่างไร',
    sub: 'จากคำขอของเบราว์เซอร์ถึงหน้าเว็บที่เราเห็น',
  },
  {
    type: 'statement',
    title: 'สิ่งที่คุณเปิดทุกวันทำงานอย่างไร',
    sub: 'เมื่อเปิดเว็บ เบราว์เซอร์เป็น client ที่ส่ง request (คำขอ) ไปยัง server แล้วรับ response (คำตอบ) กลับมา\nลองดูตัวอย่าง TaskFlow: ขอหน้าบอร์ดงาน แล้ว server ตอบอะไร',
  },
  {
    type: 'webflow',
    scene: 'client-server',
    title: 'Client / Server · เหมือนสั่งอาหาร',
    sub: 'ลูกค้าเป็นฝ่ายขอ พนักงานรับคำขอ ครัวเตรียมอาหาร แล้วส่งกลับมา\nบนเว็บ: client ส่ง request → server เตรียม response → ส่งกลับ client',
  },
  {
    type: 'webflow',
    scene: 'dns',
    title: 'DNS · รู้ที่อยู่ก่อนขอหน้าเว็บ',
    sub: 'URL มีชื่อโดเมนและเส้นทางหน้าเว็บ · DNS ช่วยหาที่อยู่ IP จากชื่อโดเมน\nตัวอย่างสมมติ: เลื่อนดูการหาที่อยู่ก่อนส่ง HTTP request',
    src: 'MDN · How browsers work · https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work#dns_lookup',
  },
  {
    type: 'webflow',
    scene: 'http-200',
    title: 'HTTP 200 · ขอหน้าบอร์ดงานสำเร็จ',
    sub: 'ตัวอย่าง: client ขอ /board ด้วย GET → server ตอบ 200 พร้อม HTML ของหน้าเว็บ\n200 หมายถึงคำขอสำเร็จ · เลื่อนทีละขั้นเพื่อดู request และ response',
    src: 'HTTP Semantics · RFC 9110 §15.3.1 · https://www.rfc-editor.org/rfc/rfc9110.html#name-200-ok',
  },
  {
    type: 'webflow',
    scene: 'http-404',
    title: 'HTTP 404 · ไม่พบหน้าที่ขอ',
    sub: 'ตัวอย่าง: client ขอ /missing → server ตอบ 404 พร้อมหน้าข้อผิดพลาด\n404 หมายถึงไม่พบสิ่งที่ขอ · คำตอบนี้ยังเป็น response จาก server',
    src: 'HTTP Semantics · RFC 9110 §15.5.5 · https://www.rfc-editor.org/rfc/rfc9110.html#name-404-not-found',
  },
  {
    type: 'webflow', scene: 'build-html', think: true,
    title: 'ลองคิด: หน้าเว็บมาจากอะไร',
  },
  {
    type: 'webflow', scene: 'build-html',
    title: 'HTML · โครงของหน้าบอร์ดงาน',
    sub: 'หัวข้อ คอลัมน์ รายการงาน และปุ่ม คือส่วนประกอบของหน้าเว็บ\nตัวอย่าง TaskFlow ยังไม่มีหน้าตาจาก CSS และปุ่มยังย้ายงานไม่ได้',
  },
  {
    type: 'webflow', scene: 'build-css',
    title: 'CSS · เพิ่มหน้าตาให้โครงเดิม',
    sub: 'บอร์ดเดิมมีสี เส้นขอบ และคอลัมน์เรียงเคียงกัน\nCSS จัดหน้าตา ส่วนปุ่มย้ายงานยังไม่ทำงาน',
  },
  {
    type: 'webflow', scene: 'build-js',
    title: 'JavaScript · เพิ่มพฤติกรรมให้หน้าเว็บ',
    sub: 'โครงและหน้าตาของบอร์ดเดิมยังอยู่ · เพิ่มการตอบสนองเมื่อกดปุ่ม\nลองกดย้ายงาน แล้วดูการ์ดไปอยู่คอลัมน์เสร็จแล้ว (ข้อมูลสมมติ)',
  },
  { type: 'webflow', scene: 'mpa', think: true, title: 'ลองคิด: กดลิงก์แล้วอะไรเปลี่ยน' },
  { type: 'webflow', scene: 'mpa', title: 'MPA · กดลิงก์แล้วโหลดทั้งหน้าใหม่', sub: 'ขอ HTML หน้าใหม่จาก server · ทั้งเนื้อหาและ header โหลดใหม่' },
  { type: 'webflow', scene: 'spa', title: 'SPA · เปลี่ยนเนื้อหาในหน้าเดิม', sub: 'JavaScript สลับส่วนเนื้อหา · header เดิมยังอยู่\nSPA ยังขอข้อมูลจาก server ได้', src: 'MDN · SPA · https://developer.mozilla.org/en-US/docs/Glossary/SPA' },
  { type: 'compare', title: 'MPA / SPA · กดลิงก์แล้วต่างกันอย่างไร', items: [
    { text: 'MPA', note: 'ขอหน้าใหม่จาก server\nโหลดทั้งหน้า รวม header', fg: 'var(--fg)', bg: 'var(--bg)' },
    { text: 'SPA', note: 'JavaScript สลับเนื้อหา\nheader เดิมคงอยู่ · อาจขอข้อมูลเพิ่ม', fg: 'var(--fg)', bg: 'var(--bg)' },
  ], src: 'MDN · SPA · https://developer.mozilla.org/en-US/docs/Glossary/SPA' },
]

export default slides
