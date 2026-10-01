// Generates docs/content-index.md from src/content (single source of truth).
//   pnpm content:index          write the file
//   pnpm content:index --check  exit 1 if the file is stale
// Needs Node ≥ 22.18 (native TypeScript stripping); the content files only use type imports.
import { readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const out = resolve(root, 'docs/content-index.md')
const order = [...readFileSync(resolve(root, 'src/content/index.ts'), 'utf8').matchAll(/import\('\.\/chapters\/([\w-]+)\/slides'\)/g)].map((m) => m[1])
const load = async (slug, file) => (await import(pathToFileURL(resolve(root, `src/content/chapters/${slug}/${file}.ts`)))).default ?? {}

const show = {
  cover: (d) => `**ปก** ${d.title}${d.sub ? ` — ${d.sub}` : ''}`,
  stat: (d) => `**ตัวเลข** ${d.prefix ?? ''}${d.value}${d.suffix ?? ''} — ${d.label}${d.src ? ` _(${d.src})_` : ''}`,
  statement: (d) => `**ข้อความ** ${d.title}${d.sub ? ` — ${d.sub}` : ''}${d.src ? ` _(${d.src})_` : ''}`,
  compare: (d) => `**เทียบ** ${d.title}: ${d.items.map((i) => `${i.text}${i.note ? ` (${i.note})` : ''}`).join(' ⇄ ')}${d.sub ? ` — ${d.sub}` : ''}`,
}

const lines = [
  '# Content index',
  '',
  `รวม ${order.length} บท · TOTAL สไลด์`,
  '',
  '> สร้างอัตโนมัติจาก `src/content/` ด้วย `pnpm content:index` — **ห้ามแก้ด้วยมือ** (ภาพรวมเชิงเล่าเรื่องอยู่ใน `docs/content-map.md`)',
  '',
]
let total = 0
for (const [i, slug] of order.entries()) {
  const { meta } = await import(pathToFileURL(resolve(root, `src/content/chapters/${slug}/meta.ts`)))
  const slides = await load(slug, 'slides')
  total += slides.length
  lines.push(`## ${i + 1}. ${meta.title} — \`/${slug}\``, '', `${meta.summary} · ${slides.length} สไลด์ · \`src/content/chapters/${slug}/slides.ts\``, '')
  slides.forEach((d, n) => lines.push(`${n + 1}. ${(show[d.type] ?? (() => `**${d.type}**`))(d)}`))
  lines.push('')
}
const text = lines.join('\n').replace('TOTAL', total).replace(/\n+$/, '\n')

if (process.argv.includes('--check')) {
  let cur = ''
  try { cur = readFileSync(out, 'utf8') } catch { /* missing */ }
  if (cur !== text) { console.error('docs/content-index.md is stale — run: pnpm content:index'); process.exit(1) }
} else {
  writeFileSync(out, text)
  console.log(`wrote docs/content-index.md (${order.length} chapters, ${total} slides)`)
}
