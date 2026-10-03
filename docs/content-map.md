# Content map — ภาพรวมเนื้อหาสำหรับ agent

อ่านไฟล์นี้ก่อนแตะ `src/content/` เพื่อรู้ว่าแต่ละบทมีไว้ทำอะไร โดยไม่ต้องเปิด slides ทุกไฟล์
- รายการสไลด์ทุกอัน (สร้างอัตโนมัติ): `docs/content-index.md`
- แหล่งข้อมูลและเหตุผลเชิงวิจัย: `docs/research.md`
- **แก้ไฟล์นี้ด้วยมือเมื่อเพิ่ม/ลบ/เปลี่ยนจุดประสงค์ของบท**; หลังแก้ `slides.ts` ให้รัน `pnpm content:index`

## เรื่องทั้งหมด (หลักสูตรเป้าหมาย)

คอร์สภาษาไทยสำหรับผู้เรียนที่ **ไม่มีพื้นฐานเลย**: ใช้ AI (Claude Code) สร้างเว็บ Next.js + Prisma + PostgreSQL
ตั้งแต่ติดตั้ง VS Code จนถึง deploy บน Vercel โดยใช้ `prototype-project` (TaskFlow — ระบบ Task Management 3 role) เป็นสเปกของโปรเจกต์เดียวตลอดคอร์ส

หลักการสอน:
1. ได้ผลลัพธ์ที่เห็นจริงภายใน 30 นาทีแรก
2. เครื่องมือขั้นสูง (command/skill/subagent) มาตอนผู้เรียนเจอปัญหาที่มันแก้ ไม่ใช่ก่อน
3. สอน "สั่งและตรวจ" (สเปก, อ่าน diff, verify, ย้อนกลับ) ไม่ใช่สอนเขียนโค้ด
4. Git มาก่อนที่ AI จะแก้ไฟล์เยอะ — เป็นปุ่ม undo
5. โปรเจกต์เดียวตลอด; แต่ละหมวดฟีเจอร์ = 1 wave ที่จบแล้วรันและ commit ได้
6. วนซ้ำแบบเกลียว: CLAUDE.md และ verify กลับมาทุกภาค ลึกขึ้นเรื่อยๆ ช่วยเหลือน้อยลงเรื่อยๆ

## สถานะปัจจุบัน: บท A3 · เทอร์มินัล, B3 · Git และ B4 · LLM คืออะไร

เทอร์มินัลเป็นบทแรกที่ผู้เรียนได้พิมพ์คำสั่งจริง: อธิบายว่า command คืออะไร เตือนผู้ใช้ Windows ให้ติดตั้ง Git for Windows แล้วใช้ Git Bash และเดินเส้นเรื่องโปรเจกต์ `my-site` ทีละคำสั่ง
บทนี้ใช้จอเทอร์มินัลคู่แผนผังโฟลเดอร์ที่เปลี่ยนตามคำสั่ง — เห็นทั้งคำสั่งและผลต่อไฟล์ในที่เดียว

ลำดับ 10 สไลด์: ปก → command คืออะไร → Windows ใช้ Git Bash → pwd → ls → mkdir → cd → touch → rm → ชีตคำสั่ง
6 คำสั่ง (pwd, ls, mkdir, cd, touch, rm) มีอนิเมชันแสดงคำสั่ง ผลลัพธ์ และสถานะแผนผังโฟลเดอร์ทีละขั้น

LLM คืออะไร ต่อท้ายบท Git — สิ่งที่ตอบคุณอยู่ทำงานอย่างไร ตั้งแต่ prompt ถึงคำตอบ
บทนี้ใช้ภาพวงจรเดียว 6 ฉาก (overview, tokenize, predict, loop, context, wrong) ซ้ำทุกสไลด์ เพื่ออธิบายการทำนาย token ถัดไปจากความน่าจะเป็น, context window และ hallucination

ลำดับ 14 สไลด์: ปก → hook "สิ่งที่คุณใช้มาทั้งหมดคืออะไร" → เทียบศัพท์ AI/LLM/Claude/Claude Code/ChatGPT → ภาพรวมวงจร → tokenize → predict → รู้มาจากไหน (การเทรน) → loop → context window → ตอบมั่นแต่ผิด → ทำไมตอบไม่ซ้ำ → เก่ง/ไม่เก่ง → นิสัยการใช้ Claude Code → ชีตสรุป
ใช้ running example เดียวตลอดบท ("สรุปไฟล์ app.js ให้เป็น 3 ข้อ"); ชิ้น token และตัวเลขความน่าจะเป็นในภาพเป็นตัวอย่างที่มีป้ายกำกับ และมีจุด "ลองคิด" ให้ผู้เรียนเดาชิ้นถัดไปก่อนเลื่อน

## หลักสูตรเป้าหมาย (A3 เทอร์มินัล, B3 Git และ B4 LLM อยู่ใน `src/content/`; บทอื่นยังวางแผน)

คอลัมน์ "ต้องใช้บริการ" = บทสอนสมัคร/เข้าใช้เว็บนั้น **วางไว้ในบทนี้** (ตอนที่ต้องใช้จริง ไม่รวมไว้ก่อนเรียน)

### ภาค A — ตั้งหลัก
| บท | จุดประสงค์ | ต้องใช้บริการ |
|---|---|---|
| A1 | เว็บทำงานอย่างไร (browser/server/DB), demo TaskFlow ที่เสร็จแล้ว, สไลด์ "บัญชีที่จะใช้ตลอดคอร์ส" (ภาพรวม ยังไม่สมัคร; เตือนใช้ Gmail ส่วนตัว) | — |
| A2 | นำ deck เว็บที่ดีออกแล้ว; เนื้อหาเดิมอยู่ใน Git history: `git log -- src/content/chapters` | — |
| A3 | เทอร์มินัล 6 คำสั่ง (pwd, ls, mkdir, cd, touch, rm) สร้างแล้ว; ติดตั้ง VS Code, IDE คืออะไร, ไฟล์/โฟลเดอร์ ยังวางแผน | — |

### ภาค B — เริ่มใช้ Claude
| บท | จุดประสงค์ | ต้องใช้บริการ |
|---|---|---|
| B1 | ติดตั้ง/ล็อกอิน Claude Code, prompt แรก, permission | **Claude** |
| B2 | อ่าน diff, Plan mode, เขียน prompt ที่ดี (เป้าหมาย/ข้อจำกัด/เกณฑ์เสร็จ) | — |
| B3 | Git เป็นตาข่ายนิรภัย: commit/branch/restore และทำงานกับ GitHub ผ่าน remote, push, clone, pull; Lab แก้ `prototype-project` แล้ว commit | **GitHub** |
| B4 | LLM คืออะไร: บททฤษฎีต่อจาก Git อธิบายวงจรทำนาย token ถัดไป, context window และ hallucination แล้วผูกกับนิสัยใช้ Claude Code ที่ฝึกมาแล้ว (ADR-0001) | — |

### ภาค C — ใช้ prototype เป็นสเปก
| บท | จุดประสงค์ | ต้องใช้บริการ |
|---|---|---|
| C1 | อ่าน PRD/flows/role ของ TaskFlow — สเปกที่ดีหน้าตาเป็นอย่างไร | — |
| C2 | `CLAUDE.md`/`AGENTS.md`: ใส่อะไร ไม่ใส่อะไร | — |
| C3 | จัดการ context: `/clear`, `/compact`, แบ่ง wave, `TODO.md` | — |

### ภาค D — สร้างระบบทีละฟีเจอร์ (1 หมวด = 1 wave)
| บท | จุดประสงค์ | ต้องใช้บริการ |
|---|---|---|
| D0 | รากฐาน: Next.js App Router, layout, ย้าย app shell + tokens จาก prototype, **deploy ครั้งแรก** | **Vercel** (สมัครด้วย GitHub, import repo) |
| D1 | ฐานข้อมูล: Postgres/relation (ER ของ TaskFlow), Prisma schema/migration/seed, Prisma Studio, แยก dev/prod DB | **Neon หรือ Supabase** |
| D2.1 | Register: ฟอร์ม, Zod, hash password | — |
| D2.2 | Login/Logout: session/cookie | — |
| D2.3 | Protected routes: middleware/redirect | — |
| D2.4 | Forgot/reset password: token ใช้ครั้งเดียว (เก็บ hash), ตอบข้อความเดียวกันไม่ว่ามีอีเมลหรือไม่, Nodemailer ผ่าน Gmail SMTP, ข้อจำกัด ~500 ฉบับ/วัน และทางสลับไป Resend/SES | **Google App Password** (2-Step Verification; Gmail ส่วนตัวเท่านั้น; มีทางสำรองถ้าสร้างไม่ได้) |
| D3 | Authorization: 3 role, ตรวจสิทธิ์ฝั่ง server เสมอ, Lab ยิง action ตรงๆ โดยไม่มีสิทธิ์ | — |
| D4 | Division & Project: CRUD ตัวแรกที่ครบวงจร (ต้นแบบ), server actions, error/empty/loading, project members (many-to-many) | — |
| D5.1–5.4 | Task: create/edit, detail drawer, reassign/progress, filter/search/My Tasks | — |
| D6 | Kanban: แสดงจากข้อมูลจริง, drag & drop บันทึก DB, optimistic update | — |
| D7 | Comment/Activity log และ upload ไฟล์: signed upload ไป Cloudinary จาก browser (เพราะ body limit ~4.5MB ของ Vercel function), DB เก็บแค่ metadata, ตรวจชนิด/ขนาด/สิทธิ์ฝั่ง server | **Cloudinary** (cloud name/API key/secret; secret ฝั่ง server เท่านั้น) |
| D8 | Notification และ Dashboard (count/group by) | — |
| D9 | Super Admin: จัดการ user/role/division | — |

### ภาค E — Claude ขั้นสูง (แทรกตอนเจอปัญหาจริง)
| บท | จุดประสงค์ | ต้องใช้บริการ |
|---|---|---|
| E1 | Custom slash commands (เมื่อพิมพ์ prompt เดิมซ้ำ เช่น "ทำ wave ต่อไป") | — |
| E2 | Skills (ขั้นตอนซับซ้อนที่ใช้ซ้ำ) | — |
| E3 | Subagents (context เต็มจากงานค้นโค้ด / review แยก) | — |
| E4 | Hooks (lint อัตโนมัติ) และ MCP (เสริม) | — |

ตำแหน่งจริงของ E1–E4 ในลำดับสอนยังยืดหยุ่น: ให้แทรกหลังหมวดใน D ที่ผู้เรียนเริ่มเจอปัญหานั้น

### ภาค F — ตรวจสอบและแก้บั๊ก
| บท | จุดประสงค์ | ต้องใช้บริการ |
|---|---|---|
| F1 | อ่าน error, ส่งให้ Claude, `pnpm lint && pnpm build` | — |
| F2 | Code review ด้วย AI + เช็กลิสต์ความปลอดภัย (secret/env, สิทธิ์ฝั่ง server, SQL injection ผ่าน Prisma) | — |

### ภาค G — Deploy
| บท | จุดประสงค์ | ต้องใช้บริการ |
|---|---|---|
| G1 | ตั้ง environment variables ทั้งหมดบน Vercel, production DB, migration บน prod | **Vercel** (รอบสอง) |
| G2 | Preview deployments, โดเมน, ดู log เมื่อพัง | — |
| G3 | สรุป: ค่าใช้จ่าย, ขั้นต่อไป | — |

## เทมเพลตบท

**บทฟีเจอร์ (D):** เป้าหมาย (1 ประโยค) → แนวคิดที่ต้องรู้ (2–3 สไลด์) → สเปกที่ให้ Claude (ดีเทียบไม่ดี) → ลงมือ/อ่าน diff → ตรวจสอบ (เช็กลิสต์ + กรณีผิดพลาด) → commit

**บทสอนเข้าใช้เว็บ:** ทำไมต้องมี → ขั้นตอนสมัคร/ตั้งค่า (เขียนตาม "เป้าหมาย" ไม่ผูกชื่อปุ่ม) → ได้ค่าอะไร เก็บที่ไหน (ค่าไหนลับ → `.env`, ห้าม commit) → ทดสอบว่าใช้ได้ → ถ้าติด (2–3 ข้อที่พบบ่อย) → ค่าใช้จ่าย/ข้อจำกัดแผนฟรี

## ข้อควรระวังของหลักสูตร

- UI ของบริการภายนอกเปลี่ยนบ่อย: ติดวันที่ที่จับภาพ, บันทึกลิงก์เอกสารทางการใน `docs/research.md`, ตรวจซ้ำก่อนสอนแต่ละรอบ
- ภาพหน้าจอต้องใช้ค่าตัวอย่างปลอม ห้ามมี secret จริง
- Next.js/Prisma เปลี่ยนเวอร์ชันเร็ว: ล็อกเวอร์ชันใน `docs/research.md` และสอนให้ Claude อ่านเอกสารปัจจุบัน
- จุดที่ผู้เรียนมือใหม่หลุดมากสุด: A3 (terminal) และ B3 (git) — ต้องมี lab ทีละขั้นและแผนสำหรับ Windows/Mac
- ความยาวรวมประมาณ 25–35 ชั่วโมง; ถ้าต้องลด ให้ลดภาค D ไม่ใช่ B–C

## เมื่อเพิ่มเนื้อหา

1. เพิ่มสไลด์: `src/content/chapters/<slug>/slides.ts` (ดู `design.md` § การเพิ่มเนื้อหา)
2. บทใหม่: `meta.ts` + `slides.ts` + ลงทะเบียนใน `src/content/index.ts`
3. อัปเดตตารางด้านบน (เปลี่ยนสถานะจาก "วางแผน") แล้วรัน `pnpm content:index`
4. ตัวเลขใหม่ต้องมี `src` และบันทึกที่มาใน `docs/research.md`
5. `pnpm lint && pnpm build && pnpm content:check`
