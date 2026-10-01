import type { SlideData } from '@/shared/types/slide'

const slides: SlideData[] = [
  { type: 'cover', kicker: 'บทที่ 4', title: 'สีที่อ่านสบายตา', sub: 'contrast พอดี ไม่จ้า' },
  {
    type: 'compare',
    title: 'ไม่ต้องดำสนิทบนขาวสนิท',
    // Raw hex is allowed here only because the colours ARE the demo.
    items: [
      { text: 'ดำ #000 บนขาว #fff', note: 'contrast 21 : 1 — จ้าเกินไป', fg: '#000000', bg: '#ffffff' },
      { text: '#2b2a26 บน #f7f5f0', note: 'contrast 13.2 : 1 — สบายตา', fg: '#2b2a26', bg: '#f7f5f0' },
    ],
    sub: 'ต่ำกว่า 4.5 : 1 คืออ่านยาก · สูงเกินไปก็ล้าตา',
    src: 'WCAG 2 · APCA · งานวิจัย visual fatigue',
  },
]

export default slides
