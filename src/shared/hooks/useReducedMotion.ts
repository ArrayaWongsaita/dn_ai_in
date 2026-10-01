import { useSyncExternalStore } from 'react'

const query = '(prefers-reduced-motion: reduce)'

const subscribe = (cb: () => void) => {
  const m = matchMedia(query)
  m.addEventListener('change', cb)
  return () => m.removeEventListener('change', cb)
}

export const useReducedMotion = () =>
  useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false)
