# Content index

รวม 1 บท · 18 สไลด์

> สร้างอัตโนมัติจาก `src/content/` ด้วย `pnpm content:index` — **ห้ามแก้ด้วยมือ** (ภาพรวมเชิงเล่าเรื่องอยู่ใน `docs/content-map.md`)

## 1. Git — `/git`

ปุ่มย้อนกลับให้โค้ด และพื้นที่ทำงานร่วมกัน · 18 สไลด์ · `src/content/chapters/git/slides.ts`

1. **ปก** Git — ปุ่มย้อนกลับให้โค้ด · วิธีทำงานร่วมกับคนอื่น
2. **GitFlow** scene=overview · command=— — รู้จัก 4 พื้นที่ของ Git · ไฟล์จะเดินทางระหว่างพื้นที่เหล่านี้เมื่อใช้คำสั่ง
3. **GitFlow** scene=init · command=git init — เริ่มติดตามโฟลเดอร์ด้วย Git · สร้างที่เก็บประวัติว่าง โดยไฟล์เดิมยังอยู่ที่เดิม
4. **GitFlow** scene=status · command=git status — ตรวจสถานะก่อนทำต่อ · ดูว่าไฟล์ไหนเปลี่ยนแล้ว เตรียม commit แล้ว หรือยังเหมือนเดิม
5. **GitFlow** scene=add · command=git add style.css — เลือกไฟล์ที่จะบันทึก · git add ย้ายไฟล์เข้าพื้นที่เตรียม แต่ยังไม่สร้าง commit
6. **GitFlow** scene=commit · command=git commit -m "Add project files" — บันทึกภาพรวมของโฟลเดอร์ · จัดไฟล์เข้าเฟรม แล้วกดชัตเตอร์เพื่อสร้างจุดที่ย้อนกลับมาได้
7. **GitFlow** scene=log · command=git log --oneline — เปิดดูประวัติที่บันทึกไว้ · รายการเรียงจาก commit ล่าสุดไปหา commit เก่า
8. **GitFlow** scene=recap · command=# edit style.css ↵ $ git status ↵ $ git add style.css ↵ $ git commit -m "Add stylesheet" — วนรอบแก้ไฟล์ · เตรียม · บันทึก · ดูสถานะ เลือกไฟล์ แล้วสร้าง commit จนสถานะสะอาด
9. **GitFlow** scene=restore · command=git restore app.js — ย้อนการแก้ไขไฟล์ · เรียกเวอร์ชันล่าสุดที่ commit ไว้กลับมาแทนไฟล์ที่เสียหาย
10. **GitFlow** scene=branch · command=git branch feature ↵ $ git switch feature — สร้าง branch แล้วสลับไปทำงาน · feature เริ่มจาก commit เดียวกับ main; ประวัติจะแยกเมื่อมี commit ใหม่
11. **GitFlow** scene=merge · command=git merge feature — รวมงานจากอีกสาย · นำ commit ใน feature มารวมบน main
12. **ข้อความ** แก้บรรทัดเดียวกันทั้งสองฝั่ง = conflict — Git รวมให้เองไม่ได้ ถ้าเจอแบบนี้ขอ Claude ช่วยตรวจและแก้ทีละส่วนได้
13. **ข้อความ** ก่อน push ขึ้น GitHub ต้องมีบัญชีและล็อกอิน — Lab จะพาสมัครและเข้าสู่ระบบก่อนลองส่งงานขึ้น remote _(GitHub Docs · Getting started with your GitHub account (docs.github.com))_
14. **GitFlow** scene=remote · command=git remote add origin https://github.com/example/site.git — ตั้งชื่อปลายทางบน GitHub · origin เป็นชื่อเรียก URL ของ repository ระยะไกล
15. **GitFlow** scene=push · command=git push origin main — ส่งประวัติขึ้น GitHub · push ส่ง commit จากเครื่องไปยัง remote โดยยังเก็บสำเนาในเครื่อง
16. **GitFlow** scene=clone · command=git clone https://github.com/example/site.git — คัดลอก repository มาเริ่มงาน · clone นำ commit และไฟล์จาก GitHub มาไว้ในเครื่อง
17. **GitFlow** scene=pull · command=git pull origin main — ดึงงานล่าสุดจาก GitHub · pull นำ commit ใหม่จาก remote เข้ามาและอัปเดตไฟล์ในเครื่อง
18. **ข้อความ** ชีตคำสั่ง Git — git init — ให้ Git เริ่มติดตามโฟลเดอร์ · git status — ดูสถานะไฟล์ ↵ git add style.css — เตรียมไฟล์เข้า commit · git commit -m "Add project files" — บันทึก snapshot ↵ git commit -m "Add stylesheet" — บันทึก snapshot · git log --oneline — ดูประวัติแบบย่อ ↵ git restore app.js — คืนไฟล์จาก commit ล่าสุด · git branch feature — สร้างสายงาน feature ↵ git switch feature — สลับไปสายงาน feature · git merge feature — รวม feature เข้าสายงานปัจจุบัน ↵ git remote add origin https://github.com/example/site.git — ตั้งชื่อ URL ปลายทาง ↵ git push origin main — ส่ง commit ขึ้น GitHub ↵ git clone https://github.com/example/site.git — คัดลอก repository ลงเครื่อง ↵ git pull origin main — ดึง commit ล่าสุดจาก GitHub
