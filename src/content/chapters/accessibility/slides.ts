import type { SlideData } from '@/shared/types/slide'

const src = 'WebAIM Million 2026'

const slides: SlideData[] = [
  { type: 'cover', kicker: 'บทที่ 3', title: 'การเข้าถึง', sub: 'WebAIM Million 2026 · 1,000,000 หน้าแรก' },
  { type: 'stat', value: 95.9, decimals: 1, suffix: '%', label: 'ของหน้าแรกมีข้อผิดพลาด WCAG ที่ตรวจพบได้', src },
  { type: 'stat', value: 79.1, decimals: 1, suffix: '%', label: 'contrast ต่ำ — ปัญหาอันดับหนึ่ง แก้ได้ในไม่กี่บรรทัด CSS', src },
  { type: 'stat', value: 55.5, decimals: 1, suffix: '%', label: 'ของหน้ามีภาพที่ไม่มี alt', src },
]

export default slides
