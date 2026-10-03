import { dur, ease } from '../motion'

export interface WebFlowApiDefinition {
  kind: 'api'
  title: string
  captions: string[]
  build: (tl: gsap.core.Timeline) => void
}

/** Each label lands after its message arrives; return messages stay readable. */
export const apiDb: WebFlowApiDefinition = {
  kind: 'api', title: 'API + ฐานข้อมูล · ขอข้อมูลบอร์ดงาน',
  captions: [
    'หน้าเว็บต้องการข้อมูลบอร์ดงาน · ตัวอย่างนี้ใช้ข้อมูลสมมติ',
    'หน้าเว็บส่ง GET /api/tasks ไปยัง API บน server เพื่อขอข้อมูล',
    'Server รับคำขอผ่าน API แล้วขอรายการงานจากฐานข้อมูล',
    'ฐานข้อมูลส่งรายการงานกลับให้ server',
    'Server จัดข้อมูลเป็น JSON แล้วส่ง response กลับหน้าเว็บ',
    'JavaScript ในหน้าเว็บนำข้อมูล JSON มาแสดงเป็นรายการงาน',
  ],
  build(tl) {
    tl.addLabel('website', 0)
    for (const [el, label, direction] of [
      ['api-request', 'api', 1], ['db-query', 'database', 1],
      ['db-result', 'rows', -1], ['json-response', 'json', -1],
    ] as const) {
      tl.fromTo(`[data-el="${el}"]`, { autoAlpha: 0, xPercent: -20 * direction },
        { autoAlpha: 1, xPercent: 0, duration: dur.base, ease: ease.out })
      if (el === 'json-response') tl.fromTo('[data-el="json-payload"]', { autoAlpha: 0 },
        { autoAlpha: 1, duration: dur.base, ease: ease.out }, '<')
      tl.addLabel(label)
    }
    tl.fromTo('[data-el="api-board"]', { autoAlpha: 0 },
      { autoAlpha: 1, duration: dur.base, ease: ease.out }).addLabel('rendered')
  },
}
