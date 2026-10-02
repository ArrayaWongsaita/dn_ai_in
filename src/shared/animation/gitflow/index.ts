import { basicsScenes } from './basics'
import { historyScenes } from './history'
import { remoteScenes } from './remote'
import { undoBranchScenes } from './undoBranch'

export type GitFlowZoneId = 'working' | 'staging' | 'repository' | 'remote'

export interface GitFlowCard {
  id: string
  name: string
  zone: GitFlowZoneId
  state: string
  label: string
}

export interface GitFlowSceneState {
  cards: GitFlowCard[]
  zones: Record<GitFlowZoneId, { state: string; note: string }>
  output: string
  caption: string
}

export interface GitFlowSceneDefinition {
  title: string
  command: string
  state: GitFlowSceneState
  build: (tl: gsap.core.Timeline) => void
}

/** Every registered scene gets an automatic dev example through this registry. */
export const gitFlowSceneGroups = {
  basics: basicsScenes,
  history: historyScenes,
  undoBranch: undoBranchScenes,
  remote: remoteScenes,
}

export const gitFlowScenes: Record<string, GitFlowSceneDefinition> = Object.assign(
  {}, basicsScenes, historyScenes, undoBranchScenes, remoteScenes,
)

export type GitFlowSceneId = string
