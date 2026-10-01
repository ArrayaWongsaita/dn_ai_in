import { useEffect, useState, type RefObject } from 'react'

const NEXT = ['ArrowRight', 'ArrowDown', 'PageDown', ' ']
const PREV = ['ArrowLeft', 'ArrowUp', 'PageUp']

const slidesOf = (el: HTMLElement | null) => [...(el?.querySelectorAll<HTMLElement>('[data-slide]') ?? [])]

function scrollToSlide(el: HTMLElement | null, n: number) {
  const all = slidesOf(el)
  all[Math.max(0, Math.min(all.length - 1, n))]?.scrollIntoView()
}

/** Tracks the current [data-slide] inside `root`, syncs `#n`, and handles the keyboard. */
export function useDeckNavigation(root: RefObject<HTMLElement | null>) {
  const [current, setCurrent] = useState(0)

  const goTo = (n: number) => scrollToSlide(root.current, n)

  useEffect(() => {
    const all = slidesOf(root.current)
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const i = all.indexOf(e.target as HTMLElement)
        setCurrent(i)
        history.replaceState(null, '', `#${i + 1}`)
      }
    }, { threshold: 0.6 })
    all.forEach((s) => io.observe(s))

    const start = parseInt(location.hash.slice(1), 10)
    if (start > 1) all[start - 1]?.scrollIntoView({ behavior: 'instant' })
    return () => io.disconnect()
  }, [root])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (NEXT.includes(e.key)) { e.preventDefault(); scrollToSlide(root.current, current + 1) }
      if (PREV.includes(e.key)) { e.preventDefault(); scrollToSlide(root.current, current - 1) }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [current, root])

  return { current, goTo }
}
