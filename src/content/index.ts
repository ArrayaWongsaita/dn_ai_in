import { meta as git } from './chapters/git/meta'
import { meta as llmBasics } from './chapters/llm-basics/meta'
import { meta as terminal } from './chapters/terminal/meta'
import type { Chapter } from './types'

// To add a chapter: create chapters/<slug>/{meta,slides}.ts and register it here.
export const chapters: Chapter[] = [
  { ...terminal, load: () => import('./chapters/terminal/slides') },
  { ...git, load: () => import('./chapters/git/slides') },
  { ...llmBasics, load: () => import('./chapters/llm-basics/slides') },
]

const cache = new Map<string, ReturnType<Chapter['load']>>()

/** Memoised so `use()` gets a stable promise across renders. */
export function loadChapter(c: Chapter) {
  if (!cache.has(c.slug)) cache.set(c.slug, c.load())
  return cache.get(c.slug)!
}
