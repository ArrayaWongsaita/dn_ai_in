import { meta as accessibility } from './chapters/accessibility/meta'
import { meta as color } from './chapters/color/meta'
import { meta as reading } from './chapters/reading/meta'
import { meta as speed } from './chapters/speed/meta'
import { meta as summary } from './chapters/summary/meta'
import type { Chapter } from './types'

// Order = reading order. To add a chapter: create chapters/<slug>/{meta,slides}.ts and register it here.
export const chapters: Chapter[] = [
  { ...reading, load: () => import('./chapters/reading/slides') },
  { ...speed, load: () => import('./chapters/speed/slides') },
  { ...accessibility, load: () => import('./chapters/accessibility/slides') },
  { ...color, load: () => import('./chapters/color/slides') },
  { ...summary, load: () => import('./chapters/summary/slides') },
]

const cache = new Map<string, ReturnType<Chapter['load']>>()

/** Memoised so `use()` gets a stable promise across renders. */
export function loadChapter(c: Chapter) {
  if (!cache.has(c.slug)) cache.set(c.slug, c.load())
  return cache.get(c.slug)!
}
