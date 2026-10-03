import { webFlowScenes } from '@/shared/animation/webflow'
import type { WebFlowHttpData, WebFlowSceneId } from '@/shared/types/slide'
import { HttpExchange } from './HttpExchange'
import s from './WebFlow.module.css'

/** Registered HTTP scenes reuse HttpExchange's timeline, captions and controls. */
export function WebFlow({ sceneId, http }: { sceneId: WebFlowSceneId; http?: WebFlowHttpData }) {
  const scene = webFlowScenes[sceneId]
  const status = http?.status ?? scene.http.status
  const statusText = status === 200 ? 'OK' : status === 404 ? 'Not Found' : ''
  return (
    <div className={s.diagram}>
      <HttpExchange {...scene.http} {...http} status={status} statusText={statusText} />
    </div>
  )
}
