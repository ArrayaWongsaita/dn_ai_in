# Content index

รวม 5 บท · 15 สไลด์

> สร้างอัตโนมัติจาก `src/content/` ด้วย `pnpm content:index` — **ห้ามแก้ด้วยมือ** (ภาพรวมเชิงเล่าเรื่องอยู่ใน `docs/content-map.md`)

## 1. คนอ่านเว็บอย่างไร — `/reading`

คนสแกน ไม่ได้อ่าน · 3 สไลด์ · `src/content/chapters/reading/slides.ts`

1. **ปก** คนอ่านเว็บอย่างไร — คนสแกน ไม่ได้อ่าน
2. **ตัวเลข** 25% — ของข้อความที่ผู้ใช้อ่านจริงในหนึ่งหน้า — ที่เหลือคือการสแกน _(Nielsen Norman Group)_
3. **ข้อความ** หัวข้อ · bullet · ตัวหนา — ช่วยให้สแกนได้ — F-pattern คือผลของเนื้อหาไร้โครงสร้าง ไม่ใช่เป้าหมายให้ทำตาม _(Nielsen Norman Group)_

## 2. ความเร็ว — `/speed`

Core Web Vitals และผลต่อรายได้ · 5 สไลด์ · `src/content/chapters/speed/slides.ts`

1. **ปก** ความเร็ว — Core Web Vitals และผลต่อรายได้
2. **ตัวเลข** 2.5s — เวลาที่ LCP ควรเสร็จ · INP ≤ 200ms · CLS ≤ 0.1 _(web.dev · Core Web Vitals)_
3. **ตัวเลข** −7% — conversion ต่อทุก 1 วินาทีที่ช้าลง _(Conductor · รวม case study)_
4. **ตัวเลข** 53% — ของผู้ใช้มือถือละทิ้งหน้าที่โหลดเกิน 3 วินาที _(web.dev)_
5. **ตัวเลข** +33.13% — conversion ของ Rakuten 24 เมื่อ LCP ดีขึ้น (A/B test) _(web.dev)_

## 3. การเข้าถึง — `/accessibility`

WebAIM Million 2026 · 4 สไลด์ · `src/content/chapters/accessibility/slides.ts`

1. **ปก** การเข้าถึง — WebAIM Million 2026 · 1,000,000 หน้าแรก
2. **ตัวเลข** 95.9% — ของหน้าแรกมีข้อผิดพลาด WCAG ที่ตรวจพบได้ _(WebAIM Million 2026)_
3. **ตัวเลข** 79.1% — contrast ต่ำ — ปัญหาอันดับหนึ่ง แก้ได้ในไม่กี่บรรทัด CSS _(WebAIM Million 2026)_
4. **ตัวเลข** 55.5% — ของหน้ามีภาพที่ไม่มี alt _(WebAIM Million 2026)_

## 4. สีที่อ่านสบายตา — `/color`

contrast, off-white, ม่วง · 2 สไลด์ · `src/content/chapters/color/slides.ts`

1. **ปก** สีที่อ่านสบายตา — contrast พอดี ไม่จ้า
2. **เทียบ** ไม่ต้องดำสนิทบนขาวสนิท: ดำ #000 บนขาว #fff (contrast 21 : 1 — จ้าเกินไป) ⇄ #2b2a26 บน #f7f5f0 (contrast 13.2 : 1 — สบายตา) — ต่ำกว่า 4.5 : 1 คืออ่านยาก · สูงเกินไปก็ล้าตา

## 5. สรุป — `/summary`

สามข้อที่ต้องจำ · 1 สไลด์ · `src/content/chapters/summary/slides.ts`

1. **ข้อความ** สแกนง่าย · เร็ว · ทุกคนใช้ได้
