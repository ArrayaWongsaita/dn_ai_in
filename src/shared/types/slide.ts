/** Slide data model. Add a new slide type here, then a template + a SlideRenderer case. */
export interface CoverData { type: 'cover'; kicker?: string; title: string; sub?: string }

export interface StatData {
  type: 'stat'
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  src?: string
}

export interface StatementData { type: 'statement'; title: string; sub?: string; src?: string }

export interface CompareItem { text: string; note?: string; fg: string; bg: string }
export interface CompareData { type: 'compare'; title: string; items: CompareItem[]; sub?: string; src?: string }

export interface GitFlowData { type: 'gitflow'; scene: string; command: string; title: string; sub?: string }

/** Scenes of the llmflow diagram; the registry must register each one. */
export type LlmFlowSceneId = 'overview' | 'tokenize' | 'predict' | 'loop' | 'context' | 'wrong'

export interface LlmFlowData { type: 'llmflow'; scene: LlmFlowSceneId; title: string; sub?: string }

/** HTTP scenes share the existing request/response diagram. */
export type WebFlowSceneId = 'http-200' | 'http-404'
export interface WebFlowHttpData {
  method?: string
  path?: string
  status?: number
  host?: string
}
export interface WebflowData {
  type: 'webflow'
  scene: WebFlowSceneId
  title: string
  sub?: string
  http?: WebFlowHttpData
}

export interface TerminalData { type: 'terminal'; scene: string; command: string; title: string; sub?: string }

export type SlideData =
  | CoverData
  | StatData
  | StatementData
  | CompareData
  | GitFlowData
  | LlmFlowData
  | WebflowData
  | TerminalData

export interface NextChapter { to: string; title: string }
