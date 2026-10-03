/** All TaskFlow content is fictional; shared by the three page-building scenes. */
export const webFlowExample = {
  domain: 'taskflow.example', address: '192.0.2.10', path: '/board',
  name: 'TaskFlow', label: 'ตัวอย่าง · ข้อมูลสมมติ', board: 'บอร์ดงานทีม',
  columns: ['ต้องทำ', 'กำลังทำ', 'เสร็จแล้ว'],
  tasks: [
    { title: 'ออกแบบหน้าแรก', owner: 'มิน', column: 0 },
    { title: 'เตรียมข้อมูลตัวอย่าง', owner: 'นัท', column: 1 },
    { title: 'ตั้งชื่อโปรเจกต์', owner: 'พลอย', column: 2 },
  ],
  move: 'ย้ายไปเสร็จแล้ว', moved: 'ย้ายงานแล้ว · ไม่ได้บันทึกข้อมูลจริง',
} as const
