# Design — Slide คอร์ส "การสร้างเว็บไซต์"

ระบบดีไซน์ของ slide ใช้ tokens ใน `src/shared/styles/tokens.css`; เหตุผลและแหล่งข้อมูลอยู่ใน `docs/research.md`; ทิศทางแบรนด์ (WebLearn: ชื่อ, สี, ไอคอน, ภาพประกอบ, UI) อยู่ใน `docs/brand.md`

## หลักการ

1. **เนื้อหานำ** — 1 สไลด์ = 1 ความคิด; ตัดของตกแต่งที่ไม่ช่วยการเรียนรู้
2. **อ่านสบายตา** — ไม่ใช้ดำ/ขาวสนิท, contrast ~13:1 สำหรับเนื้อหา
3. **เห็นการเปลี่ยนสถานะ** — แสดงคำสั่งและผลที่เกิดกับไฟล์ให้เห็นตรงกัน
4. **เข้าถึงได้** — ทุกคู่สีผ่าน WCAG AA, เคารพ `prefers-color-scheme` และ `prefers-reduced-motion`, ใช้งานด้วยคีย์บอร์ดได้

## รูปแบบ (format)

- เลื่อนแนวตั้งเต็มจอ (`scroll-snap-type: y mandatory`), 1 section = 1 สไลด์ สูง `100svh`
- คีย์บอร์ด: ← ↑ PageUp = ก่อนหน้า · → ↓ PageDown Space = ถัดไป
- จุดนำทางด้านขวา (`nav`) แสดงตำแหน่งปัจจุบัน
- ปุ่ม "ธีม" มุมซ้ายบน: ตามระบบจนกว่าผู้ชมจะเลือกเอง (เก็บใน `localStorage`)

## สี

### Tokens

| Token | Light | Dark | หน้าที่ | Contrast (L / D) |
|---|---|---|---|---|
| `--bg` | `#FAF9FD` | `#1B1A24` | พื้นหลัง | — |
| `--fg` | `#282436` | `#E8E6F0` | ข้อความหลัก, หัวข้อ | 14.3 / 13.9 |
| `--muted` | `#6E6980` | `#A8A4B8` | คำอธิบายรอง, แหล่งที่มา | 5.0 / 7.1 |
| `--accent` | `#5B4BC4` | `#B3A8F5` | primary (ม่วง): ตัวเลขใหญ่, จุดเน้น, ปุ่ม, nav | 6.2 / 8.1 |
| `--accent-2` | `#7A6AD8` | `#8D80E0` | secondary: ภาพประกอบ/พื้นประกอบ (ไม่ใช้เป็นข้อความ) | — |
| `--surface` | `#F0ECFF` | `#26243A` | พื้นการ์ด/callout | muted 4.5 / 6.2 |
| `--success` | `#276F67` | `#5DC4B8` | สถานะสำเร็จ/หมายเหตุ | 5.6 / 8.2 |
| `--danger` | `#C0394B` | `#FF8F9A` | ข้อผิดพลาด/คำเตือน | 5.1 / 7.9 |
| `--line` | fg @ 13% | fg @ 13% | เส้นขอบบางๆ | — |

### กติกา
- ห้ามใช้ `#000` / `#fff` เป็นพื้นหรือตัวอักษร (ยกเว้นสไลด์เดโมเทียบสี)
- Dark mode ใช้เทาเข้ม ไม่ใช่ดำ และยก lightness ของม่วงเป็น lilac
- ม่วงใช้กับตัวเลข/จุดเน้นเท่านั้น ไม่ใช้เป็นพื้นหลังกว้าง; พื้นกว้างใช้ `--surface` (tint อ่อน) ได้
- ห้ามสื่อความหมายด้วยสีอย่างเดียว
- สีใหม่ต้องคำนวณ contrast: ข้อความปกติ ≥ 4.5:1, ข้อความใหญ่/องค์ประกอบ UI ≥ 3:1

## Typography

- ฟอนต์: **Noto Sans Thai** (400, 600) → fallback Sarabun → `system-ui`
- ไม่มีฟอนต์ตัวที่สอง; ลำดับชั้นสร้างจากขนาดและน้ำหนัก

| บทบาท | ขนาด | น้ำหนัก | line-height |
|---|---|---|---|
| ตัวเลขใหญ่ `BigNumber` | `clamp(96px, 24vw, 340px)` | 600 | 1.1 |
| หัวข้อปก `h1` | `clamp(40px, 7vw, 96px)` | 600 | 1.35 |
| หัวข้อสไลด์ `h2` | `clamp(30px, 5vw, 72px)` | 600 | 1.4 |
| คำอธิบาย `Text label` | 1.35em | 400 | 1.8 |
| เนื้อความ | `clamp(18px, 1.6vw, 24px)` | 400 | 1.8 |
| แหล่งที่มา `Source` | .75em | 400 | — |

- line-height สูงกว่าละติน เพราะสระ/วรรณยุกต์ซ้อนแนวตั้ง
- ตัวเลขใช้ `font-variant-numeric: tabular-nums`
- ความกว้างบรรทัดคำอธิบาย ≤ 30ch

## Layout

- padding แนวนอน `clamp(24px, 10vw, 160px)`, แนวตั้ง 4rem
- เนื้อหาชิดซ้าย จัดกึ่งกลางแนวตั้ง — ไม่จัดกึ่งกลางแนวนอน
- แหล่งที่มาอยู่ล่างซ้ายของทุกสไลด์ข้อมูล (`Source` ใน `SlideFrame`)
- มือถือ: ใช้ `clamp()` ปรับขนาดอัตโนมัติ ไม่ต้องมี breakpoint

## รูปแบบสไลด์ (patterns)

| Pattern | โครง | ใช้เมื่อ |
|---|---|---|
| **Cover** | `kicker` + `title` (h1) + `sub` | ปกบท |
| **Stat** | `value` + `label` + `src` | ตัวเลขเดียวที่สำคัญ (สไลด์ส่วนใหญ่) |
| **Statement** | `title` (+ `sub`, `src`) | ข้อความหลักหรือสรุป |
| **Compare** | `title` + `items[]` (กล่องสี) | เทียบสองสิ่ง เช่น สีเข้ม vs สีนุ่ม |
| **GitFlow** | `scene` + `command` + `title` (+ `sub`) | แสดงคำสั่ง Git ด้วยภาพสี่พื้นที่และเทอร์มินัล |
| **LLMFlow** | `scene` + `title` (+ `sub`) | ภาพวงจร LLM จาก scene registry |
| **WebFlow** | `scene` + `title` (+ `sub`, `think`, `http`, `src`) | กระบวนการเว็บจาก scene registry: client-server, dns, http-200/404, build-html/css/js, mpa/spa, api-db |
| **Terminal** | `scene` + `command` + `title` (+ `sub`) | แสดงคำสั่งในจอเทอร์มินัลคู่แผนผังโฟลเดอร์ที่เปลี่ยนตามคำสั่ง |

GitFlow ใช้ scene จาก registry ใน `src/shared/animation/gitflow/`; ค่า `command` ใน slide ต้องตรงกับ scene และ timeline แสดงผลลัพธ์เดียวกับสถานะของไฟล์ ส่วน LLMFlow ใช้กลไกเดียวกัน โดย scene มาจาก `src/shared/animation/llmflow/` — title/sub ของ slide ต้องตรงกับสิ่งที่ timeline แสดง

WebFlow ใช้ registry ใน `src/shared/animation/webflow/`; caption ต้องตรงกับภาพและขั้นของ timeline. `http` override ใช้ได้เฉพาะฉาก HTTP และส่งข้อมูลให้ HttpExchange. `think` ใช้เฉพาะ build-html/mpa: หยุดไว้ก่อนเฉลยจนผู้เรียนกดควบคุมเอง แม้เปิด reduced-motion.

Terminal ใช้ scene จาก registry ใน `src/shared/animation/terminal/`; ค่า `command` ใน slide ต้องตรงกับ scene และ timeline แสดงคำสั่งพร้อมผลต่อโฟลเดอร์/ไฟล์ในแผนผัง

ข้อความอื่นที่ไม่ใช่ pattern เหล่านี้ให้ตั้งคำถามก่อนว่าควรแยกเป็นอีกสไลด์หรือไม่

## Components เล็ก (UI kit)

ตัวอย่างทุกตัวดูได้ที่ `/dev/components` (DEV เท่านั้น)

| Component | Layer | หน้าที่ | ตัวเลือกหลัก |
|---|---|---|---|
| `Button` | atom | ปุ่มการกระทำในเนื้อหา | `variant`: primary (พื้นม่วง) / secondary (ขอบม่วง) / ghost · `size`: sm / md · `disabled` · `to` = ลิงก์ |
| `Pill` | atom | ปุ่มเล็กของ chrome เช่น ธีม | `to` / `onClick` |
| `Badge` | atom | ป้ายสั้น | `tone`: neutral / accent |
| `Code` | atom | โค้ดในบรรทัด | — |
| `Kbd` | atom | ปุ่มคีย์บอร์ด | — |
| `ProgressBar` | atom | ความคืบหน้า (`role="progressbar"`) | `value` 0–100, `label` |
| `Divider` | atom | เส้นคั่น | — |
| `Callout` | molecule | กล่องเน้น 1 ประเด็น ขอบม่วงซ้าย | `title` |
| `CodeBlock` | molecule | โค้ดหลายบรรทัด | `code`, `language` |
| `Card` | molecule | กล่องหัวข้อ + คำอธิบาย + action | `title`, `action` |

- ปุ่ม primary: ตัวอักษร `--bg` บนพื้น `--accent` (≈ 6:1 ทั้งสองธีม); ม่วงพื้นทึบใช้เฉพาะปุ่มเล็ก ไม่ใช้พื้นหลังกว้าง
- ทุกตัวมี focus ring `2px solid var(--accent)` และปิด transition เมื่อ `prefers-reduced-motion`
- สีอ่อน (tint) ใช้ `color-mix(in srgb, var(--accent) N%, var(--bg))` ไม่เขียนสีดิบ

## Motion

- Fade + เลื่อนขึ้น 12px เมื่อสไลด์เข้าจอ (0.5s) และตัวเลขนับขึ้น 0.9s (ease-out cubic)
- เล่นครั้งเดียวต่อสไลด์
- `prefers-reduced-motion`: ปิดทุกอย่าง แสดงค่าสุดท้ายทันที และเลิก smooth scroll

## Accessibility checklist

- [ ] contrast ผ่านเกณฑ์ทั้งสองธีม
- [ ] `lang="th"` ที่ `<html>`
- [ ] nav dot และปุ่มธีมมี `aria-label` และ focus ring (`outline: 2px solid var(--accent)`)
- [ ] ภาพประกอบทุกภาพมี `alt` (ปัจจุบันไม่มีภาพ)
- [ ] ใช้งานได้ด้วยคีย์บอร์ดล้วน
- [ ] ตัวเลขนับขึ้นมี `aria-label` เป็นค่าสุดท้าย (screen reader ไม่อ่านค่าระหว่างนับ)

## โครงสร้างโค้ด

ดู `docs/architecture.md` (โครงสร้างโฟลเดอร์, Atomic layers, กฎทั้งหมด) — สรุปที่เกี่ยวกับดีไซน์:

- ค่าดีไซน์ทั้งหมดอยู่ที่ `src/shared/styles/tokens.css` (สี, ขนาดตัวอักษร, ระยะ, gutter)
- สไลด์แต่ละ pattern = template หนึ่งตัวใน `shared/components/templates/` ประกอบจาก atoms/molecules
- เนื้อหาเป็นข้อมูล `SlideData[]` ใน `src/content/chapters/<slug>/slides.ts`
- URL แชร์ได้ต่อบทและต่อสไลด์: `/git#3`

## การเพิ่มเนื้อหา

```ts
// src/content/chapters/git/slides.ts
const slides: SlideData[] = [
  { type: 'cover', kicker: 'บท B3', title: 'Git', sub: 'ปุ่มย้อนกลับให้โค้ด · ทำงานร่วมกัน' },
  { type: 'gitflow', scene: 'init', command: 'git init', title: 'เริ่มติดตามโฟลเดอร์' },
]
```
`gitflow` เป็นข้อมูลล้วน: ระบุ scene, คำสั่งที่แสดงในเทอร์มินัล และคำอธิบายภาษาไทย

## ไฟล์หลัก

- `src/shared/styles/` — tokens และ base
- `src/shared/components/` — atoms → molecules → organisms → templates
- `src/content/` — เนื้อหา
- `prototype/` — prototype HTML/CSS/JS ตัวเดิม (อ้างอิง)
