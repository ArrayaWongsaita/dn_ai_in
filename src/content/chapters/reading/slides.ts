import type { SlideData } from '@/shared/types/slide'

const slides: SlideData[] = [
  { type: 'cover', kicker: 'บทที่ 1', title: 'คนอ่านเว็บอย่างไร', sub: 'คนสแกน ไม่ได้อ่าน' },
  { type: 'stat', value: 25, suffix: '%', label: 'ของข้อความที่ผู้ใช้อ่านจริงในหนึ่งหน้า — ที่เหลือคือการสแกน', src: 'Nielsen Norman Group' },
  {
    type: 'statement',
    title: 'หัวข้อ · bullet · ตัวหนา',
    sub: 'ช่วยให้สแกนได้ — F-pattern คือผลของเนื้อหาไร้โครงสร้าง ไม่ใช่เป้าหมายให้ทำตาม',
    src: 'Nielsen Norman Group',
  },
]

export default slides
