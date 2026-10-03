# Brand direction — WebLearn

ทิศทางภาพลักษณ์ของ slide/แพลตฟอร์ม (อ้างอิงภาพ `docs/brand/weblearn-brand-board.png`, สร้าง 2026-10-03). ค่าสีจริงอยู่ใน `src/shared/styles/tokens.css`; กติกาการใช้งานอยู่ใน `design.md`

- **ชื่อ:** WebLearn — "Build Skills for a Better Web"
- **แท็กไลน์:** เรียนเว็บอย่างเป็นระบบ เข้าใจง่าย ใช้ได้จริง
- **ตัวตน:** minimalist learning platform สำหรับ modern web development — สไลด์ภาพชัด ฝึกทำจริง

## Brand concept

| คำ | ความหมาย | ไอคอน |
|---|---|---|
| Clear (ชัดเจน) | เนื้อหาหัวเดียว ไม่รก | หนังสือ |
| Calm (สบายตา) | สีนุ่ม พื้นอ่อน ไม่จ้า | ประกายดาว |
| Structured (เป็นระบบ) | เรียงเป็นบท/บทเรียน | ชั้น (layers) |
| Friendly (เป็นมิตร) | ภาพประกอบคน โทนอบอุ่น | คน |

## สี (ตามบอร์ด)

| บทบาท | ค่าในบอร์ด | Token | หมายเหตุ |
|---|---|---|---|
| Primary (brand) | `#5B4BC4` | `--accent` | ปุ่ม, ลิงก์, ตัวเลข; 6.2:1 บนพื้น |
| Secondary | `#7A6AD8` | `--accent-2` | พื้นประกอบ/ภาพประกอบ/ไล่ระดับ — ไม่ใช้เป็นสีข้อความ |
| Surface | `#F0ECFF` | `--surface` | การ์ด, callout, พื้นกล่อง (tint ม่วงอ่อน) |
| Background | `#FAF9FD` | `--bg` | พื้นหลังหลัก |
| Text primary | `#282436` | `--fg` | 14.3:1 |
| Text secondary | `#6E6980` | `--muted` | 5.0:1 |
| Border | `#E7E3EF` | `--line` | ใช้ fg @ 13% แทนค่าทึบ |
| Success / Note | `#2E8178` | `--success` | **เข้มขึ้นเป็น `#276F67`** เพื่อให้ข้อความผ่าน AA (ค่าบอร์ด 4.4:1) |
| Error / Alert | `#F6707D` | `--danger` | **เข้มขึ้นเป็น `#C0394B`** สำหรับข้อความ (ค่าบอร์ด 2.7:1 ใช้ได้เฉพาะพื้นผิว/ภาพประกอบ) |

Dark mode: ยก lightness ของม่วงเป็น lilac (`#B3A8F5`), พื้นเป็นม่วงเทาเข้ม `#1B1A24` (ไม่ใช่ดำ)

## Typography

- ไทย: **Noto Sans Thai** (หัวข้อ/เนื้อหาภาษาไทย)
- ละติน: ใช้ **Noto Sans Thai** ตัวเดียวกับไทย — ตัดสินใจแล้วว่าไม่เพิ่ม Inter (กฎ "ไม่มีฟอนต์ตัวที่สอง" ใน `design.md`)
- หัวข้อ: ตัวหนา, คำสำคัญในหัวข้อเน้นด้วยสีม่วง (เช่น "เรียน **Web Development** ให้เข้าใจได้จริง")

## ไอคอนและภาพประกอบ

- **ไอคอน:** line icon เส้นบาง มุมมน สีม่วง (home, play, book, document, code `</>`, settings)
- **ภาพประกอบ:** flat illustration, สีนุ่ม, รายละเอียดน้อย, โฟกัสที่การอธิบายเนื้อหา — ตัวละครสวมฮู้ดม่วง นั่งกับแล็ปท็อป + หน้าต่างโค้ด + ต้นไม้ในกระถาง; ใช้เทคโนโลยี (HTML/CSS/JS/React) เป็นป้ายเล็กลอยรอบภาพ
- ภาพต้องช่วยการเรียนรู้ ไม่ใช่ตกแต่ง (หลักการข้อ 1 ใน `design.md`); ทุกภาพมี `alt`

## รูปแบบ UI ในบอร์ด

- **ปุ่ม:** Primary (พื้นม่วง), Secondary (ขอบม่วง), Ghost; มุมมน
- **Tag/Badge:** ใหม่ (เขียวอ่อน), ยอดนิยม (ชมพูอ่อน), ฟรี, neutral
- **Callout 3 โทน:** Key Concept (ม่วงอ่อน), Remember (เขียวอ่อน), Warning (ชมพูอ่อน) — มีไอคอนกำกับ ไม่สื่อด้วยสีอย่างเดียว
- **การ์ด:** พื้น `--surface` มุมมนใหญ่ เงาบาง, ไอคอน/โลโก้เทคโนโลยีด้านบน, metadata (บทเรียน · ชั่วโมง) ด้านล่าง
- **โค้ด:** บล็อกพื้นเข้มม่วงเทา มีหัวไฟล์ + เลขบรรทัด

## Slide template ตามบอร์ด

| # | Template | โครง |
|---|---|---|
| 01 | Title/Intro | หัวข้อ + ภาพประกอบ + แถบสั้นสีม่วง |
| 02 | Concept + code | คำถามเป็นหัวข้อ, โลโก้เทคโนโลยี, ตัวอย่างโค้ดสั้น |
| 03 | Concept + visual | คำอธิบาย + โค้ด + mockup ผลลัพธ์ |
| 04 | Checklist | รายการติ๊กถูก + โลโก้ |
| 05 | Flow | State → Re-render → UI เป็นกล่อง + ลูกศร |
| 06 | Summary | ติ๊กสรุป + ตัวละครยกมือ |

เทมเพลต 01 (พื้น `--surface` + แถบ `--accent-2`), 04 Checklist และ 05 Flow ทำแล้วเป็น pattern `checklist` / `flow` ใน `design.md`; เทมเพลตที่เหลือยังแมปกับ pattern เดิม (Statement / Compare / Stat ...)

## สถานะการนำไปใช้

- [x] tokens สี (light/dark) ปรับตามบอร์ด
- [x] tokens รูปทรง/พื้นโค้ด: `--radius` 12px, `--radius-lg` 16px, `--shadow-sm`, `--code-bg/fg/muted/accent` (เข้มทั้งสองธีม) และ `--tint-pct` 8% — ตรวจด้วย `pnpm contrast:check`
- [x] `--surface` / `--accent-2` / `--success` / `--danger` ถูกใช้จริง: Callout โทน concept/remember/warning, Badge โทน new/hot บนพื้น `--surface` และ `--accent-2` เป็นแถบปกกับลูกศร Flow
- [x] `Icon` ชุดแรก (check, warning, bulb) และ Badge ครบโทน neutral/accent/new/hot/code
- [x] พื้นหลังกว้างใช้ `--surface` ได้ (การ์ด, callout, ปก) — ม่วงทึบ `--accent` ใช้เฉพาะปุ่มและจุดเน้น; พื้นเข้มใช้เฉพาะ `--code-*`
- [x] template Checklist (04) และ Flow (05) เพิ่มใน `design.md`
- [x] คงฟอนต์ Noto Sans Thai ตัวเดียว — ไม่เพิ่ม Inter
- [ ] ภาพประกอบตัวละครตามบอร์ด
