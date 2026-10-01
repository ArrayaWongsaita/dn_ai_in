import { HttpExchange } from '@/shared/components/organisms'
import { Demo, DevLayout, Section } from './DevLayout'

/** /dev/animations — GSAP-driven explainers with dummy data. Each one is a reusable organism. */
export default function DevAnimations() {
  return (
    <DevLayout title="Animations">
      <Section title="HttpExchange" note="Request → Response (packet วิ่งพร้อม trail, เอียงตามแรงวิ่ง, ผ่าน relay 2 จุด) · เล่นอัตโนมัติ, หยุด/ขั้นตอน/ลากดูได้ · prefers-reduced-motion จะข้ามไปเฟรมสุดท้าย">
        <Demo name="GET → 200 OK">
          <HttpExchange method="GET" path="/index.html" status={200} statusText="OK" />
        </Demo>
        <Demo name="POST → 201 Created">
          <HttpExchange method="POST" path="/api/users" status={201} statusText="Created" host="api.example.com" />
        </Demo>
        <Demo name="GET → 404 Not Found">
          <HttpExchange method="GET" path="/missing" status={404} statusText="Not Found" />
        </Demo>
      </Section>
    </DevLayout>
  )
}
