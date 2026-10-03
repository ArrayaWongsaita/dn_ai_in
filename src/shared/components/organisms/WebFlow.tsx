import { webFlowScenes } from '@/shared/animation/webflow'
import type { WebFlowHttpData, WebFlowSceneId } from '@/shared/types/slide'
import { WebFlowDiagram } from './WebFlowDiagram'
import { WebFlowNavigation } from './WebFlowNavigation'
import { WebFlowPage } from './WebFlowPage'
import { HttpExchange } from './HttpExchange'
import s from './WebFlow.module.css'

/** Registered HTTP scenes reuse HttpExchange's timeline, captions and controls. */
export function WebFlow({ sceneId, http, think = false }: { sceneId: WebFlowSceneId; http?: WebFlowHttpData; think?: boolean }) {
  const scene = webFlowScenes[sceneId]
  if (scene.kind === 'navigation') return <WebFlowNavigation key={`${sceneId}-${think}`} scene={scene} think={think} />
  if (scene.kind === 'page') return <WebFlowPage key={`${sceneId}-${think}`} scene={scene} think={think} />
  if (scene.kind === 'diagram') return <WebFlowDiagram scene={scene} />
  const status = http?.status ?? scene.http.status
  const statusText = status === 200 ? 'OK' : status === 404 ? 'Not Found' : ''
  return (
    <div className={s.diagram}>
      <HttpExchange {...scene.http} {...http} status={status} statusText={statusText} />
    </div>
  )
}
