import { dur, ease } from '../motion'
import type { GitFlowCard, GitFlowSceneDefinition, GitFlowSceneState } from './index'

const sampleCards: GitFlowCard[] = [
  { id: 'index', name: 'index.html', zone: 'working', state: 'untracked', label: 'ยังไม่ติดตาม' },
  { id: 'style', name: 'style.css', zone: 'working', state: 'untracked', label: 'ยังไม่ติดตาม' },
  { id: 'app', name: 'app.js', zone: 'working', state: 'untracked', label: 'ยังไม่ติดตาม' },
]

const overviewZones: GitFlowSceneState['zones'] = {
  working: { state: 'files', note: 'ไฟล์ที่กำลังแก้ไข' },
  staging: { state: 'empty', note: 'รอจัดเข้า commit' },
  repository: { state: 'empty', note: 'ยังไม่มี commit' },
  remote: { state: 'disconnected', note: 'ที่เก็บบน GitHub' },
}

const revealZone = (tl: gsap.core.Timeline, id: string, state: string) => tl
  .fromTo(`[data-el="zone-${id}"]`, {
    opacity: 0, attr: { 'data-zone-state': state },
  }, {
    opacity: 1, attr: { 'data-zone-state': state }, duration: dur.fast, ease: ease.out,
  })

export function buildOverviewTimeline(tl: gsap.core.Timeline) {
  revealZone(tl.addLabel('working'), 'working', overviewZones.working.state)
  revealZone(tl.addLabel('staging'), 'staging', overviewZones.staging.state)
  revealZone(tl.addLabel('repository'), 'repository', overviewZones.repository.state)
  tl.addLabel('internet').fromTo('[data-el="internet-line"]', {
    opacity: 0,
  }, { opacity: 1, duration: dur.fast, ease: ease.out })
  revealZone(tl.addLabel('remote'), 'remote', overviewZones.remote.state)
}

const overviewState: GitFlowSceneState = {
  cards: sampleCards,
  zones: overviewZones,
  output: '',
  caption: 'ไฟล์เริ่มที่โฟลเดอร์ทำงาน ส่วน GitHub อยู่ฝั่งรีโมตหลังเส้นอินเทอร์เน็ต',
}

export function buildInitTimeline(tl: gsap.core.Timeline) {
  tl.addLabel('command').fromTo('[data-el="terminal-command"]', {
    clipPath: 'inset(0 100% 0 0)', attr: { 'data-revealed-fraction': 0 },
  }, {
    clipPath: 'inset(0 0% 0 0)', attr: { 'data-revealed-fraction': 1 },
    duration: dur.base, ease: ease.linear,
  })
  tl.addLabel('output').fromTo('[data-el="terminal-output"]', {
    clipPath: 'inset(0 100% 0 0)', attr: { 'data-revealed-fraction': 0 },
  }, {
    clipPath: 'inset(0 0% 0 0)', attr: { 'data-revealed-fraction': 1 },
    duration: dur.work, ease: ease.linear,
  })
}

export const basicsScenes = {
  overview: {
    title: 'ภาพรวม 4 พื้นที่', command: '', build: buildOverviewTimeline,
    state: overviewState,
  },
  init: {
    title: 'git init', command: 'git init', build: buildInitTimeline,
    state: {
      cards: sampleCards,
      zones: {
        ...overviewZones,
        repository: { state: 'empty', note: 'ว่าง · ยังไม่มี commit' },
      },
      output: 'Initialized empty Git repository\nเริ่มติดตามประวัติจากโฟลเดอร์นี้แล้ว',
      caption: 'Git สร้าง repository ว่าง ไฟล์ทั้งสามยังอยู่ในโฟลเดอร์ทำงาน',
    },
  },
} satisfies Record<string, GitFlowSceneDefinition>
