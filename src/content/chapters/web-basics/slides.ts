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
]

export default slides
