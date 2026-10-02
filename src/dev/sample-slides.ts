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
]
