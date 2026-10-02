import { dur, ease } from '../motion'
import type { GitFlowCard, GitFlowSceneDefinition, GitFlowSceneState } from './index'

const zones: GitFlowSceneState['zones'] = {
  working: { state: 'files', note: 'ไฟล์ในโฟลเดอร์ทำงาน' },
  staging: { state: 'empty', note: 'รอจัดเข้า commit' },
  repository: { state: 'empty', note: 'ประวัติในเครื่อง' },
  remote: { state: 'disconnected', note: 'ที่เก็บบน GitHub' },
}

const later = { immediateRender: false }
const cardEl = (id: string) => `[data-el="card-${id}"]`

function travelOffset(sourceId: string, destinationId: string) {
  const source = document.querySelector<HTMLElement>(cardEl(sourceId))
  const destination = document.querySelector<HTMLElement>(cardEl(destinationId))
  if (!source || !destination) throw new Error(`Cannot find ${sourceId} or ${destinationId}`)
  const from = source.getBoundingClientRect()
  const to = destination.getBoundingClientRect()
  return { x: to.left - from.left, y: to.top - from.top }
}

function revealTerminalPart(tl: gsap.core.Timeline, element: string, label: string, duration: number) {
  tl.addLabel(label).fromTo(element, {
    clipPath: 'inset(0 100% 0 0)', attr: { 'data-revealed-fraction': 0 },
  }, {
    clipPath: 'inset(0 0% 0 0)', attr: { 'data-revealed-fraction': 1 },
    duration, ease: ease.linear,
  })
}

const stagedFiles: GitFlowCard[] = [
  { id: 'commit-index', name: 'index.html', zone: 'staging', state: 'staged', label: 'เตรียม commit' },
  { id: 'commit-style', name: 'style.css', zone: 'staging', state: 'staged', label: 'เตรียม commit' },
  { id: 'commit-app', name: 'app.js', zone: 'staging', state: 'staged', label: 'เตรียม commit' },
]
const commitHash = 'b7c2e91'
const commitMessage = 'Add project files'
const commitSnapshot: GitFlowCard = {
  id: 'commit-snapshot', name: commitHash, zone: 'repository', state: 'snapshot', label: commitMessage,
}
const commitState: GitFlowSceneState = {
  cards: [...stagedFiles, commitSnapshot],
  zones: {
    ...zones,
    staging: { state: 'files', note: '3 ไฟล์พร้อมบันทึก' },
    repository: { state: 'empty', note: 'ยังไม่มี commit ใหม่' },
  },
  output: [
    `[main ${commitSnapshot.name}] ${commitSnapshot.label}`,
    `${stagedFiles.length} files changed`,
    ...stagedFiles.map((file) => `create mode 100644 ${file.name}`),
  ].join('\n'),
  caption: `git commit บันทึกไฟล์ทั้งสามเป็น snapshot ${commitSnapshot.name} · ${commitSnapshot.label}`,
}

export function buildCommitTimeline(tl: gsap.core.Timeline) {
  revealTerminalPart(tl, '[data-el="terminal-command"]', 'command', dur.base)
  const offsets = stagedFiles.map((file) => travelOffset(file.id, commitSnapshot.id))
  tl.addLabel('commit')
  stagedFiles.forEach((file, index) => {
    const offset = offsets[index]
    tl.fromTo(cardEl(file.id), {
      x: 0, y: 0, opacity: 1, attr: { 'data-zone': 'staging', 'data-state': 'staged' },
    }, {
      x: offset.x, y: offset.y, opacity: 0,
      attr: { 'data-zone': 'repository', 'data-state': 'committed' },
      duration: dur.travel, ease: ease.travel, ...later,
    }, `commit+=${index * dur.hop}`)
  })
  tl.fromTo('[data-el="zone-staging"]', {
    attr: { 'data-zone-state': commitState.zones.staging.state },
  }, {
    attr: { 'data-zone-state': 'empty' }, duration: dur.fast, ease: ease.linear,
  }, 'commit')
  tl.fromTo('[data-el="zone-repository"]', {
    attr: { 'data-zone-state': commitState.zones.repository.state },
  }, {
    attr: { 'data-zone-state': 'snapshot' }, duration: dur.fast, ease: ease.linear,
  }, 'commit')
  tl.fromTo(cardEl(commitSnapshot.id), {
    x: 0, y: 0, opacity: 0, scale: 0.72,
    attr: { 'data-zone': commitSnapshot.zone, 'data-state': commitSnapshot.state },
  }, {
    x: 0, y: 0, opacity: 1, scale: 1,
    attr: { 'data-zone': commitSnapshot.zone, 'data-state': commitSnapshot.state },
    duration: dur.base, ease: ease.out,
  }, `commit+=${dur.base}`)
  revealTerminalPart(tl, '[data-el="terminal-output"]', 'saved', dur.work)
}

const logEntries = [
  { hash: 'b7c2e91', message: 'Add project files' },
  { hash: 'a1b2c3d', message: 'Create project structure' },
  { hash: 'd4e5f6a', message: 'Start project' },
]
const logCards: GitFlowCard[] = logEntries.map(({ hash, message }, index) => ({
  id: `log-${index + 1}`, name: hash, zone: 'repository', state: 'snapshot', label: message,
}))
const logState: GitFlowSceneState = {
  cards: logCards,
  zones: {
    ...zones,
    working: { state: 'clean', note: 'ไม่มีไฟล์ค้างแก้ไข' },
    repository: { state: 'history', note: 'เรียงจาก commit ล่าสุด' },
  },
  output: logCards.map(({ name, label }) => `${name} ${label}`).join('\n'),
  caption: 'git log แสดง commit ทั้งสามจากรายการใหม่สุดลงไปหาเก่าสุด',
}

export function buildLogTimeline(tl: gsap.core.Timeline) {
  revealTerminalPart(tl, '[data-el="terminal-command"]', 'command', dur.base)
  logState.cards.forEach((card, index) => {
    tl.addLabel(`entry-${index + 1}`).fromTo(cardEl(card.id), {
      opacity: 0, attr: { 'data-zone': card.zone, 'data-state': card.state },
    }, {
      opacity: 1, attr: { 'data-zone': card.zone, 'data-state': card.state },
      duration: dur.fast, ease: ease.out,
    })
  })
  tl.fromTo('[data-el="zone-repository"]', {
    attr: { 'data-zone-state': 'empty' },
  }, {
    attr: { 'data-zone-state': logState.zones.repository.state }, duration: dur.fast, ease: ease.linear,
  }, 'entry-1')
  revealTerminalPart(tl, '[data-el="terminal-output"]', 'history', dur.work)
}

const recapEdited: GitFlowCard = {
  id: 'recap-edited', name: 'style.css', zone: 'working', state: 'modified', label: 'แก้ไขแล้ว',
}
const recapCards: GitFlowCard[] = [
  { id: 'recap-clean', name: recapEdited.name, zone: 'working', state: 'unchanged', label: 'ไม่เปลี่ยนแปลง' },
  recapEdited,
  { id: 'recap-staged', name: recapEdited.name, zone: 'staging', state: 'staged', label: 'เตรียม commit' },
  { id: 'recap-previous', name: 'a1b2c3d', zone: 'repository', state: 'snapshot', label: 'Create project files' },
  { id: 'recap-snapshot', name: 'c8d0e21', zone: 'repository', state: 'snapshot', label: 'Add stylesheet' },
]
const recapSnapshot = recapCards[4]
const recapState: GitFlowSceneState = {
  cards: recapCards,
  zones: {
    ...zones,
    working: { state: 'clean', note: 'สถานะสุดท้ายสะอาด' },
    staging: { state: 'empty', note: 'ไม่มีไฟล์รอ commit' },
    repository: { state: 'snapshot', note: 'มี commit ล่าสุด' },
  },
  output: [
    `Changes not staged for commit:\n  modified: ${recapEdited.name}`,
    `[main ${recapSnapshot.name}] ${recapSnapshot.label}\n 1 file changed`,
    'On branch main\nnothing to commit, working tree clean',
  ].join('\n\n'),
  caption: 'แก้ไขไฟล์ → git add → git commit แล้วตรวจสถานะจน working tree clean',
}
const recapCommand = `# edit ${recapEdited.name}\n$ git status\n$ git add ${recapEdited.name}\n$ git commit -m "${recapSnapshot.label}"`

export function buildRecapTimeline(tl: gsap.core.Timeline) {
  const clean = recapState.cards[0]
  const edited = recapState.cards[1]
  const staged = recapState.cards[2]
  const snapshot = recapState.cards[4]
  const stageOffset = travelOffset(edited.id, staged.id)
  const commitOffset = travelOffset(staged.id, snapshot.id)

  revealTerminalPart(tl, '[data-el="terminal-command"]', 'commands', dur.base)
  tl.addLabel('edit')
  tl.fromTo(cardEl(clean.id), {
    opacity: 1, attr: { 'data-zone': clean.zone, 'data-state': clean.state },
  }, {
    opacity: 0, attr: { 'data-zone': 'none', 'data-state': 'hidden' },
    duration: dur.fast, ease: ease.linear,
  })
  tl.fromTo(cardEl(edited.id), {
    opacity: 0, attr: { 'data-zone': edited.zone, 'data-state': edited.state },
  }, {
    opacity: 1, attr: { 'data-zone': edited.zone, 'data-state': edited.state },
    duration: dur.fast, ease: ease.out,
  }, 'edit')
  tl.fromTo('[data-el="zone-working"]', {
    attr: { 'data-zone-state': 'clean' },
  }, {
    attr: { 'data-zone-state': 'modified' }, duration: dur.fast, ease: ease.linear,
  }, 'edit')

  tl.addLabel('add')
  tl.fromTo(cardEl(edited.id), {
    x: 0, y: 0, opacity: 1, attr: { 'data-zone': edited.zone, 'data-state': edited.state },
  }, {
    x: stageOffset.x, y: stageOffset.y, opacity: 0,
    attr: { 'data-zone': 'none', 'data-state': 'hidden' },
    duration: dur.travel, ease: ease.travel, ...later,
  })
  tl.fromTo(cardEl(staged.id), {
    opacity: 0, attr: { 'data-zone': 'none', 'data-state': 'hidden' },
  }, {
    opacity: 1, attr: { 'data-zone': staged.zone, 'data-state': staged.state },
    duration: dur.fast, ease: ease.out,
  }, 'add+=0.9')
  tl.fromTo('[data-el="zone-working"]', {
    attr: { 'data-zone-state': 'modified' },
  }, {
    attr: { 'data-zone-state': 'clean' }, duration: dur.fast, ease: ease.linear, ...later,
  }, 'add')
  tl.fromTo('[data-el="zone-staging"]', {
    attr: { 'data-zone-state': 'empty' },
  }, {
    attr: { 'data-zone-state': 'staged' }, duration: dur.fast, ease: ease.linear,
  }, 'add')

  tl.addLabel('commit')
  tl.fromTo(cardEl(staged.id), {
    x: 0, y: 0, opacity: 1, attr: { 'data-zone': staged.zone, 'data-state': staged.state },
  }, {
    x: commitOffset.x, y: commitOffset.y, opacity: 0,
    attr: { 'data-zone': 'none', 'data-state': 'hidden' },
    duration: dur.travel, ease: ease.travel, ...later,
  })
  tl.fromTo(cardEl(snapshot.id), {
    opacity: 0, scale: 0.72, attr: { 'data-zone': snapshot.zone, 'data-state': snapshot.state },
  }, {
    opacity: 1, scale: 1, attr: { 'data-zone': snapshot.zone, 'data-state': snapshot.state },
    duration: dur.base, ease: ease.out,
  }, 'commit+=0.7')
  tl.fromTo('[data-el="zone-staging"]', {
    attr: { 'data-zone-state': 'staged' },
  }, {
    attr: { 'data-zone-state': 'empty' }, duration: dur.fast, ease: ease.linear, ...later,
  }, 'commit')
  tl.fromTo('[data-el="zone-repository"]', {
    attr: { 'data-zone-state': 'snapshot' },
  }, {
    attr: { 'data-zone-state': recapState.zones.repository.state }, duration: dur.fast, ease: ease.linear,
  }, 'commit')
  revealTerminalPart(tl, '[data-el="terminal-output"]', 'clean', dur.work)
}

export const historyScenes = {
  commit: {
    title: 'git commit', command: 'git commit -m "Add project files"',
    build: buildCommitTimeline, state: commitState,
  },
  log: {
    title: 'git log', command: 'git log --oneline', build: buildLogTimeline, state: logState,
  },
  recap: {
    title: 'สรุป: edit → add → commit', command: recapCommand,
    build: buildRecapTimeline, state: recapState,
  },
} satisfies Record<string, GitFlowSceneDefinition>
