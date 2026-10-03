import { dur, ease } from '../motion'
import type { WebFlowNavigationDefinition } from './navigation'

export const mpa: WebFlowNavigationDefinition = {
  kind: 'navigation', mode: 'mpa', title: 'MPA · โหลดทั้งหน้าใหม่',
  captions: ['เริ่มที่บอร์ดงาน TaskFlow', 'กดลิงก์งานที่เสร็จแล้ว → ส่ง GET ไป server', 'server ส่ง HTML ของหน้าใหม่กลับมา', 'ทั้งหน้า รวม header หายไปชั่วครู่ขณะโหลดใหม่', 'หน้าใหม่แสดงงานที่เสร็จแล้ว พร้อม header'],
  build(tl) {
    tl.addLabel('board', 0)
      .fromTo('[data-el="request"]', { autoAlpha: 0, xPercent: -30 }, { autoAlpha: 1, xPercent: 100, duration: dur.travel, ease: ease.travel })
      .addLabel('request')
      .fromTo('[data-el="response"]', { autoAlpha: 0, xPercent: 100 }, { autoAlpha: 1, xPercent: 0, duration: dur.travel, ease: ease.travel })
      .addLabel('response')
      .fromTo('[data-el="navigation-page"]', { opacity: 1 }, { opacity: 0, duration: dur.base, ease: ease.linear })
      .addLabel('reload')
      .fromTo('[data-el="old-body"]', { autoAlpha: 1 }, { autoAlpha: 0, duration: dur.fast, ease: ease.linear }, '<')
      .fromTo('[data-el="new-body"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: dur.fast, ease: ease.linear }, '<')
      .fromTo('[data-el="navigation-page"]', { opacity: 0 }, { opacity: 1, duration: dur.base, ease: ease.out, immediateRender: false })
      .addLabel('new-page')
  },
}
