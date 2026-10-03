import { dur, ease } from '../motion'
import { nodeAttrs, nodeEl, type TerminalNode, type TerminalSceneDefinition } from './index'

const commandEl = '[data-el="terminal-command"]'

function revealCommand(tl: gsap.core.Timeline) {
  tl.addLabel('command').fromTo(commandEl, {
    clipPath: 'inset(0 100% 0 0)', attr: { 'data-revealed-fraction': 0 },
  }, {
    clipPath: 'inset(0 0% 0 0)', attr: { 'data-revealed-fraction': 1 },
    duration: dur.base, ease: ease.linear,
  })
}

const homeHere: TerminalNode = { id: 'home', name: '~', kind: 'folder', depth: 0, state: 'current' }
const homeInside: TerminalNode = { id: 'home', name: '~', kind: 'folder', depth: 0, state: 'normal' }
const siteNew: TerminalNode = { id: 'my-site', name: 'my-site', kind: 'folder', depth: 1, state: 'new' }
const siteCurrent: TerminalNode = { id: 'my-site', name: 'my-site', kind: 'folder', depth: 1, state: 'current' }
const indexFile: TerminalNode = { id: 'index', name: 'index.html', kind: 'file', depth: 1, state: 'new' }
const styleFile: TerminalNode = { id: 'style', name: 'style.css', kind: 'file', depth: 1, state: 'new' }
const appFile: TerminalNode = { id: 'app', name: 'app.js', kind: 'file', depth: 1, state: 'new' }
const notesFile: TerminalNode = { id: 'notes', name: 'notes.txt', kind: 'file', depth: 1, state: 'new' }
const notesRemoved: TerminalNode = { ...notesFile, state: 'gone' }
const touched = [indexFile, styleFile, appFile, notesFile]

export function buildMkdirTimeline(tl: gsap.core.Timeline) {
  revealCommand(tl)
  tl.addLabel('created').fromTo(nodeEl(siteNew.id), {
    autoAlpha: 0, ...nodeAttrs(siteNew, 'normal'),
  }, {
    autoAlpha: 1, ...nodeAttrs(siteNew), duration: dur.fast, ease: ease.out,
  })
}

export function buildTouchTimeline(tl: gsap.core.Timeline) {
  revealCommand(tl)
  tl.addLabel('files')
  touched.forEach((file, i) => {
    tl.fromTo(nodeEl(file.id), {
      autoAlpha: 0, ...nodeAttrs(file, 'normal'),
    }, {
      autoAlpha: 1, ...nodeAttrs(file), duration: dur.fast, ease: ease.out,
    }, i === 0 ? 'files' : `files+=${(i * 0.08).toFixed(2)}`)
  })
}

export function buildRmTimeline(tl: gsap.core.Timeline) {
  revealCommand(tl)
  tl.addLabel('removed').fromTo(nodeEl(notesRemoved.id), {
    opacity: 1, ...nodeAttrs(notesRemoved, 'normal'),
  }, {
    opacity: 0.4, ...nodeAttrs(notesRemoved), duration: dur.fast, ease: ease.out,
  })
}

export const fileScenes = {
  mkdir: {
    title: 'mkdir',
    command: 'mkdir my-site',
    state: { prompt: '~ $ ', output: '', nodes: [homeHere, siteNew] },
    captions: [
      'พิมพ์ mkdir my-site แล้วกด Enter เพื่อสร้างโฟลเดอร์ใหม่',
      'my-site ปรากฏในแผนผังเป็นโฟลเดอร์ที่สร้างใหม่',
    ],
    build: buildMkdirTimeline,
  },
  touch: {
    title: 'touch',
    command: 'touch index.html style.css app.js notes.txt',
    state: { prompt: 'my-site $ ', output: '', nodes: [homeInside, siteCurrent, ...touched] },
    captions: [
      'พิมพ์ touch แล้วตามด้วยชื่อไฟล์ทั้งสี่ เพื่อสร้างไฟล์เปล่า',
      'ไฟล์ทั้งสี่ปรากฏอยู่ใต้ my-site พร้อมให้เริ่มเขียนโค้ด',
    ],
    build: buildTouchTimeline,
  },
  rm: {
    title: 'rm',
    command: 'rm notes.txt',
    state: {
      prompt: 'my-site $ ',
      output: '',
      nodes: [homeInside, siteCurrent, indexFile, styleFile, appFile, notesRemoved],
    },
    captions: [
      'พิมพ์ rm notes.txt เพื่อลบไฟล์ที่ไม่ต้องการ',
      'notes.txt ถูกลบถาวร · ไฟล์ไม่ไปอยู่ในถังขยะ จึงต้องตรวจชื่อให้ดีก่อนกด Enter',
    ],
    build: buildRmTimeline,
  },
} satisfies Record<string, TerminalSceneDefinition>
