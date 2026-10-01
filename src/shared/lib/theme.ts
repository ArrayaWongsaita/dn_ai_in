export type Theme = 'light' | 'dark'

const KEY = 'theme'

export function readTheme(): Theme {
  const set = document.documentElement.dataset.theme as Theme | undefined
  return set ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

export function applyStoredTheme() {
  try {
    const t = localStorage.getItem(KEY)
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t
  } catch { /* storage blocked: follow the system */ }
}

export function toggleTheme() {
  const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = next
  try { localStorage.setItem(KEY, next) } catch { /* ignore */ }
}
