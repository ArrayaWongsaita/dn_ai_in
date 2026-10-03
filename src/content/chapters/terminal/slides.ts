import type { SlideData } from '@/shared/types/slide'

const slides: SlideData[] = [
  {
    type: 'cover',
    kicker: 'บท A3 · เทอร์มินัล',
    title: 'เทอร์มินัล',
    sub: 'คำสั่งพื้นฐานเพื่อเดินไปในโฟลเดอร์ · สร้างไฟล์แรกของโปรเจกต์',
  },
  {
    type: 'statement',
    title: 'command คือข้อความที่เราพิมพ์สั่งงาน',
    sub: 'พิมพ์คำสั่งแล้วกด Enter · เทอร์มินัลทำงานตามนั้นและตอบผลลัพธ์กลับมา',
  },
  {
    type: 'statement',
    title: 'Windows ใช้ Git Bash',
    sub: 'ติดตั้ง Git for Windows แล้วเปิด Git Bash · คำสั่งทุกคำสั่งเหมือน Mac',
    src: 'git-scm.com/downloads',
  },
  {
    type: 'terminal',
    scene: 'pwd',
    command: 'pwd',
    title: 'ตอนนี้อยู่โฟลเดอร์ไหน',
    sub: 'pwd ถามเทอร์มินัลว่าตำแหน่งปัจจุบันคือที่ไหน · แผนผังไฮไลต์โฟลเดอร์บ้าน',
  },
  {
    type: 'terminal',
    scene: 'ls',
    command: 'ls',
    title: 'ในโฟลเดอร์มีอะไรบ้าง',
    sub: 'ls แสดงรายการไฟล์และโฟลเดอร์ในตำแหน่งปัจจุบัน',
  },
  {
    type: 'terminal',
    scene: 'mkdir',
    command: 'mkdir my-site',
    title: 'สร้างโฟลเดอร์โปรเจกต์',
    sub: 'mkdir สร้างโฟลเดอร์ใหม่ชื่อ my-site ให้โปรเจกต์ของเรา',
  },
  {
    type: 'terminal',
    scene: 'cd',
    command: 'cd my-site',
    title: 'เข้าไปในโฟลเดอร์ที่สร้าง',
    sub: 'cd เปลี่ยนตำแหน่งปัจจุบัน · prompt เปลี่ยนเป็น my-site $ แปลว่าเราอยู่ข้างในแล้ว',
  },
  {
    type: 'terminal',
    scene: 'touch',
    command: 'touch index.html style.css app.js notes.txt',
    title: 'สร้างไฟล์แรกของโปรเจกต์',
    sub: 'touch สร้างไฟล์เปล่า · พิมพ์ชื่อหลายไฟล์ในคำสั่งเดียวได้',
  },
  {
    type: 'terminal',
    scene: 'rm',
    command: 'rm notes.txt',
    title: 'ลบไฟล์ที่ไม่ต้องการ',
    sub: 'rm ลบไฟล์อย่างถาวร · ไฟล์ที่ลบไม่ลงถังขยะ จึงต้องตรวจชื่อให้ดีก่อนกด Enter',
  },
  {
    type: 'statement',
    title: 'ชีตคำสั่ง',
    sub: [
      'pwd — ดูว่าตอนนี้อยู่โฟลเดอร์ไหน',
      'ls — ดูรายการไฟล์และโฟลเดอร์ในโฟลเดอร์ปัจจุบัน',
      'mkdir my-site — สร้างโฟลเดอร์ชื่อ my-site',
      'cd my-site — เข้าไปทำงานในโฟลเดอร์ my-site',
      'touch index.html style.css app.js notes.txt — สร้างไฟล์เปล่าทั้งสี่',
      'rm notes.txt — ลบไฟล์ notes.txt อย่างถาวร ไม่ลงถังขยะ',
    ].join('\n'),
  },
]

export default slides
