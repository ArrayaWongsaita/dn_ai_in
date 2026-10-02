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

export type SlideData = CoverData | StatData | StatementData | CompareData | GitFlowData

export interface NextChapter { to: string; title: string }
