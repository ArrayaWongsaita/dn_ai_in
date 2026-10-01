# งานวิจัยประกอบเนื้อหา Slide "การสร้างเว็บไซต์"

รวบรวมเมื่อ 2026-09-30 — ใช้เป็นแหล่งข้อมูลสำหรับเนื้อหาใน prototype

## 1. หลักการออกแบบ Slide (วิธีนำเสนอ)

- แยกเป็นก้อนเล็ก (chunking) และดึงความสนใจไปที่สิ่งสำคัญ — Cognitive Load Theory
- คนประมวลผลข้อมูลสองช่อง (ภาพ/เสียง) พร้อมกันได้ แต่ประมวลผลภาษาสองแหล่งพร้อมกันไม่ได้ → อย่าอ่านข้อความบน slide ซ้ำตามที่พูด
- ใช้ภาพเฉพาะที่ช่วยการเรียนรู้ ภาพที่ไม่จำเป็นเพิ่ม extraneous load
- Slide ที่ทำตามหลัก multimedia ให้ความเข้าใจดีกว่า และจำได้ดีกว่าในการทดสอบภายหลัง
- **ข้อสรุปเชิงออกแบบ:** 1 slide = 1 ความคิด, ตัวเลข/ข้อความใหญ่, ตัดของตกแต่ง

แหล่ง:
- https://multimedia.ucsd.edu/best-practices/multimedia-learning.html
- https://writing.engr.psu.edu/ae_comprehension.pdf
- https://www.learntechlib.org/d/28143
- https://researchschool.org.uk/durrington/news/using-cognitive-load-theory-to-improve-slideshow-presentations

## 2. คนอ่านเว็บอย่างไร (เนื้อหา)

- คน "สแกน" ไม่ได้อ่าน — เข้าชมเฉลี่ยไม่ถึง 1 นาที อ่านได้ราว 1 ใน 4 ของข้อความ (NN/g)
- รูปแบบการสแกน: F-pattern, spotted, layer-cake, commitment (F-pattern พบครั้งแรก 2006)
- ช่วยการสแกน: หัวข้อ, bullet, ตัวหนา, แบ่ง section, keyword ที่ชัด
- NN/g เตือนว่า F-pattern มักถูกเข้าใจผิด — เป็นผลของเนื้อหาที่ไม่ได้จัดโครงสร้าง ไม่ใช่เป้าหมายให้ออกแบบตาม

แหล่ง:
- https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/

## 3. ความเร็วเว็บ (Core Web Vitals)

| Metric | ความหมาย | เกณฑ์ "ดี" |
|---|---|---|
| LCP | ความเร็วโหลดเนื้อหาหลัก | ≤ 2.5 วินาที |
| INP | การตอบสนองต่อการโต้ตอบ | ≤ 200 ms |
| CLS | ความนิ่งของ layout | ≤ 0.1 |

ผลต่อธุรกิจ (ข้อมูลจากบทความสรุป/case study — ควรตรวจแหล่งเดิมก่อนใช้จริง):
- โหลดช้าลง 1 วินาที → conversion ลดราว 7%
- มือถือที่โหลดเกิน 3 วินาที → ผู้ใช้ละทิ้ง 53%
- Rakuten 24 (A/B test): LCP ดี → revenue/visitor +53.37%, conversion +33.13%
- Vodafone Italy: LCP ดีขึ้น 31% → ยอดขาย +8%

แหล่ง:
- https://web.dev/articles/vitals
- https://web.dev/articles/optimize-cwv-business
- https://www.conductor.com/academy/page-speed-resources/

## 4. Accessibility (WebAIM Million 2026)

- 95.9% ของ 1,000,000 หน้าแรกมีข้อผิดพลาด WCAG 2 ที่ตรวจพบได้
- เฉลี่ย 56.1 errors/หน้า (เพิ่ม 10.1% จากปี 2025) — แนวโน้มแย่ลงครั้งแรกในรอบ 6 ปี
- ข้อผิดพลาด 6 แบบคิดเป็น 96% ของทั้งหมด
- Contrast ต่ำ: 79.1% ของหน้า (เฉลี่ย 29.6 จุด/หน้า)
- ไม่มี alt ของภาพ: 55.5% ของหน้า
- หน้าแรกเฉลี่ยมี 1,437 elements (+22.5% ใน 1 ปี) — ความซับซ้อนเพิ่มขึ้น

แหล่ง:
- https://webaim.org/projects/million/

## 5. สีและ typography เพื่อการอ่านสบายตา

### ผลการค้นคว้า
- **Dark vs light ไม่มีผู้ชนะเด็ดขาด** — งานวิจัยบางชิ้นไม่พบความต่างของ visual fatigue อย่างมีนัยสำคัญ; dark mode ช่วยลดแสงจ้าในที่มืด แต่ในที่สว่างรูม่านตาขยายทำให้อ่านตัวเล็กยากขึ้น
- **Astigmatism (~50% ของประชากร)** อ่าน ขาวบนดำ ยากกว่า ดำบนขาว (halation/โฟกัสฟุ้ง) → ควรให้ light เป็นค่าเริ่มต้น
- **ขาวสนิท (#fff) เต็มจอสว่าง ทำให้ล้า** → ใช้ off-white
- **WCAG 2:** ข้อความปกติต้อง ≥ 4.5:1 (AA) แต่สูตรไม่ถ่วงน้ำหนักตามการรับรู้จริง
- **APCA (ร่างสำหรับ WCAG 3):** Lc 60 ≈ 4.5:1; Lc 75 ขั้นต่ำสำหรับเนื้อความ ≥18px; Lc 90 เหมาะกับข้อความยาว. ยังไม่ใช่มาตรฐานบังคับ
- ดำสนิทบนขาวสนิท (21:1) ไม่จำเป็น — เทาเข้มบน off-white ให้ Lc สูงพอและนุ่มกว่า
- **ไทย:** สระ/วรรณยุกต์ซ้อนแนวตั้ง ต้อง line-height สูงกว่าละติน; Noto Sans Thai (loopless ออกแบบให้อ่านบนจอเล็ก) และ Sarabun (x-height ใหญ่, ตัดกันของเส้นต่ำ) เป็นตัวเลือกที่ดี; งานวิจัย Chatrangsan & Petrie เทียบขนาด 14/16/18 pt บนแท็บเล็ต

### สีม่วงเป็น primary
- ม่วงอ่านได้ตราบที่ contrast ≥ 4.5:1 — ม่วงเข้มใช้กับพื้นสว่าง, ม่วงอ่อน (lilac) ใช้กับพื้นเข้ม; ม่วงสดโทนเอนไปทางน้ำเงินบนขาวได้ราว 5.3:1
- ม่วงเดิมๆ บนพื้นดำขาดความต่าง → dark mode ต้องยก lightness ขึ้น (ใช้ lilac) และลด saturation กันสีสั่น
- เลือกจากการคำนวณ WCAG contrast กับพื้นจริง: light `#6B3FC0` (6.2:1 — เข้มพอสำหรับตัวเลขใหญ่และลิงก์ แต่ไม่แข็งเท่า `#5B34B8` 7.3:1), dark `#B69CF5` (7.3:1)
- ใช้ม่วงเฉพาะตัวเลข/จุดเน้น ไม่ใช้เป็นพื้นหลังกว้าง เพื่อไม่ให้ล้าตา

แหล่ง:
- https://stephaniewalter.design/blog/yellow-purple-and-the-myth-of-accessibility-limits-color-palettes/
- https://webaim.org/articles/contrast/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast

### ค่าที่เลือก (ตรวจ contrast แล้ว)

| Token | Light | Dark | Contrast กับพื้น (L / D) |
|---|---|---|---|
| bg | `#F7F5F0` | `#1C1D1F` | — |
| fg | `#2B2A26` | `#E4E2DA` | 13.2 / 13.0 |
| muted | `#5E5B52` | `#A3A197` | 6.2 / 6.5 |
| accent (primary, ม่วง) | `#6B3FC0` | `#B69CF5` | 6.2 / 7.3 |

หลักการ: พื้นไม่ใช่ขาว/ดำสนิท · ตัวอักษรไม่ใช่ขาว/ดำสนิท · contrast เนื้อหา ~13:1 (สูงกว่า AA มาก แต่ไม่จ้า) · dark ใช้เทาเข้มไม่ใช่ดำ · สีเน้นตัวเดียว (ม่วง) ไม่พึ่งสีอย่างเดียวในการสื่อความ · body ≥18px, line-height 1.8, น้ำหนัก 400/600 · เคารพ `prefers-color-scheme` และ `prefers-reduced-motion` พร้อมปุ่มสลับธีม

แหล่ง:
- https://pmc.ncbi.nlm.nih.gov/articles/PMC12027292/
- https://www.allaboutvision.com/conditions/computer-vision-syndrome/digital-eye-strain/is-dark-mode-better-for-eyes/
- https://git.apcacontrast.com/documentation/APCAeasyIntro.html
- https://capellic.com/insights/accessible-colors
- https://dl.acm.org/doi/10.1145/3502222
- https://fonts.google.com/noto/specimen/Noto+Sans+Thai

## 6. โครงเนื้อหาที่ใช้ใน prototype (แบบ C · Scroll)

1. ปก: สร้างเว็บที่คนใช้ได้จริง
2. 25% — คนสแกน ไม่ได้อ่าน
3. 2.5s — เกณฑ์ LCP (INP / CLS)
4. −7% — ช้า 1 วินาที
5. 53% — ละทิ้งมือถือ >3 วินาที
6. 95.9% — หน้าแรกไม่ผ่าน WCAG
7. 79.1% — contrast ต่ำ
8. ไม่ต้องดำสนิทบนขาวสนิท (เดโมเทียบสี)
9. สรุป

## 7. Animation library (สำหรับ diagram/animation จำนวนมาก)

เปรียบเทียบจากบทความปี 2026 (ขนาด gzip โดยประมาณ ต่างกันตามแหล่ง):

| Lib | ขนาด | จุดเด่น | จุดอ่อน |
|---|---|---|---|
| **GSAP** (+ `@gsap/react`) | ~23 KB core | **timeline** (label, pause, reverse, seek, scrub), ScrollTrigger, SplitText, MorphSVG, DrawSVG, MotionPath, Flip; ควบคุมละเอียดที่สุด; ฟรีทุก plugin แม้ใช้เชิงพาณิชย์ตั้งแต่ เม.ย. 2025 (Webflow ซื้อกิจการ) | ไม่ใช่ open source (license ของ GSAP); API เป็น imperative ไม่ declarative แบบ React |
| **Motion** (framer-motion) | ~32 KB (ลดได้ ~4.6 KB ด้วย LazyMotion, `useAnimate` mini ~2.3 KB) | declarative, enter/exit, layout animation, gesture, scroll-linked | timeline/sequence แบบ seek/scrub ทำได้จำกัดกว่า GSAP |
| React Spring | ~18 KB | physics-based | ไม่เหมาะกับ sequence ที่กำหนดลำดับเวลา |
| Anime.js | เล็ก | tween เบาๆ | ecosystem/React integration น้อยกว่า |
| CSS / WAAPI | 0 KB | เบาที่สุด, GPU | ลำดับซับซ้อน/scrub ทำเองยาก |

**ข้อสรุปสำหรับโปรเจกต์นี้ → GSAP (`gsap` + `@gsap/react`)**
- งานหลักคือ *อธิบายกระบวนการเป็นขั้นตอน* (request → response ฯลฯ) ต้องการ **timeline ที่หยุด/ถอย/ข้ามขั้น/ลากดูได้** — จุดแข็งของ GSAP
- ต้องการ scroll-driven, วาดเส้น SVG, แยกตัวอักษร (ScrollTrigger / DrawSVG / SplitText) ในอนาคตโดยไม่เพิ่ม lib
- `useGSAP()` จัดการ cleanup และ scope selector ให้ ใช้กับ React 19/StrictMode ได้
- animation เล็กๆ (fade-in, reveal ของสไลด์) ยังใช้ CSS ต่อไป — ไม่ต้องดึง GSAP
- ถ้าภายหลังมี UI ที่ animate ตาม state จำนวนมาก (enter/exit, layout) ค่อยพิจารณา Motion เพิ่มเฉพาะส่วนนั้น

แหล่ง:
- https://blog.logrocket.com/best-react-animation-libraries/
- https://www.pkgpulse.com/guides/best-react-animation-libraries-2026
- https://lab.good-fella.com/blog/gsap-vs-framer-motion-vs-react-spring
- https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/
- https://webflow.com/blog/gsap-becomes-free
- https://motion.dev/docs/react-reduce-bundle-size
