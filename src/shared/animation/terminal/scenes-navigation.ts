import { dur, ease } from '../motion'
import { nodeAttrs, nodeEl, type TerminalNode, type TerminalSceneDefinition } from './index'

const commandEl = '[data-el="terminal-command"]'
const outputEl = '[data-el="terminal-output"]'
const promptEl = '[data-el="terminal-prompt"]'

function revealPart(tl: gsap.core.Timeline, element: string, label: string, duration: number) {
  tl.addLabel(label).fromTo(element, {
    clipPath: 'inset(0 100% 0 0)', attr: { 'data-revealed-fraction': 0 },
  }, {
    clipPath: 'inset(0 0% 0 0)', attr: { 'data-revealed-fraction': 1 },
    duration, ease: ease.linear,
  })
}

function revealCommand(tl: gsap.core.Timeline) {
  revealPart(tl, commandEl, 'command', dur.base)
}

const homePwd: TerminalNode = { id: 'home', name: '~', kind: 'folder', depth: 0, state: 'current' }
const homeCd: TerminalNode = { id: 'home', name: '~', kind: 'folder', depth: 0, state: 'normal' }
const siteCd: TerminalNode = { id: 'my-site', name: 'my-site', kind: 'folder', depth: 1, state: 'current' }

export function buildPwdTimeline(tl: gsap.core.Timeline) {
  revealCommand(tl)
  revealPart(tl, outputEl, 'output', dur.work)
  tl.addLabel('location').fromTo(nodeEl(homePwd.id), {
    ...nodeAttrs(homePwd, 'normal'),
  }, {
    ...nodeAttrs(homePwd), duration: dur.base, ease: ease.out,
  })
}

export function buildLsTimeline(tl: gsap.core.Timeline) {
  revealCommand(tl)
  revealPart(tl, outputEl, 'output', dur.work)
}

export function buildCdTimeline(tl: gsap.core.Timeline) {
  revealCommand(tl)
  tl.addLabel('prompt').fromTo(promptEl, {
    text: '~ $ ',
  }, {
    text: 'my-site $ ', duration: dur.base, ease: ease.linear,
  })
  tl.addLabel('location')
    .fromTo(nodeEl(homeCd.id), nodeAttrs(homeCd, 'current'), {
      ...nodeAttrs(homeCd), duration: dur.base, ease: ease.out,
    })
    .fromTo(nodeEl(siteCd.id), nodeAttrs(siteCd, 'new'), {
      ...nodeAttrs(siteCd), duration: dur.base, ease: ease.out,
    }, '<')
}

export const navigationScenes = {
  pwd: {
    title: 'pwd',
    command: 'pwd',
    state: { prompt: '~ $ ', output: '/Users/student', nodes: [homePwd] },
    captions: [
      'พิมพ์ pwd แล้วกด Enter เพื่อถามว่าตอนนี้อยู่โฟลเดอร์ไหน',
      'เทอร์มินัลตอบเส้นทางของโฟลเดอร์บ้าน',
      'แผนผังไฮไลต์โฟลเดอร์บ้านที่เป็นตำแหน่งปัจจุบัน',
    ],
    build: buildPwdTimeline,
  },
  ls: {
    title: 'ls',
    command: 'ls',
    state: {
      prompt: '~ $ ',
      output: 'Desktop  Documents  Downloads  Music  Pictures',
      nodes: [homePwd],
    },
    captions: [
      'พิมพ์ ls เพื่อดูว่ามีอะไรในโฟลเดอร์ปัจจุบัน',
      'เห็นรายการโฟลเดอร์ในบ้าน · โปรเจกต์ my-site ยังไม่มี',
    ],
    build: buildLsTimeline,
  },
  cd: {
    title: 'cd',
    command: 'cd my-site',
    state: { prompt: 'my-site $ ', output: '', nodes: [homeCd, siteCd] },
    captions: [
      'พิมพ์ cd my-site เพื่อเข้าไปในโฟลเดอร์ที่สร้างไว้',
      'prompt เปลี่ยนจาก ~ เป็น my-site แปลว่าตอนนี้อยู่ในโฟลเดอร์ใหม่',
      'แผนผังย้ายไฮไลต์จากโฟลเดอร์บ้านไปที่ my-site',
    ],
    build: buildCdTimeline,
  },
} satisfies Record<string, TerminalSceneDefinition>
