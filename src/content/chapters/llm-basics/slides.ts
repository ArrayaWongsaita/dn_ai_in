import type { SlideData } from '@/shared/types/slide'

const slides: SlideData[] = [
  {
    type: 'cover',
    kicker: 'บท B4 · เข้าใจเครื่องมือ',
    title: 'LLM คืออะไร',
    sub: 'สิ่งที่ตอบคุณอยู่ทำงานอย่างไร · จาก prompt ถึงคำตอบ',
  },
  {
    type: 'llmflow',
    scene: 'overview',
    title: 'ภาพรวมวงจรของ LLM',
    sub: 'prompt → token → โมเดล → คำตอบ วนจนได้คำตอบครบ',
  },
]

export default slides
