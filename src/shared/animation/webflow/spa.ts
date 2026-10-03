import { dur, ease } from '../motion'
import type { WebFlowNavigationDefinition } from './navigation'

export const spa: WebFlowNavigationDefinition = {
  kind: 'navigation', mode: 'spa', title: 'SPA · เปลี่ยนเฉพาะเนื้อหา',
  captions: ['เริ่มที่บอร์ดงาน TaskFlow', 'กดลิงก์งานที่เสร็จแล้ว → JavaScript สลับเนื้อหา', 'ส่วนเนื้อหาเปลี่ยนเป็นงานที่เสร็จแล้ว · header เดิมยังอยู่'],
  build(tl) {
    tl.addLabel('board', 0)
      .fromTo('[data-el="old-body"]', { autoAlpha: 1, xPercent: 0 }, { autoAlpha: 0, xPercent: -5, duration: dur.base, ease: ease.out })
      .addLabel('switch')
      .fromTo('[data-el="new-body"]', { autoAlpha: 0, xPercent: 5 }, { autoAlpha: 1, xPercent: 0, duration: dur.base, ease: ease.out })
      .addLabel('new-content')
  },
}
