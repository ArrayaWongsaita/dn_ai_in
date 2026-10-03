import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { fileScenes } from './scenes-files'
import { navigationScenes } from './scenes-navigation'

gsap.registerPlugin(TextPlugin)

export type TerminalNodeState = 'normal' | 'current' | 'new' | 'gone'
export type TerminalNodeKind = 'folder' | 'file'

export interface TerminalNode {
  id: string
  name: string
  kind: TerminalNodeKind
  depth: 0 | 1
  state: TerminalNodeState
}

export interface TerminalSceneState {
  /** Current position at the end frame, always with a trailing space. */
  prompt: string
  output: string
  nodes: TerminalNode[]
}

export interface TerminalSceneDefinition {
  title: string
  command: string
  state: TerminalSceneState
  /** One Thai sentence per timeline label, indexed by `tl.step`. */
  captions: string[]
  build: (tl: gsap.core.Timeline) => void
}

const thaiKind: Record<TerminalNodeKind, string> = { folder: 'โฟลเดอร์', file: 'ไฟล์' }

/** Thai accessible name for a node so state is never carried by colour alone. */
export function nodeLabel(node: Pick<TerminalNode, 'name' | 'kind' | 'state'>): string {
  const kind = thaiKind[node.kind]
  if (node.state === 'current') return `${kind}ปัจจุบัน ${node.name}`
  if (node.state === 'new') return `สร้างใหม่ ${node.name}`
  if (node.state === 'gone') return `ถูกลบ ${node.name}`
  return `${kind} ${node.name}`
}

/** Node attributes tweened together (`state` overrides the node's end frame). */
export function nodeAttrs(node: TerminalNode, state: TerminalNodeState = node.state) {
  return { attr: { 'data-state': state, 'aria-label': nodeLabel({ ...node, state }) } }
}

export function nodeEl(id: string) {
  return `[data-el="tree-${id}"]`
}

/** Every registered scene gets an automatic dev example through this registry. */
export const terminalScenes: Record<string, TerminalSceneDefinition> = {
  ...navigationScenes,
  ...fileScenes,
}
