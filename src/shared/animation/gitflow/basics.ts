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

type CardStatus = 'unchanged' | 'modified' | 'staged'

const statusRows: { id: string; name: string; zone: GitFlowCard['zone']; state: CardStatus }[] = [
  { id: 'index', name: 'index.html', zone: 'working', state: 'unchanged' },
  { id: 'style', name: 'style.css', zone: 'working', state: 'modified' },
  { id: 'app', name: 'app.js', zone: 'staging', state: 'staged' },
]

const statusLabels: Record<CardStatus, string> = {
  unchanged: 'ไม่เปลี่ยนแปลง',
  modified: 'แก้ไขแล้ว',
  staged: 'เตรียม commit',
}

const terminalLabels: Record<CardStatus, string> = {
  unchanged: 'Unchanged',
  modified: 'Modified, not staged',
  staged: 'Staged for commit',
}

const statusCards: GitFlowCard[] = statusRows.map((card) => ({
  ...card,
  label: statusLabels[card.state],
}))

const previousSnapshot: GitFlowCard = {
  id: 'previous-snapshot', name: 'a1b2c3d', zone: 'repository',
  state: 'snapshot', label: 'commit ล่าสุด',
}

const statusState: GitFlowSceneState = {
  cards: [...statusCards, previousSnapshot],
  zones: {
    ...overviewZones,
    working: { state: 'files', note: 'มีทั้งไฟล์ที่เปลี่ยนและไม่เปลี่ยน' },
    staging: { state: 'files', note: 'มีไฟล์รอ commit' },
    repository: { state: 'snapshot', note: 'มี commit ก่อนหน้า' },
  },
  output: [
    'On branch main',
    ...statusRows.map(({ name, state }) => `${terminalLabels[state]}: ${name}`),
  ].join('\n'),
  caption: 'git status แสดงไฟล์ที่ไม่เปลี่ยน แก้ไขแล้ว และเตรียม commit แยกกัน',
}

const addCard: GitFlowCard = {
  id: 'add-style', name: 'style.css', zone: 'working',
  state: 'modified', label: 'แก้ไขแล้ว',
}

const addState: GitFlowSceneState = {
  cards: [addCard, previousSnapshot],
  zones: {
    ...overviewZones,
    working: { state: 'files', note: `${addCard.name} ถูกแก้ไขแล้ว` },
    repository: { state: 'snapshot', note: `commit ล่าสุด ${previousSnapshot.name}` },
  },
  output: `Changes to be committed:\n  modified: ${addCard.name}\n\nNo commit was created; the repository is unchanged.`,
  caption: `${addCard.name} ย้ายไปพื้นที่เตรียม ส่วน commit เดิมใน repository ยังเหมือนเดิม`,
}

function revealTerminalPart(tl: gsap.core.Timeline, element: string, label: string, duration: number) {
  tl.addLabel(label).fromTo(element, {
    clipPath: 'inset(0 100% 0 0)', attr: { 'data-revealed-fraction': 0 },
  }, {
    clipPath: 'inset(0 0% 0 0)', attr: { 'data-revealed-fraction': 1 },
    duration, ease: ease.linear,
  })
}

export function buildStatusTimeline(tl: gsap.core.Timeline) {
  revealTerminalPart(tl, '[data-el="terminal-command"]', 'command', dur.base)
  statusState.cards.filter((card) => card.state !== 'snapshot').forEach((card) => {
    tl.addLabel(card.state).fromTo(`[data-el="card-${card.id}"]`, {
      opacity: 0, attr: { 'data-zone': card.zone, 'data-state': card.state },
    }, {
      opacity: 1, attr: { 'data-zone': card.zone, 'data-state': card.state },
      duration: dur.fast, ease: ease.out,
    })
  })
  revealTerminalPart(tl, '[data-el="terminal-output"]', 'output', dur.work)
}

function cardTravelOffset(cardId: string, destinationId: GitFlowCard['zone']) {
  const card = document.querySelector<HTMLElement>(`[data-el="card-${cardId}"]`)
  const sourceZone = card?.closest<HTMLElement>('[data-el^="zone-"]')
  const destinationZone = sourceZone?.parentElement?.querySelector<HTMLElement>(`[data-el="zone-${destinationId}"]`)
  const destinationCards = destinationZone?.querySelector<HTMLElement>(':scope > div')
  if (!card || !destinationCards) throw new Error(`Cannot find ${cardId} or destination ${destinationId}`)

  const cardRect = card.getBoundingClientRect()
  const targetRect = destinationCards.getBoundingClientRect()
  return {
    x: targetRect.left + (targetRect.width - cardRect.width) / 2 - cardRect.left,
    y: targetRect.top - cardRect.top,
  }
}

export function buildAddTimeline(tl: gsap.core.Timeline) {
  revealTerminalPart(tl, '[data-el="terminal-command"]', 'command', dur.base)
  const offset = cardTravelOffset(addCard.id, 'staging')
  tl.addLabel('stage').fromTo(`[data-el="card-${addCard.id}"]`, {
    x: 0, y: 0, attr: { 'data-zone': addCard.zone, 'data-state': addCard.state },
  }, {
    x: offset.x, y: offset.y, attr: { 'data-zone': 'staging', 'data-state': 'staged' },
    duration: dur.travel, ease: ease.travel,
  })
  tl.fromTo('[data-el="zone-staging"]', {
    attr: { 'data-zone-state': addState.zones.staging.state },
  }, {
    attr: { 'data-zone-state': 'staged' }, duration: dur.travel, ease: ease.linear,
  }, 'stage')
  revealTerminalPart(tl, '[data-el="terminal-output"]', 'output', dur.work)
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
  status: {
    title: 'git status', command: 'git status', build: buildStatusTimeline,
    state: statusState,
  },
  add: {
    title: 'git add', command: `git add ${addCard.name}`, build: buildAddTimeline,
    state: addState,
  },
} satisfies Record<string, GitFlowSceneDefinition>
