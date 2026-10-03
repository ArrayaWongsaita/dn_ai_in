# Architecture & Rules

โปรเจกต์ slide ที่เนื้อหาเป็น **ข้อมูล** (array of object) และ UI ประกอบจาก component เล็กๆ ตาม **Atomic Design**
กฎข้อที่ตรวจด้วย ESLint (`pnpm lint`) ระบุไว้ท้ายแต่ละข้อว่า 🔒

## 1. โครงสร้างโฟลเดอร์

```
src/
├─ main.tsx                    entry: โหลด styles, ธีม, router
├─ app/App.tsx                 routes
├─ pages/                      หน้าที่ผูกกับ route (บางมาก: ดึงข้อมูล + ประกอบ template)
│   ├─ Home.tsx                สารบัญ  /
│   └─ ChapterPage.tsx         บทเนื้อหา  /:slug
├─ dev/                        หน้า /dev (dev เท่านั้น — ไม่เข้า production build)
│   ├─ DevRoutes.tsx           /dev/*   (DevIndex, DevSlides, DevComponents)
│   ├─ sample-slides.ts        ข้อมูลสมมติครอบคลุมทุกชนิดสไลด์
│   └─ *Section.tsx            แกลเลอรี่ tokens / atoms / molecules
├─ content/                    ★ เนื้อหาทั้งหมด (ข้อมูลล้วน ไม่มี JSX)
│   ├─ index.ts                ทะเบียนบท + loader
│   ├─ types.ts                Chapter / ChapterMeta
│   └─ chapters/<slug>/
│       ├─ meta.ts             ชื่อ, สรุปสั้น (ใช้ในสารบัญ)
│       └─ slides.ts           SlideData[]  (lazy-load)
└─ shared/                     ★ ทุกอย่างที่ reuse ได้ ไม่รู้จักเนื้อหา
    ├─ components/
    │   ├─ atoms/              หน่วยเล็กสุด
    │   ├─ molecules/          atoms หลายตัวรวมกันเป็นหน้าที่เดียว
    │   ├─ organisms/          ส่วนที่มีพฤติกรรม/โครงสร้างของหน้า
    │   └─ templates/          SlideData → หน้าตาสไลด์ + SlideRenderer + SlideDeck
    ├─ animation/              timeline builder ของ GSAP (ฟังก์ชันล้วน) + motion.ts (duration/ease)
    ├─ hooks/                  logic ที่ไม่มี UI (รวม useTimeline)
    ├─ lib/                    ฟังก์ชันล้วน (cx, theme)
    ├─ styles/                 tokens.css (ค่าดีไซน์), base.css
    └─ types/slide.ts          โมเดลข้อมูลสไลด์ (SlideData)
```

ทิศทางการพึ่งพา (ลูกศร = "import ได้"):

```
pages → templates → organisms → molecules → atoms → (hooks, lib, styles, types)
pages → content → shared/types            content ห้าม import component
app   → pages, dev(เฉพาะ dev build)
dev   → shared (ห้ามใช้เนื้อหาจริง)
```

## 2. Atomic layers

| Layer | คืออะไร | ตัวอย่าง | import ได้จาก |
|---|---|---|---|
| **atoms** | องค์ประกอบเดี่ยว ไม่รู้บริบท | `Heading` `Text` `Kicker` `Source` `BigNumber` `Stack` `Screen` `Pill` `Dot` `Swatch` `Icon` `AppLink` | hooks, lib, types |
| **molecules** | atoms รวมเป็นหน้าที่เดียว | `CountUp` `StatBlock` `NavDots` `ThemeToggle` `ChromeBar` `SwatchRow` `TocItem` | atoms |
| **organisms** | ส่วนของหน้าที่มีพฤติกรรม | `SlideFrame` `Deck` `TocList` | atoms, molecules |
| **templates** | จับ SlideData มาเป็นสไลด์ | `CoverSlide` `StatSlide` `StatementSlide` `CompareSlide` `GitflowSlide` `WebflowSlide` `ChecklistSlide` `FlowSlide` `EndSlide` `SlideRenderer` `SlideDeck` | atoms, molecules, organisms |

`checklist` และ `flow` เป็นสไลด์นิ่ง (ไม่ผ่าน GSAP): `ChecklistSlide` รับ `items` 1–6 และ `FlowSlide` รับ `steps` 2–4 โดยขอบเขตบังคับด้วย type ใน `shared/types/slide.ts`

🔒 layer ล่างห้าม import layer ที่อยู่สูงกว่า (`no-restricted-imports` ใน `eslint.config.js`)

## 3. กฎ

### ขนาดและการจัดไฟล์
1. **ไฟล์ละไม่เกิน 300 บรรทัด** (นับทุกบรรทัด) 🔒 `max-lines` — ถ้าใกล้ถึงให้แยก
   - `slides.ts` ยาวเกิน → เปลี่ยนเป็นโฟลเดอร์ `slides/` แยก `part1.ts`, `part2.ts` แล้วรวมด้วย `[...part1, ...part2]` ใน `slides/index.ts`
   - component ยาวเกิน → แยกเป็น component ย่อยใน layer ที่เหมาะสม
2. **1 component ต่อ 1 ไฟล์** ชื่อไฟล์ = ชื่อ component (`PascalCase.tsx`) และมี `PascalCase.module.css` คู่กัน ถ้ามีสไตล์
3. hook = `useXxx.ts`, ฟังก์ชันล้วน = `camelCase.ts`
4. ทุกโฟลเดอร์ layer มี `index.ts` (barrel) — import ข้าม layer/โฟลเดอร์ผ่าน barrel: `@/shared/components/atoms`
5. ใช้ alias `@/` สำหรับ import ข้ามโฟลเดอร์; ใช้ `./` เฉพาะไฟล์ข้างกัน

### Component
6. **ประกอบ ไม่ copy** — ต้องการ UI ที่มีอยู่แล้วให้ compose จาก layer ล่าง ถ้ายังไม่มีให้สร้าง atom/molecule ใหม่แล้วใช้ที่นั่น แก้ที่เดียวกระทบทุกที่
7. **atoms ไม่กำหนด margin ของตัวเอง** — ระยะห่างแนวตั้งมาจาก `Stack` (`sm|md|lg`) เท่านั้น
8. **ไม่มี style นอก module CSS** ยกเว้นค่าที่เป็น *ข้อมูล* (เช่นสีใน `Swatch`)
9. **ห้ามใช้ค่าสี/ขนาด/ระยะแบบ hard-code** ใน `*.module.css` — ใช้ `var(--token)` จาก `tokens.css` (ยกเว้น `1px`, `0`, `100svh`, ค่าอนิเมชันเฉพาะจุด)
10. **props เป็นข้อมูลธรรมดา** (string, number, boolean, callback) ให้ตรงกับ `SlideData` — ไม่ส่ง JSX ผ่าน slide data
11. **router ผูกกับ atom เดียว** (`AppLink`) 🔒 — ที่อื่นใน `shared/` ห้าม import `react-router`
12. **`shared/` ห้ามรู้จัก `content`, `pages`, `app`, `dev`** 🔒

### เนื้อหา (content)
13. **เนื้อหา = ข้อมูลล้วน** `SlideData[]` ใน `.ts` ไม่มี JSX ไม่ import component 🔒
14. ขึ้นบรรทัดใหม่ในข้อความด้วย `\n` (component แสดงผลด้วย `white-space: pre-line`)
15. **1 บท = 1 โฟลเดอร์** `content/chapters/<slug>/` มี `meta.ts` + `slides.ts` แล้วลงทะเบียนใน `content/index.ts` (ลำดับใน array = ลำดับการอ่าน)
16. สไลด์ที่ยกข้อเท็จจริงหรือตัวเลขจากภายนอกต้องมี `src`; ตัวเลขต้องตรงกับ `docs/research.md`. คำอธิบายการทำงานของคำสั่ง Git, คำอธิบายกลไกทั่วไป และตัวเลขจำลองที่มีป้าย "ตัวอย่าง" ไม่ต้องมี `src`
17. 1 สไลด์ = 1 ความคิด (ดู `design.md`)
18. `slug` ใช้ `kebab-case` ภาษาอังกฤษ ไม่ซ้ำ; ชื่อ/สรุปเป็นภาษาไทยได้

### Animation (GSAP)
21. **ใช้ GSAP + `@gsap/react` สำหรับ diagram/แอนิเมชันเชิงลำดับ**; แอนิเมชันเล็กๆ (reveal, hover) ใช้ CSS (เหตุผลใน `docs/research.md` §7)
22. **แยกเป็น 3 ส่วน:** `shared/animation/<name>Timeline.ts` (สร้าง timeline, ไม่มี React) → `useTimeline` (เล่น/หยุด/ข้ามขั้น/ลาก) → organism ที่วาด DOM และเรียก hook; UI ควบคุมใช้ `TimelineControls` ร่วมกัน
23. **ทุก tween ใช้ `fromTo` ที่ระบุค่าเริ่มต้นครบ** (และ `immediateRender: false` ถ้าเป็นตัวที่ 2+ ของ element เดิม) — ไม่งั้นการลาก scrubber ข้ามช่วงจะได้เฟรมผิด
24. ค่าเวลา/ease มาจาก `animation/motion.ts` ไม่ hard-code; ห้ามใช้ vars object ร่วมกันหลาย tween (ใช้ factory)
25. **element ที่ animate อ้างด้วย `data-el="..."`** ไม่ใช่ class (class ของ CSS Modules ถูก hash)
26. **เคารพ `prefers-reduced-motion`** — `useTimeline` ข้ามไปเฟรมสุดท้ายให้อัตโนมัติ ห้ามปิดกั้นการควบคุมด้วยมือ
27. **import `gsap` ได้เฉพาะ** `shared/hooks`, `shared/animation`, organisms, templates 🔒 (atoms/molecules/content ห้าม)
28. hook ที่คืนค่าทั้ง ref และ state ให้คืนเป็น **tuple** `[ref, api]` (React Compiler ไม่ให้อ่าน property จาก object ที่ถือ ref)
29. ทุก animation ใหม่ต้องมีตัวอย่างที่ `/dev/animations`

### หน้า /dev
- `/dev` (สารบัญ), `/dev/slides` (ทุกชนิดสไลด์แบบ deck จริง), `/dev/components` (tokens + atoms + molecules), `/dev/animations` (GSAP explainers)
- ลงทะเบียนใน `app/App.tsx` ภายใต้ `import.meta.env.DEV` เท่านั้น — production build ตัดโค้ดและข้อมูลสมมติออกทั้งหมด (ตรวจแล้วด้วย `grep` ใน `dist/`) และเปิด `/dev` ใน production จะ redirect ไป `/`
- ใช้ข้อมูลสมมติจาก `dev/sample-slides.ts` เท่านั้น ห้าม import `content/`
- **เพิ่ม component/สไลด์ชนิดใหม่ต้องเพิ่มตัวอย่างใน /dev ด้วย** (แกลเลอรี่ = เอกสารที่รันได้)

### การเพิ่มของใหม่
19. **สไลด์ชนิดใหม่** (ทำเมื่อรูปแบบเดิมซ้ำ ≥ 3 ครั้งหรือใช้ pattern เดิมไม่ได้จริงๆ):
    1. เพิ่ม interface ใน `shared/types/slide.ts` และรวมเข้า union `SlideData`
    2. สร้าง `XxxSlide.tsx` ใน `templates/` ประกอบจาก atoms/molecules/organisms
    3. เพิ่ม `case` ใน `SlideRenderer` — ถ้าลืม TypeScript จะ error (`never` check)
    4. เพิ่มตัวอย่างใน `dev/sample-slides.ts`
    5. บันทึก pattern ใน `design.md`
20. **สีใหม่** เพิ่มเป็น token ใน `tokens.css` ทั้ง light และ dark และตรวจ contrast ก่อน (≥ 4.5:1 ข้อความปกติ)

## 4. Data flow

```
content/chapters/x/slides.ts  ──(lazy import)──►  ChapterPage
        SlideData[]                                  │  use(loadChapter())
                                                     ▼
                                   SlideDeck (template)  ← next chapter จาก registry
                                     ├─ Deck (organism): chrome + NavDots + คีย์บอร์ด/#n
                                     ├─ SlideRenderer → CoverSlide | StatSlide | GitflowSlide | …
                                     │     └─ SlideFrame (organism): snap, reveal, SeenContext
                                     │           └─ molecules → atoms
                                     └─ EndSlide
```

- `SlideFrame` ตั้ง `seen` เมื่อสไลด์เข้าจอ → `CountUp` ใช้เริ่มนับ
- `Deck` หา `[data-slide]` เพื่อนำทาง; จำนวนสไลด์มาจากข้อมูล (`slides.length + 1`) ไม่ใช่การนับ DOM
- ธีม: `data-theme` บน `<html>` ตั้งโดย `lib/theme.ts`; ไม่ตั้งค่า = ตามระบบ (`prefers-color-scheme`)

## 5. Checklist ก่อน commit

- [ ] `pnpm lint` ผ่าน (ครอบคลุมกฎ 1, 11, 12, 13 และ layer)
- [ ] `pnpm build` ผ่าน
- [ ] เปิดบทที่แก้ ดูทั้ง light และ dark
- [ ] component/สไลด์ใหม่มีตัวอย่างใน `/dev`
- [ ] ตัวเลขใหม่มีแหล่งอ้างอิงใน `docs/research.md`

## 6. WebFlow slide type

`webflow` เป็นข้อมูลล้วนใน `SlideData`: `scene`, `title`, `sub`, `src`, `think`, `http`. `WebflowSlide` ประกอบ `WebFlow` ซึ่งเลือก organism จาก registry `shared/animation/webflow/`; ฉาก HTTP ใช้ `HttpExchange`. `http` override ใช้เฉพาะ http-200/http-404. `think` รองรับ build-html/mpa และเรียก `useTimeline` ด้วย hold เพื่อไม่เปิดเฉลยอัตโนมัติเมื่อ reduced-motion; การควบคุมด้วยมือยังทำงาน. ทุก 10 scene และสองฉากลองคิดมีตัวอย่างใน `/dev/animations`.
