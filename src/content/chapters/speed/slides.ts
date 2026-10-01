import type { SlideData } from '@/shared/types/slide'

const slides: SlideData[] = [
  { type: 'cover', kicker: 'บทที่ 2', title: 'ความเร็ว', sub: 'Core Web Vitals และผลต่อรายได้' },
  { type: 'stat', value: 2.5, decimals: 1, suffix: 's', label: 'เวลาที่ LCP ควรเสร็จ · INP ≤ 200ms · CLS ≤ 0.1', src: 'web.dev · Core Web Vitals' },
  { type: 'stat', value: 7, prefix: '−', suffix: '%', label: 'conversion ต่อทุก 1 วินาทีที่ช้าลง', src: 'Conductor · รวม case study' },
  { type: 'stat', value: 53, suffix: '%', label: 'ของผู้ใช้มือถือละทิ้งหน้าที่โหลดเกิน 3 วินาที', src: 'web.dev' },
  { type: 'stat', value: 33.13, decimals: 2, prefix: '+', suffix: '%', label: 'conversion ของ Rakuten 24 เมื่อ LCP ดีขึ้น (A/B test)', src: 'web.dev' },
]

export default slides
