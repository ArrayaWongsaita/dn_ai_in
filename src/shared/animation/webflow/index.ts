import { apiDb, type WebFlowApiDefinition } from './api-db'
import { mpa } from './mpa'
import { spa } from './spa'
import type { WebFlowNavigationDefinition } from './navigation'
import { clientServer } from './client-server'
import { dns } from './dns'
import { buildHtml, buildCss, buildJs, type WebFlowPageDefinition } from './page'
import type { WebFlowDiagramDefinition } from './types'
import type { HttpExchangeData } from '@/shared/types/animation'
import type { WebFlowSceneId } from '@/shared/types/slide'

export interface WebFlowHttpSceneDefinition {
  kind: 'http'
  title: string
  http: HttpExchangeData
}

/** HTTP scenes delegate playback and captions to HttpExchange. */
export const webFlowScenes = {
  'client-server': clientServer,
  dns, mpa, spa, 'api-db': apiDb,
  'build-html': buildHtml,
  'build-css': buildCss,
  'build-js': buildJs,
  'http-200': {
    kind: 'http', title: 'HTTP · ขอหน้าบอร์ดงานสำเร็จ',
    http: { method: 'GET', path: '/board', status: 200, statusText: 'OK', host: 'taskflow.local' },
  },
  'http-404': {
    kind: 'http', title: 'HTTP · ไม่พบหน้าที่ขอ',
    http: { method: 'GET', path: '/missing', status: 404, statusText: 'Not Found', host: 'taskflow.local' },
  },
} satisfies Record<WebFlowSceneId, WebFlowHttpSceneDefinition | WebFlowDiagramDefinition | WebFlowPageDefinition | WebFlowNavigationDefinition | WebFlowApiDefinition>

export { revealThinkAnswer } from './page'
