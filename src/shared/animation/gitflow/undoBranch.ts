import { dur, ease } from '../motion'
import type { GitFlowCard, GitFlowSceneDefinition, GitFlowSceneState, GitFlowZoneId } from './index'

type SceneState = GitFlowSceneState & {
  currentBranch: string
  initial: {
    cards: Record<string, { zone: GitFlowZoneId | 'none'; state: string }>
    zones: Partial<Record<GitFlowZoneId, string>>
    currentBranch: string
  }
}

const later = { immediateRender: false }
const cardEl = (id: string) => `[data-el="card-${id}"]`
const zoneEl = (id: GitFlowZoneId) => `[data-el="zone-${id}"]`

function sceneRootFor(cardId: string) {
  const root = document.querySelector<HTMLElement>(cardEl(cardId))?.closest<HTMLElement>('[data-current-branch]')
  if (!root) throw new Error(`Cannot find GitFlow scene root for ${cardId}`)
  return root
}

function card(state: SceneState, id: string) {
  const result = state.cards.find((item) => item.id === id)
  if (!result) throw new Error(`Missing GitFlow card: ${id}`)
  return result
}

function cardAttrs(item: Pick<GitFlowCard, 'zone' | 'state'> | SceneState['initial']['cards'][string]) {
  return { 'data-zone': item.zone, 'data-state': item.state }
}

function initialCard(state: SceneState, id: string) {
  return state.initial.cards[id] ?? card(state, id)
}

function initialZone(state: SceneState, id: GitFlowZoneId) {
  return state.initial.zones[id] ?? state.zones[id].state
}

function travelOffset(sourceId: string, destinationId: string) {
  const source = document.querySelector<HTMLElement>(cardEl(sourceId))
  const destination = document.querySelector<HTMLElement>(cardEl(destinationId))
  if (!source || !destination) throw new Error(`Cannot find ${sourceId} or ${destinationId}`)
  const from = source.getBoundingClientRect()
  const to = destination.getBoundingClientRect()
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

const restoreDamaged: GitFlowCard = {
  id: 'restore-damaged', name: 'app.js', zone: 'working', state: 'modified', label: 'เสียหาย · แก้ไขแล้ว',
}
const restoreCommit: GitFlowCard = {
  id: 'restore-commit', name: 'a1b2c3d', zone: 'repository', state: 'snapshot', label: 'app.js · เวอร์ชันที่ commit ไว้',
}
const restoreCopy: GitFlowCard = {
  id: 'restore-copy', name: 'app.js', zone: 'working', state: 'clean', label: `กลับเป็นเวอร์ชันใน ${restoreCommit.name}`,
}
const restoreState: SceneState = {
  cards: [restoreDamaged, restoreCommit, restoreCopy],
  zones: {
    working: { state: 'clean', note: 'app.js กลับเป็นเวอร์ชันที่ commit ไว้' },
    staging: { state: 'empty', note: 'ไม่มีไฟล์รอ commit' },
    repository: { state: 'snapshot', note: `commit ${restoreCommit.name} ยังอยู่` },
    remote: { state: 'disconnected', note: 'ที่เก็บบน GitHub' },
  },
  output: `Restored ${restoreCopy.name} from ${restoreCommit.name}\nWorking copy matches the committed version.`,
  caption: `git restore แทนที่ ${restoreDamaged.name} ที่เสียหายด้วยเวอร์ชันจาก commit ${restoreCommit.name}`,
  currentBranch: 'main',
  initial: {
    cards: {
      [restoreDamaged.id]: { zone: 'working', state: 'modified' },
      [restoreCommit.id]: { zone: 'repository', state: 'snapshot' },
      [restoreCopy.id]: { zone: 'none', state: 'hidden' },
    },
    zones: { working: 'modified' },
    currentBranch: 'main',
  },
}

const branchBase: GitFlowCard = {
  id: 'branch-base', name: 'a1b2c3d', zone: 'repository', state: 'snapshot', label: 'commit จุดร่วม',
}
const mainRef: GitFlowCard = {
  id: 'branch-main-ref', name: 'main', zone: 'repository', state: 'branch', label: `ชี้ไปที่ ${branchBase.name}`,
}
const featureRef: GitFlowCard = {
  id: 'branch-feature-ref', name: 'feature', zone: 'repository', state: 'branch', label: `HEAD · แยกจาก ${branchBase.name}`,
}
const branchState: SceneState = {
  cards: [branchBase, mainRef, featureRef],
  zones: {
    working: { state: 'clean', note: 'ยังไม่มีการแก้ไฟล์' },
    staging: { state: 'empty', note: 'ไม่มีไฟล์รอ commit' },
    repository: { state: 'branches', note: 'main และ feature เริ่มจาก commit เดียวกัน' },
    remote: { state: 'disconnected', note: 'ที่เก็บบน GitHub' },
  },
  output: [
    `Created branch ${featureRef.name} at ${branchBase.name}`,
    `Switched to branch '${featureRef.name}'`,
    `* ${branchBase.name} (HEAD -> ${featureRef.name}, ${mainRef.name})`,
    `  ${mainRef.name} and ${featureRef.name} share this commit until new work is committed.`,
  ].join('\n'),
  caption: `สร้าง branch ${featureRef.name} จาก ${mainRef.name} แล้วสลับ current branch ไปที่ ${featureRef.name}`,
  currentBranch: featureRef.name,
  initial: {
    cards: {
      [branchBase.id]: { zone: 'repository', state: 'snapshot' },
      [mainRef.id]: { zone: 'repository', state: 'branch' },
      [featureRef.id]: { zone: 'none', state: 'hidden' },
    },
    zones: { repository: 'linear' },
    currentBranch: mainRef.name,
  },
}

const mergeBase: GitFlowCard = {
  id: 'merge-base', name: 'a1b2c3d', zone: 'repository', state: 'snapshot', label: 'จุดเริ่มร่วม',
}
const mergeMainTip: GitFlowCard = {
  id: 'merge-main-tip', name: 'b7c2e91', zone: 'repository', state: 'snapshot', label: 'main · Update header',
}
const mergeFeatureTip: GitFlowCard = {
  id: 'merge-feature-tip', name: 'f4a9c2e', zone: 'repository', state: 'snapshot', label: 'feature · Add search',
}
const mergeMainBefore: GitFlowCard = {
  id: 'merge-main-before', name: 'main', zone: 'repository', state: 'hidden', label: `ก่อน merge ชี้ไปที่ ${mergeMainTip.name}`,
}
const mergeFeatureRef: GitFlowCard = {
  id: 'merge-feature-ref', name: 'feature', zone: 'repository', state: 'branch', label: `ชี้ไปที่ ${mergeFeatureTip.name}`,
}
const mergeCommit: GitFlowCard = {
  id: 'merge-commit', name: 'c6d8f21', zone: 'repository', state: 'snapshot', label: "Merge branch 'feature'",
}
const mergeMainAfter: GitFlowCard = {
  id: 'merge-main-after', name: 'main', zone: 'repository', state: 'current-branch',
  label: `HEAD · ชี้ไปที่ ${mergeCommit.name}`,
}
const mergeState: SceneState = {
  cards: [mergeBase, mergeMainTip, mergeFeatureTip, mergeMainBefore, mergeFeatureRef, mergeCommit, mergeMainAfter],
  zones: {
    working: { state: 'clean', note: 'ไฟล์จากสองสายพร้อมใช้งาน' },
    staging: { state: 'empty', note: 'ไม่มีไฟล์รอ commit' },
    repository: { state: 'merged', note: `สองสายรวมใน ${mergeCommit.name} บน main` },
    remote: { state: 'disconnected', note: 'ที่เก็บบน GitHub' },
  },
  output: [
    `*   ${mergeCommit.name} (HEAD -> ${mergeMainAfter.name}) ${mergeCommit.label}`,
    `|\\`,
    `| * ${mergeFeatureTip.name} ${mergeFeatureTip.label.split(' · ')[1]}`,
    `* | ${mergeMainTip.name} ${mergeMainTip.label.split(' · ')[1]}`,
    '|/',
    `*   ${mergeBase.name} Start project`,
  ].join('\n'),
  caption: `git merge ${mergeFeatureRef.name} รวม ${mergeFeatureTip.name} และ ${mergeMainTip.name} เป็น ${mergeCommit.name} บน ${mergeMainAfter.name}`,
  currentBranch: mergeMainAfter.name,
  initial: {
    cards: {
      [mergeBase.id]: { zone: 'repository', state: 'snapshot' },
      [mergeMainTip.id]: { zone: 'repository', state: 'snapshot' },
      [mergeFeatureTip.id]: { zone: 'repository', state: 'snapshot' },
      [mergeMainBefore.id]: { zone: 'repository', state: 'branch' },
      [mergeFeatureRef.id]: { zone: 'repository', state: 'branch' },
      [mergeCommit.id]: { zone: 'none', state: 'hidden' },
      [mergeMainAfter.id]: { zone: 'none', state: 'hidden' },
    },
    zones: { repository: 'diverged' },
    currentBranch: mergeMainAfter.name,
  },
}

export function buildRestoreTimeline(tl: gsap.core.Timeline) {
  const offset = travelOffset(restoreCommit.id, restoreCopy.id)
  const root = sceneRootFor(restoreCopy.id)
  revealTerminalPart(tl, '[data-el="terminal-command"]', 'command', dur.base)
  tl.addLabel('branch').fromTo(root, {
    attr: { 'data-current-branch': restoreState.initial.currentBranch },
  }, {
    attr: { 'data-current-branch': restoreState.currentBranch }, duration: dur.fast, ease: ease.linear,
  })
  tl.addLabel('restore')
    .fromTo(cardEl(restoreDamaged.id), {
      x: 0, y: 0, opacity: 1, attr: cardAttrs(initialCard(restoreState, restoreDamaged.id)),
    }, {
      x: 0, y: 0, opacity: 0, attr: { 'data-zone': 'none', 'data-state': 'hidden' },
      duration: dur.fast, ease: ease.linear,
    })
    .fromTo(cardEl(restoreCopy.id), {
      x: offset.x, y: offset.y, opacity: 0, attr: cardAttrs(initialCard(restoreState, restoreCopy.id)),
    }, {
      x: 0, y: 0, opacity: 1, attr: cardAttrs(card(restoreState, restoreCopy.id)),
      duration: dur.travel, ease: ease.travel, ...later,
    }, 'restore')
    .fromTo(zoneEl('working'), {
      attr: { 'data-zone-state': initialZone(restoreState, 'working') },
    }, {
      attr: { 'data-zone-state': restoreState.zones.working.state }, duration: dur.travel, ease: ease.linear,
    }, 'restore')
  revealTerminalPart(tl, '[data-el="terminal-output"]', 'restored', dur.work)
}

export function buildBranchTimeline(tl: gsap.core.Timeline) {
  const root = sceneRootFor(featureRef.id)
  revealTerminalPart(tl, '[data-el="terminal-command"]', 'command', dur.base)
  tl.addLabel('branch').fromTo(cardEl(featureRef.id), {
    opacity: 0, attr: cardAttrs(initialCard(branchState, featureRef.id)),
  }, {
    opacity: 1, attr: cardAttrs(card(branchState, featureRef.id)), duration: dur.fast, ease: ease.out,
  })
  tl.addLabel('switch').fromTo(root, {
    attr: { 'data-current-branch': branchState.initial.currentBranch },
  }, {
    attr: { 'data-current-branch': branchState.currentBranch }, duration: dur.base, ease: ease.travel,
  })
  tl.fromTo(zoneEl('repository'), {
    attr: { 'data-zone-state': initialZone(branchState, 'repository') },
  }, {
    attr: { 'data-zone-state': branchState.zones.repository.state }, duration: dur.fast, ease: ease.linear,
  }, 'branch')
  revealTerminalPart(tl, '[data-el="terminal-output"]', 'switched', dur.work)
}

export function buildMergeTimeline(tl: gsap.core.Timeline) {
  const root = sceneRootFor(mergeCommit.id)
  revealTerminalPart(tl, '[data-el="terminal-command"]', 'command', dur.base)
  tl.addLabel('branch').fromTo(root, {
    attr: { 'data-current-branch': mergeState.initial.currentBranch },
  }, {
    attr: { 'data-current-branch': mergeState.currentBranch }, duration: dur.fast, ease: ease.linear,
  })
  tl.addLabel('merge')
    .fromTo(cardEl(mergeMainBefore.id), {
      opacity: 1, attr: cardAttrs(initialCard(mergeState, mergeMainBefore.id)),
    }, {
      opacity: 0, attr: cardAttrs(card(mergeState, mergeMainBefore.id)), duration: dur.fast, ease: ease.linear,
    })
    .fromTo(cardEl(mergeCommit.id), {
      opacity: 0, scale: 0.72, attr: cardAttrs(initialCard(mergeState, mergeCommit.id)),
    }, {
      opacity: 1, scale: 1, attr: cardAttrs(card(mergeState, mergeCommit.id)), duration: dur.base, ease: ease.out,
    }, 'merge')
    .fromTo(cardEl(mergeMainAfter.id), {
      opacity: 0, attr: cardAttrs(initialCard(mergeState, mergeMainAfter.id)),
    }, {
      opacity: 1, attr: cardAttrs(card(mergeState, mergeMainAfter.id)), duration: dur.fast, ease: ease.out,
    }, `merge+=${dur.fast}`)
    .fromTo(zoneEl('repository'), {
      attr: { 'data-zone-state': initialZone(mergeState, 'repository') },
    }, {
      attr: { 'data-zone-state': mergeState.zones.repository.state }, duration: dur.base, ease: ease.linear,
    }, 'merge')
  revealTerminalPart(tl, '[data-el="terminal-output"]', 'joined', dur.work)
}

export const undoBranchScenes = {
  restore: {
    title: 'git restore', command: 'git restore app.js', build: buildRestoreTimeline, state: restoreState,
  },
  branch: {
    title: 'git branch + switch', command: 'git branch feature\n$ git switch feature',
    build: buildBranchTimeline, state: branchState,
  },
  merge: {
    title: 'git merge', command: 'git merge feature', build: buildMergeTimeline, state: mergeState,
  },
} satisfies Record<string, GitFlowSceneDefinition>
