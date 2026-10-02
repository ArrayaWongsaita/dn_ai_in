import type { SlideData } from '@/shared/types/slide'

const slides: SlideData[] = [
  {
    type: 'cover',
    kicker: 'บท B3 · ตาข่ายนิรภัย',
    title: 'Git',
    sub: 'ปุ่มย้อนกลับให้โค้ด · วิธีทำงานร่วมกับคนอื่น',
  },
  {
    type: 'gitflow',
    scene: 'overview',
    command: '',
    title: 'รู้จัก 4 พื้นที่ของ Git',
    sub: 'ไฟล์จะเดินทางระหว่างพื้นที่เหล่านี้เมื่อใช้คำสั่ง',
  },
  {
    type: 'gitflow',
    scene: 'init',
    command: 'git init',
    title: 'เริ่มติดตามโฟลเดอร์ด้วย Git',
    sub: 'สร้าง repository ว่าง โดยไฟล์เดิมยังอยู่ที่เดิม',
  },
]

export default slides
