import type { HttpExchangeData } from '@/shared/types/animation'
import type { WebFlowSceneId } from '@/shared/types/slide'

export interface WebFlowHttpSceneDefinition {
  kind: 'http'
  title: string
  http: HttpExchangeData
}

/** HTTP scenes delegate playback and captions to HttpExchange. */
export const webFlowScenes = {
  'http-200': {
    kind: 'http', title: 'HTTP · ขอหน้าบอร์ดงานสำเร็จ',
    http: { method: 'GET', path: '/board', status: 200, statusText: 'OK', host: 'taskflow.local' },
  },
  'http-404': {
    kind: 'http', title: 'HTTP · ไม่พบหน้าที่ขอ',
    http: { method: 'GET', path: '/missing', status: 404, statusText: 'Not Found', host: 'taskflow.local' },
  },
} satisfies Record<WebFlowSceneId, WebFlowHttpSceneDefinition>
