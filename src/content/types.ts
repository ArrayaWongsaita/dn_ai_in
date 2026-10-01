import type { SlideData } from '@/shared/types/slide'

export interface ChapterMeta { slug: string; title: string; summary: string }

export interface Chapter extends ChapterMeta {
  /** Lazy so a chapter's slides only load when opened. */
  load: () => Promise<{ default: SlideData[] }>
}
