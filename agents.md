# Project rules

Slide deck about building websites (Thai content). React 19 + Vite + TypeScript, pnpm.

- Architecture, layering and the full rule list: `docs/architecture.md` — read before adding files.
- Content overview (read first, before opening any `slides.ts`): `docs/content-map.md` (purpose per chapter); every slide listed in `docs/content-index.md` (generated — never hand-edit; run `pnpm content:index` after changing `src/content/`, `pnpm content:check` verifies).
- Visual system (tokens, typography, slide patterns): `design.md`. Research behind content/colours: `docs/research.md`.

Hard rules (enforced by `pnpm lint`):

- Files ≤ 300 lines.
- Atomic layers: atoms → molecules → organisms → templates; a layer imports only lower layers.
- `shared/` never imports `content`, `pages`, `app`; only `atoms/AppLink` imports `react-router`.
- `dev/` (route `/dev/*`, DEV builds only) holds dummy-data showcases; add an example there for every new component/slide type. `shared/` never imports it.
- Animation: GSAP + `@gsap/react` (`docs/architecture.md` rules 21–29). Timeline builders in `shared/animation/`, played via `useTimeline`; gsap imports only in hooks/animation/organisms/templates.
- `content/` is plain data (`SlideData[]`), no JSX or components.

Conventions: `@/` alias for cross-folder imports, one component per file with a co-located `.module.css`,  
colours/sizes only via `var(--token)` from `shared/styles/tokens.css`, vertical spacing only via `Stack`.  
Verify with `pnpm lint && pnpm build`.

## Agent skills

### Issue tracker

Issues and specs are local markdown files under `.scratch/<feature>/` (no git remote). See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one root `GLOSSARY.md` plus `docs/adr/`. See `docs/agents/domain.md`.