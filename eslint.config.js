import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// Layering rules — see docs/architecture.md.
// Flat config: the LAST matching block wins for a rule, so each block below lists ALL patterns for its files.
const ban = (name, message) => ({ group: [`**/${name}`, `**/${name}/**`], message })
const rule = (patterns) => ({ 'no-restricted-imports': ['error', { patterns }] })
const C = 'src/shared/components'

const notShared = ['content', 'pages', 'app', 'dev'].map((d) => ban(d, 'shared/ must not import content, pages, app or dev'))
const router = { group: ['react-router'], message: 'use AppLink (atoms) instead of importing react-router in shared/' }
const gsapBan = { group: ['gsap', 'gsap/*', '@gsap/*'], message: 'gsap is allowed only in shared/hooks, shared/animation and organisms/templates' }
const above = (...layers) => layers.map((l) => ban(l, `this layer must not import ${l}`))

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Keep every file small enough to read at a glance.
      'max-lines': ['error', { max: 300 }],
    },
  },

  // shared/ knows nothing about the app or its content, and only AppLink touches the router.
  { files: ['src/shared/**'], rules: rule([...notShared, router]) },
  // Atomic layers: a layer may only import layers below it.
  { files: [`${C}/atoms/**`], rules: rule([...notShared, router, gsapBan, ...above('molecules', 'organisms', 'templates')]) },
  { files: [`${C}/atoms/AppLink.tsx`], rules: rule([...notShared, gsapBan, ...above('molecules', 'organisms', 'templates')]) },
  { files: [`${C}/molecules/**`], rules: rule([...notShared, router, gsapBan, ...above('organisms', 'templates')]) },
  { files: [`${C}/organisms/**`], rules: rule([...notShared, router, ...above('templates')]) },
  // Content is plain data: types only.
  {
    files: ['src/content/**'],
    rules: rule(['pages', 'app', 'dev', 'atoms', 'molecules', 'organisms', 'templates'].map((d) => ban(d, 'content is data — import types from @/shared/types only'))),
  },
])
