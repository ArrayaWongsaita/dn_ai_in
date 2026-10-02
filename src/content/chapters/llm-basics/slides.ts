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
  {
    type: 'llmflow',
    scene: 'tokenize',
    title: 'ตัดข้อความให้เป็น token',
    sub: 'token ไม่เท่ากับคำ · ชิ้นอาจไม่ตรงขอบเขตคำหรือกลางชื่อไฟล์',
  },
  {
    type: 'llmflow',
    scene: 'predict',
    title: 'ทำนายชิ้นถัดไปจากความน่าจะเป็น',
    sub: 'ลองคิดก่อนเลื่อน: ชิ้นถัดไปน่าจะเป็นชิ้นไหน · โมเดลเลือกจากกองความน่าจะเป็น',
  },
  {
    type: 'llmflow',
    scene: 'loop',
    title: 'วนทำนายจนคำตอบครบสามข้อ',
    sub: 'ชิ้นที่เลือกถูกต่อท้ายคำตอบ แล้ววนกลับเข้าขั้นทำนายใหม่ จนได้ครบ',
  },
]

export default slides
