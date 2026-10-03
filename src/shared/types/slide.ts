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
export type WebFlowSceneId = 'client-server' | 'dns' | 'http-200' | 'http-404' | 'build-html' | 'build-css' | 'build-js' | 'mpa' | 'spa' | 'api-db'
export interface WebFlowHttpData {
  method?: string
  path?: string
  status?: number
  host?: string
}
interface WebflowBase {
  type: 'webflow'
  title: string
  sub?: string
  src?: string
}
/** Think scenes reveal answers on demand and cannot carry HTTP data. */
export type WebflowData = WebflowBase & (
  | { scene: Extract<WebFlowSceneId, 'build-html' | 'mpa'>; think: true; http?: never }
  | { scene: WebFlowSceneId; think?: false; http?: WebFlowHttpData }
)

export interface TerminalData { type: 'terminal'; scene: string; command: string; title: string; sub?: string }

/** 1–6 items as a tuple union, not `string[]` — TypeScript bounds the checklist
    (the proof lives in `src/dev/typeBounds.ts`: 7 items and an empty list fail the build). */
export type ChecklistItems =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]

/** Checklist slide: a title plus 1–6 ticked items (bound enforced by `ChecklistItems`). */
export interface ChecklistData { type: 'checklist'; title: string; items: ChecklistItems; sub?: string }

/** 2–4 steps as a tuple union, not `string[]` — TypeScript bounds the flow
    (the proof lives in `src/dev/typeBounds.ts`: 1 step and 5 steps fail the build). */
export type FlowSteps =
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]

/** Flow slide: a title plus 2–4 labelled steps joined by arrows (bound enforced by `FlowSteps`). */
export interface FlowData { type: 'flow'; title: string; steps: FlowSteps; sub?: string }

export type SlideData =
  | CoverData
  | StatData
  | StatementData
  | CompareData
  | GitFlowData
  | LlmFlowData
  | WebflowData
  | TerminalData
  | ChecklistData
  | FlowData

export interface NextChapter { to: string; title: string }
