import { dur, ease } from '../motion'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import type { GitFlowCard, GitFlowSceneDefinition, GitFlowSceneState, GitFlowZoneId } from './index'

gsap.registerPlugin(TextPlugin)

type RemoteState = GitFlowSceneState & {
  connectionName: string
  initial: {
    cards: Record<string, { zone: GitFlowZoneId | 'none'; state: string }>
    zones: Partial<Record<GitFlowZoneId, string>>
    connectionName: string
  }
}

const remoteUrl = 'https://github.com/example/site.git'
const origin = 'origin'
const lineEl = '[data-el="internet-line"]'
const lineLabelEl = `${lineEl} span:last-child`
const cardEl = (id: string) => `[data-el="card-${id}"]`
const zoneEl = (id: GitFlowZoneId) => `[data-el="zone-${id}"]`
const cardAttrs = (card: { zone: GitFlowZoneId | 'none'; state: string }) => ({
  'data-zone': card.zone, 'data-state': card.state,
})

function getCard(state: RemoteState, id: string) {
  const card = state.cards.find((item) => item.id === id)
  if (!card) throw new Error(`Missing GitFlow card: ${id}`)
  return card
}

function initialCard(state: RemoteState, id: string) {
  return state.initial.cards[id] ?? getCard(state, id)
}

function travelOffset(sourceId: string, targetId: string) {
  const source = document.querySelector<HTMLElement>(cardEl(sourceId))
  const target = document.querySelector<HTMLElement>(cardEl(targetId))
  if (!source || !target) throw new Error(`Cannot find GitFlow travel cards: ${sourceId} → ${targetId}`)
  const from = source.getBoundingClientRect()
  const to = target.getBoundingClientRect()
  return { x: from.left - to.left, y: from.top - to.top }
}

function revealTerminalPart(tl: gsap.core.Timeline, element: string, label: string, duration: number) {
  tl.addLabel(label).fromTo(element, {
    clipPath: 'inset(0 100% 0 0)', attr: { 'data-revealed-fraction': 0 },
  }, {
    clipPath: 'inset(0 0% 0 0)', attr: { 'data-revealed-fraction': 1 },
    duration, ease: ease.linear,
  })
}

function revealCommand(tl: gsap.core.Timeline) {
  revealTerminalPart(tl, '[data-el="terminal-command"]', 'command', dur.base)
}

function labelOrigin(tl: gsap.core.Timeline, state: RemoteState) {
  const label = `อินเทอร์เน็ต · ${state.connectionName}`
  tl.addLabel('origin').fromTo(lineEl, {
    opacity: 1, attr: { 'data-connection-name': state.connectionName, 'aria-label': label },
  }, {
    opacity: 1, attr: { 'data-connection-name': state.connectionName, 'aria-label': label }, duration: 0,
  })
  tl.fromTo(lineLabelEl, { text: label }, { text: label, duration: 0 }, 'origin')
}

function transitionZone(tl: gsap.core.Timeline, state: RemoteState, id: GitFlowZoneId, label: string, appears = false) {
  tl.addLabel(label).fromTo(zoneEl(id), {
    opacity: appears ? 0 : 1,
    attr: { 'data-zone-state': state.initial.zones[id] ?? state.zones[id].state },
  }, {
    opacity: 1, attr: { 'data-zone-state': state.zones[id].state }, duration: dur.base, ease: ease.out,
  })
}

function moveCard(tl: gsap.core.Timeline, state: RemoteState, sourceId: string, targetId: string, label: string) {
  const target = getCard(state, targetId)
  const before = initialCard(state, targetId)
  const offset = travelOffset(sourceId, targetId)
  tl.fromTo(cardEl(targetId), {
    x: offset.x, y: offset.y, opacity: before.zone === 'none' ? 0 : 1, attr: cardAttrs(before),
  }, {
    x: 0, y: 0, opacity: 1, attr: cardAttrs(target), duration: dur.travel, ease: ease.travel,
  }, label)
}

function sourceFor(state: RemoteState, target: GitFlowCard, zone: GitFlowZoneId) {
  const source = state.cards.find((card) => card.id !== target.id && card.zone === zone && card.name === target.name)
  if (!source) throw new Error(`Cannot find ${zone} source for ${target.name}`)
  return source
}

const originCard: GitFlowCard = {
  id: 'remote-origin', name: origin, zone: 'remote', state: 'remote', label: remoteUrl,
}
const localCommit: GitFlowCard = {
  id: 'remote-local-commit', name: 'a1b2c3d', zone: 'repository', state: 'snapshot', label: 'Create project structure',
}
const remoteState: RemoteState = {
  connectionName: origin,
  cards: [localCommit, originCard],
  zones: {
    working: { state: 'clean', note: 'ไฟล์และ commit อยู่ในเครื่อง' },
    staging: { state: 'empty', note: 'ไม่มีไฟล์รอ commit' },
    repository: { state: 'history', note: 'มี commit ในเครื่อง' },
    remote: { state: 'connected', note: `${origin} · ${remoteUrl}` },
  },
  output: `origin  ${originCard.label} (fetch)\norigin  ${originCard.label} (push)`,
  caption: `git remote add เชื่อม repository กับ GitHub ด้วยเส้นอินเทอร์เน็ตที่มีชื่อ ${origin}`,
  initial: {
    cards: { [originCard.id]: { zone: 'remote', state: 'hidden' } },
    zones: { remote: 'disconnected' }, connectionName: '',
  },
}

export function buildRemoteTimeline(tl: gsap.core.Timeline) {
  revealCommand(tl)
  const label = `อินเทอร์เน็ต · ${remoteState.connectionName}`
  tl.addLabel('connect').fromTo(lineEl, {
    opacity: 0, attr: { 'data-connection-name': remoteState.initial.connectionName, 'aria-label': 'อินเทอร์เน็ต' },
  }, {
    opacity: 1, attr: { 'data-connection-name': remoteState.connectionName, 'aria-label': label },
    duration: dur.base, ease: ease.out,
  })
  tl.fromTo(lineLabelEl, { text: 'อินเทอร์เน็ต' }, {
    text: label, duration: dur.base, ease: ease.linear,
  }, 'connect')
  transitionZone(tl, remoteState, 'remote', 'remote', true)
  tl.fromTo(cardEl(originCard.id), {
    opacity: 0, attr: cardAttrs(initialCard(remoteState, originCard.id)),
  }, {
    opacity: 1, attr: cardAttrs(originCard), duration: dur.fast, ease: ease.out,
  }, 'remote')
  revealTerminalPart(tl, '[data-el="terminal-output"]', 'connected', dur.work)
}

const pushLocal = [
  { id: 'push-local-b7c2e91', name: 'b7c2e91', zone: 'repository', state: 'snapshot', label: 'Add project files' },
  { id: 'push-local-e5f8a12', name: 'e5f8a12', zone: 'repository', state: 'snapshot', label: 'Update header' },
] satisfies GitFlowCard[]
const pushRemote = pushLocal.map((card) => ({
  ...card, id: card.id.replace('local', 'remote'), zone: 'remote', state: 'snapshot',
})) satisfies GitFlowCard[]
const pushState: RemoteState = {
  connectionName: origin,
  cards: [...pushLocal, ...pushRemote],
  zones: {
    working: { state: 'clean', note: 'working tree สะอาด' },
    staging: { state: 'empty', note: 'ไม่มีไฟล์รอ commit' },
    repository: { state: 'history', note: `${pushLocal.length} commit ใน main` },
    remote: { state: 'history', note: `${origin} · รับ commit จาก main` },
  },
  output: pushRemote.map((card) => `${card.name} ${card.label}`).join('\n') + `\n${pushRemote.length} commits pushed to ${origin}`,
  caption: `git push ส่ง ${pushRemote.length} commit จาก repository ไปที่ ${origin} โดยเก็บ snapshot ในเครื่องไว้`,
  initial: {
    cards: Object.fromEntries(pushRemote.map((card) => [card.id, { zone: 'repository', state: 'ahead' }])),
    zones: { remote: 'empty' }, connectionName: origin,
  },
}

export function buildPushTimeline(tl: gsap.core.Timeline) {
  revealCommand(tl)
  labelOrigin(tl, pushState)
  tl.addLabel('push')
  pushRemote.forEach((target) => {
    const source = sourceFor(pushState, target, 'repository')
    moveCard(tl, pushState, source.id, target.id, 'push')
  })
  transitionZone(tl, pushState, 'remote', 'push')
  revealTerminalPart(tl, '[data-el="terminal-output"]', 'sent', dur.work)
}

const cloneOrigin: GitFlowCard[] = [
  { id: 'clone-origin-files', name: 'b7c2e91', zone: 'remote', state: 'snapshot', label: 'Add project files' },
  { id: 'clone-origin-update', name: 'e5f8a12', zone: 'remote', state: 'snapshot', label: 'Update header' },
  { id: 'clone-origin-index', name: 'index.html', zone: 'remote', state: 'file', label: 'ไฟล์ใน origin' },
  { id: 'clone-origin-style', name: 'style.css', zone: 'remote', state: 'file', label: 'ไฟล์ใน origin' },
  { id: 'clone-origin-app', name: 'app.js', zone: 'remote', state: 'file', label: 'ไฟล์ใน origin' },
]
const cloneCopies: GitFlowCard[] = [
  { id: 'clone-local-files', name: 'b7c2e91', zone: 'repository', state: 'snapshot', label: 'Add project files' },
  { id: 'clone-local-update', name: 'e5f8a12', zone: 'repository', state: 'snapshot', label: 'Update header' },
  { id: 'clone-work-index', name: 'index.html', zone: 'working', state: 'clean', label: 'copied from origin' },
  { id: 'clone-work-style', name: 'style.css', zone: 'working', state: 'clean', label: 'copied from origin' },
  { id: 'clone-work-app', name: 'app.js', zone: 'working', state: 'clean', label: 'copied from origin' },
]
const clonedCommits = cloneCopies.filter((card) => card.state === 'snapshot')
const clonedFiles = cloneCopies.filter((card) => card.zone === 'working')
const cloneState: RemoteState = {
  connectionName: origin,
  cards: [...cloneOrigin, ...cloneCopies],
  zones: {
    working: { state: 'files', note: `${clonedFiles.length} ไฟล์ที่ clone มา` },
    staging: { state: 'empty', note: 'ไม่มีไฟล์รอ commit' },
    repository: { state: 'history', note: `ได้ ${clonedCommits.length} commits` },
    remote: { state: 'history', note: `${origin} · repository ต้นทาง` },
  },
  output: [
    `Cloning ${remoteUrl}`,
    ...clonedCommits.map((card) => `${card.name} ${card.label}`),
    `${clonedFiles.length} files checked out`,
  ].join('\n'),
  caption: `git clone คัดลอก ${clonedCommits.length} commits จาก ${origin} ลง repository และนำไฟล์ทั้งสามมาไว้ในโฟลเดอร์ทำงาน`,
  initial: {
    cards: Object.fromEntries(cloneCopies.map((card) => [card.id, { zone: 'none', state: 'hidden' }])),
    zones: { working: 'empty', repository: 'empty' }, connectionName: origin,
  },
}

export function buildCloneTimeline(tl: gsap.core.Timeline) {
  revealCommand(tl)
  labelOrigin(tl, cloneState)
  tl.addLabel('clone')
  cloneCopies.forEach((target) => {
    const source = sourceFor(cloneState, target, 'remote')
    moveCard(tl, cloneState, source.id, target.id, 'clone')
  })
  transitionZone(tl, cloneState, 'repository', 'clone')
  transitionZone(tl, cloneState, 'working', 'clone')
  revealTerminalPart(tl, '[data-el="terminal-output"]', 'copied', dur.work)
}

const pullBase: GitFlowCard = {
  id: 'pull-base', name: 'b7c2e91', zone: 'repository', state: 'snapshot', label: 'Add project files',
}
const pullOriginCommit: GitFlowCard = {
  id: 'pull-origin-commit', name: 'e5f8a12', zone: 'remote', state: 'snapshot', label: 'Update header',
}
const pullLocalCommit: GitFlowCard = {
  id: 'pull-local-commit', name: pullOriginCommit.name, zone: 'repository', state: 'snapshot', label: pullOriginCommit.label,
}
const pullOriginFile: GitFlowCard = {
  id: 'pull-origin-file', name: 'index.html', zone: 'remote', state: 'file', label: 'เวอร์ชันล่าสุดใน origin',
}
const pullUpdatedFile: GitFlowCard = {
  id: 'pull-updated-file', name: pullOriginFile.name, zone: 'working', state: 'clean', label: `อัปเดตจาก ${pullOriginCommit.name}`,
}
const pullOldFile: GitFlowCard = {
  id: 'pull-old-file', name: pullOriginFile.name, zone: 'working', state: 'hidden', label: `เวอร์ชันก่อน ${pullOriginCommit.name}`,
}
const pullState: RemoteState = {
  connectionName: origin,
  cards: [pullBase, pullOriginCommit, pullLocalCommit, pullOriginFile, pullUpdatedFile, pullOldFile],
  zones: {
    working: { state: 'clean', note: `${pullUpdatedFile.name} อัปเดตจาก ${origin}` },
    staging: { state: 'empty', note: 'ไม่มีไฟล์รอ commit' },
    repository: { state: 'history', note: `ได้ commit ${pullLocalCommit.name}` },
    remote: { state: 'history', note: `${origin} · มี commit ใหม่` },
  },
  output: [
    `Updating ${pullBase.name}..${pullLocalCommit.name}`,
    'Fast-forward',
    ` ${pullUpdatedFile.name} | 1 +1`,
    '1 file changed',
  ].join('\n'),
  caption: `git pull นำ commit ${pullLocalCommit.name} จาก ${origin} เข้า repository และอัปเดต ${pullUpdatedFile.name}`,
  initial: {
    cards: {
      [pullLocalCommit.id]: { zone: 'none', state: 'hidden' },
      [pullUpdatedFile.id]: { zone: 'none', state: 'hidden' },
      [pullOldFile.id]: { zone: 'working', state: 'modified' },
    },
    zones: { working: 'modified', repository: 'behind' }, connectionName: origin,
  },
}

export function buildPullTimeline(tl: gsap.core.Timeline) {
  revealCommand(tl)
  labelOrigin(tl, pullState)
  tl.addLabel('pull')
  const incomingCommit = sourceFor(pullState, pullLocalCommit, 'remote')
  const incomingFile = sourceFor(pullState, pullUpdatedFile, 'remote')
  moveCard(tl, pullState, incomingCommit.id, pullLocalCommit.id, 'pull')
  moveCard(tl, pullState, incomingFile.id, pullUpdatedFile.id, 'pull')
  tl.fromTo(cardEl(pullOldFile.id), {
    opacity: 1, attr: cardAttrs(initialCard(pullState, pullOldFile.id)),
  }, {
    opacity: 0, attr: cardAttrs(pullOldFile), duration: dur.fast, ease: ease.linear,
  }, 'pull')
  transitionZone(tl, pullState, 'repository', 'pull')
  transitionZone(tl, pullState, 'working', 'pull')
  revealTerminalPart(tl, '[data-el="terminal-output"]', 'updated', dur.work)
}

export const remoteScenes = {
  remote: { title: 'git remote add', command: `git remote add ${origin} ${remoteUrl}`, build: buildRemoteTimeline, state: remoteState },
  push: { title: 'git push', command: 'git push origin main', build: buildPushTimeline, state: pushState },
  clone: { title: 'git clone', command: `git clone ${remoteUrl}`, build: buildCloneTimeline, state: cloneState },
  pull: { title: 'git pull', command: 'git pull origin main', build: buildPullTimeline, state: pullState },
} satisfies Record<string, GitFlowSceneDefinition>
