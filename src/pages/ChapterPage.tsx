import { use } from 'react'
import { Navigate, useParams } from 'react-router'
import { SlideDeck } from '@/shared/components/templates'
import { chapters, loadChapter } from '@/content'

export default function ChapterPage() {
  const { slug } = useParams()
  const i = chapters.findIndex((c) => c.slug === slug)
  if (i < 0) return <Navigate to="/" replace />

  const { default: slides } = use(loadChapter(chapters[i]))
  const n = chapters[i + 1]
  // key: remount (observers, hash sync) when moving to another chapter
  return <SlideDeck key={slug} slides={slides} next={n && { to: `/${n.slug}`, title: n.title }} />
}
