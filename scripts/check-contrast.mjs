// WCAG contrast check for the design tokens. tokens.css defines colours but no pairs,
// so the pair table lives here — a ticket that adds a colour pair must add its row here.
//   pnpm contrast:check                        check src/shared/styles/tokens.css
//   pnpm contrast:check -- --file <file.css>   check another token file (see scripts/fixtures/)
// Text needs ≥4.5:1 and UI elements ≥3:1 in every theme; only the decorative border
// colour (--line) is exempt. Tints are color-mix(in srgb, <tone> var(--tint-pct), var(--bg)).
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const exit = (message) => { console.error(`contrast:check: ${message}`); process.exit(1) }

// Options are found by flag NAME anywhere in argv, never by position (pnpm forwards a literal `--`).
const argv = process.argv.slice(2)
const flag = (name) => {
  const at = argv.indexOf(name)
  const value = at === -1 ? argv.find((a) => a.startsWith(`${name}=`))?.slice(name.length + 1) : argv[at + 1]
  return value === undefined || value.startsWith('--') ? undefined : value
}
const fileArg = flag('--file')
if (argv.includes('--file') && fileArg === undefined) exit('--file needs a path')
const file = fileArg ? resolve(fileArg) : resolve(import.meta.dirname, '..', 'src/shared/styles/tokens.css')

const css = readFileSync(file, 'utf8').replace(/\/\*[^]*?\*\//g, ' ')
// Body of the first block whose selector matches, found by counting braces.
const bodyOf = (source, selector) => {
  const at = source.search(selector)
  if (at === -1) return null
  const open = source.indexOf('{', at)
  for (let i = open + 1, depth = 1; i < source.length; i++) {
    if (source[i] === '{') depth++
    else if (source[i] === '}' && --depth === 0) return source.slice(open + 1, i)
  }
  return null
}
const tokensOf = (body) => Object.fromEntries((body?.match(/--[\w-]+\s*:[^;{}]*/g) ?? []).map((d) => {
  const split = d.indexOf(':')
  return [d.slice(0, split).trim(), d.slice(split + 1).trim()]
}))

const mediaBody = bodyOf(css, /@media[^{]*prefers-color-scheme\s*:\s*dark[^{]*\{/)
const blocks = [
  ['light', ':root', bodyOf(css, /:root\s*\{/)],
  ['dark (system)', ':root:not([data-theme="light"]) in @media (prefers-color-scheme: dark)',
    bodyOf(mediaBody ?? '', /:root:not\([^)]*\)\s*\{/)],
  ['dark (forced)', ':root[data-theme="dark"]', bodyOf(css, /:root\[data-theme=["']?dark["']?\]\s*\{/)],
]
const missing = blocks.filter(([, , body]) => body === null).map(([, label]) => label)
if (missing.length) exit(`${file} is missing theme block(s): ${missing.join(' · ')}`)
// A theme resolves like the cascade: :root values, overlaid with that theme's overrides.
const [lightValues, sysValues, forcedValues] = blocks.map(([, , body]) => tokensOf(body))
const themes = [
  { label: blocks[0][0], selector: blocks[0][1], values: lightValues },
  { label: blocks[1][0], selector: blocks[1][1], values: { ...lightValues, ...sysValues } },
  { label: blocks[2][0], selector: blocks[2][1], values: { ...lightValues, ...forcedValues } },
]

const color = (value, token, theme) => {
  const m = /^#([\da-f]+)$/i.exec(value)
  const len = m?.[1].length
  if (![3, 4, 6, 8].includes(len)) exit(`${theme}: token ${token} is not a hex colour (${value})`)
  const h = len < 6 ? [...m[1]].map((c) => c + c).join('') : m[1]
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: len === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 }
}
const value = (theme, token) => theme.values[token] ?? exit(`${theme.label}: no value for ${token}`)
const colorOf = (theme, token) => color(value(theme, token), token, theme.label)
const tintPct = (theme) => {
  const raw = value(theme, '--tint-pct')
  const m = /^([\d.]+)%$/.exec(raw)
  if (!m) exit(`${theme.label}: --tint-pct must be a percentage (got ${raw})`)
  return parseFloat(m[1])
}
const mix = (a, b, pct) => { const wa = pct / 100, wb = 1 - wa; return { r: a.r * wa + b.r * wb, g: a.g * wa + b.g * wb, b: a.b * wa + b.b * wb, a: a.a * wa + b.a * wb } }
// Semi-transparent tokens (e.g. --line) read as their composite over the background.
const over = (fg, bg) => fg.a >= 1 ? fg : { r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 }
const luminance = ({ r, g, b }) => { const f = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4 }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b) }
const ratio = (fg, bg) => {
  const lf = luminance(over(fg, bg)), lb = luminance(bg)
  return (Math.max(lf, lb) + 0.05) / (Math.min(lf, lb) + 0.05)
}

const NEED = { text: 4.5, ui: 3 }
const tint = (token) => ({ token })
// Ticket adding a colour pair: add its row here (spec § Implementation Decisions).
const pairs = [
  { use: 'body text on page', fg: '--fg', bg: '--bg', as: 'text' },
  { use: 'secondary text on page', fg: '--muted', bg: '--bg', as: 'text' },
  { use: 'card/callout/cover body text', fg: '--fg', bg: '--surface', as: 'text' },
  { use: 'card/callout secondary text', fg: '--muted', bg: '--surface', as: 'text' },
  { use: 'success text on cards', fg: '--success', bg: '--surface', as: 'text' },
  { use: 'danger text on cards', fg: '--danger', bg: '--surface', as: 'text' },
  { use: 'Badge new — success on its tint', fg: '--success', bg: tint('--success'), as: 'text' },
  { use: 'Badge hot — danger on its tint', fg: '--danger', bg: tint('--danger'), as: 'text' },
  { use: 'Badge accent — accent on its tint', fg: '--accent', bg: tint('--accent'), as: 'text' },
  { use: 'primary button label', fg: '--bg', bg: '--accent', as: 'text' },
  { use: 'code text / Terminal command', fg: '--code-fg', bg: '--code-bg', as: 'text' },
  { use: 'code muted / CodeBlock language label', fg: '--code-muted', bg: '--code-bg', as: 'text' },
  { use: 'code accent text', fg: '--code-accent', bg: '--code-bg', as: 'text' },
  { use: 'Callout concept icon + border', fg: '--accent', bg: '--surface', as: 'ui' },
  { use: 'Callout remember icon + border', fg: '--success', bg: '--surface', as: 'ui' },
  { use: 'Callout warning icon + border', fg: '--danger', bg: '--surface', as: 'ui' },
  { use: 'Flow arrow / Cover bar on page', fg: '--accent-2', bg: '--bg', as: 'ui' },
  { use: 'Flow arrow / Cover bar on cards', fg: '--accent-2', bg: '--surface', as: 'ui' },
  { use: 'decorative border on page', fg: '--line', bg: '--bg', as: 'exempt' },
  { use: 'decorative border on cards', fg: '--line', bg: '--surface', as: 'exempt' },
]
const bgLabel = (bg) => typeof bg === 'string' ? bg : `tint(${bg.token})`
const bgOf = (theme, bg) => typeof bg === 'string' ? colorOf(theme, bg) : mix(colorOf(theme, bg.token), colorOf(theme, '--bg'), tintPct(theme))

console.log(`checking ${file} — tint: color-mix(in srgb, <tone> var(--tint-pct), var(--bg))`)
const width = Math.max(...pairs.map((p) => `${p.use}  ${p.fg} on ${bgLabel(p.bg)}`.length))
const failures = []
let pass = 0, fail = 0, exempt = 0
for (const theme of themes) {
  console.log(`\n${theme.label} — ${theme.selector}`)
  for (const p of pairs) {
    const pair = `${p.use}  ${p.fg} on ${bgLabel(p.bg)}`.padEnd(width)
    if (p.as === 'exempt') { exempt++; console.log(`  ${pair}    —     exempt (decorative border)`); continue }
    const r = ratio(colorOf(theme, p.fg), bgOf(theme, p.bg)).toFixed(2)
    const need = NEED[p.as]
    const ok = Number(r) >= need
    if (ok) pass++; else { fail++; failures.push(`FAIL ${theme.label} — ${p.use}: ${p.fg} on ${bgLabel(p.bg)} ${r}:1 (needs ≥${need}:1, used as ${p.as})`) }
    console.log(`  ${pair}  ${r.padStart(5)}:1  ≥${need}  ${ok ? 'pass' : 'FAIL'}`)
  }
}
console.log('')
for (const f of failures) console.log(f)
console.log(`contrast: ${pass} pass · ${fail} fail · ${exempt} exempt — text ≥4.5:1, UI ≥3:1, --line exempt`)
if (fail) process.exit(1)
