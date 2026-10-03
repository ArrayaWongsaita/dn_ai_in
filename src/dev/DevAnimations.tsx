import { GitFlow, HttpExchange, LlmFlow, TerminalFlow, WebFlow } from '@/shared/components/organisms'
import { SeenContext } from '@/shared/hooks'
import { gitFlowScenes } from '@/shared/animation/gitflow'
import { llmFlowScenes } from '@/shared/animation/llmflow'
import { terminalScenes } from '@/shared/animation/terminal'
import { webFlowScenes } from '@/shared/animation/webflow'
import type { WebFlowSceneId, LlmFlowSceneId } from '@/shared/types/slide'
import { Demo, DevLayout, Section } from './DevLayout'
import { HeldTimelineDemo } from './HeldTimelineDemo'

/** /dev/animations — GSAP-driven explainers with dummy data. Each one is a reusable organism. */
export default function DevAnimations() {
  return (
    <DevLayout title="Animations">
      <Section title="Held timeline" note="ค้างที่คำถาม รวมถึง reduced-motion · กดถัดไปเพื่อดูเฉลย">
        <SeenContext value={true}>
          <Demo name="hold: true"><HeldTimelineDemo /></Demo>
        </SeenContext>
      </Section>
      <Section title="HttpExchange" note="Request → Response (packet วิ่งพร้อม trail, เอียงตามแรงวิ่ง, ผ่าน relay 2 จุด) · เล่นอัตโนมัติ, หยุด/ขั้นตอน/ลากดูได้ · prefers-reduced-motion จะข้ามไปเฟรมสุดท้าย">
        <SeenContext value={true}>
          <Demo name="GET → 200 OK">
            <HttpExchange method="GET" path="/index.html" status={200} statusText="OK" />
          </Demo>
          <Demo name="POST → 201 Created">
            <HttpExchange method="POST" path="/api/users" status={201} statusText="Created" host="api.example.com" />
          </Demo>
          <Demo name="GET → 404 Not Found">
            <HttpExchange method="GET" path="/missing" status={404} statusText="Not Found" />
          </Demo>
        </SeenContext>
      </Section>
      <Section title="WebFlow" note="ตัวอย่าง TaskFlow · HTTP 200 และ 404 · เล่น หยุด เลื่อนทีละขั้น และลากดูได้">
        <SeenContext value={true}>
          {Object.entries(webFlowScenes).map(([sceneId, scene]) => (
            <Demo key={sceneId} name={scene.title}>
              <WebFlow sceneId={sceneId as WebFlowSceneId} />
            </Demo>
          ))}
        </SeenContext>
      </Section>
      <Section title="GitFlow" note="ทุก scene ที่ลงทะเบียนจะแสดงที่นี่โดยอัตโนมัติ">
        <SeenContext value={true}>
          {Object.entries(gitFlowScenes).map(([sceneId, scene]) => (
            <Demo key={sceneId} name={scene.title}>
              <GitFlow sceneId={sceneId} command={scene.command} />
            </Demo>
          ))}
        </SeenContext>
      </Section>
      <Section title="LlmFlow" note="ทุก scene ที่ลงทะเบียนจะแสดงที่นี่โดยอัตโนมัติ · ภาพวงจร prompt → token → โมเดล → คำตอบ">
        <SeenContext value={true}>
          {Object.entries(llmFlowScenes).map(([sceneId, scene]) => (
            <Demo key={sceneId} name={scene.title}>
              <LlmFlow sceneId={sceneId as LlmFlowSceneId} />
            </Demo>
          ))}
        </SeenContext>
      </Section>
      <Section title="TerminalFlow" note="ทุก scene ที่ลงทะเบียนจะแสดงที่นี่โดยอัตโนมัติ">
        <SeenContext value={true}>
          {Object.entries(terminalScenes).map(([sceneId, scene]) => (
            <Demo key={sceneId} name={scene.title}>
              <TerminalFlow sceneId={sceneId} command={scene.command} />
            </Demo>
          ))}
        </SeenContext>
      </Section>
    </DevLayout>
  )
}
