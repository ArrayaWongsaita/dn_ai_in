import { meta as git } from './chapters/git/meta'
import type { Chapter } from './types'

// To add a chapter: create chapters/<slug>/{meta,slides}.ts and register it here.
export const chapters: Chapter[] = [
  { ...git, load: () => import('./chapters/git/slides') },
]

const cache = new Map<string, ReturnType<Chapter['load']>>()

/** Memoised so `use()` gets a stable promise across renders. */
export function loadChapter(c: Chapter) {
  if (!cache.has(c.slug)) cache.set(c.slug, c.load())
  return cache.get(c.slug)!
}
