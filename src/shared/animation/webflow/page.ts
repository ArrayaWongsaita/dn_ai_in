import { dur, ease } from '../motion'

export interface WebFlowPageDefinition {
  kind: 'page'
  layer: 'html' | 'css' | 'js'
  title: string
  caption: string
  build: (tl: gsap.core.Timeline) => void
}

function revealBoard(tl: gsap.core.Timeline) {
  tl.addLabel('start').fromTo('[data-el="board"]', { opacity: 0, yPercent: 5 }, {
    opacity: 1, yPercent: 0, duration: dur.base, ease: ease.out,
  }).addLabel('board')
}

export const buildHtml: WebFlowPageDefinition = {
  kind: 'page', layer: 'html', title: 'HTML · โครงของบอร์ด',
  caption: 'HTML วางหัวข้อ คอลัมน์ รายการงาน และปุ่ม · ยังไม่มี CSS จัดหน้าตา และยังไม่มี JavaScript ย้ายงาน',
  build: revealBoard,
}
export const buildCss: WebFlowPageDefinition = {
  kind: 'page', layer: 'css', title: 'CSS · หน้าตาของบอร์ด',
  caption: 'เพิ่ม CSS ให้โครงเดิม: สี เส้นขอบ การ์ด และคอลัมน์เคียงกัน · ปุ่มยังย้ายงานไม่ได้',
  build: revealBoard,
}
export const buildJs: WebFlowPageDefinition = {
  kind: 'page', layer: 'js', title: 'JavaScript · บอร์ดโต้ตอบได้',
  caption: 'เพิ่ม JavaScript ให้บอร์ดเดิม · กดย้ายงานเพื่อเปลี่ยนคอลัมน์ของการ์ดได้ในหน้านี้',
  build: revealBoard,
}
