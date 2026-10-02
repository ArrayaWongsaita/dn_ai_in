import { Fragment } from 'react'
import { Badge, Stack, Text } from '@/shared/components/atoms'
import { TimelineControls } from '@/shared/components/molecules'
import { llmFlowScenes, type LlmFlowSceneDefinition } from '@/shared/animation/llmflow'
import type { LlmFlowSceneId } from '@/shared/types/slide'
import { useTimeline } from '@/shared/hooks'
import s from './LlmFlow.module.css'

/** Typed lookup until every scene is registered (ticket 03 flips the registry to a full Record). */
const scenes = llmFlowScenes as Partial<Record<LlmFlowSceneId, LlmFlowSceneDefinition>>

/**
 * The shared LLM cycle diagram plus whichever sections the scene state provides, driven by the
 * scene's GSAP timeline. New scenes add state, not JSX — see LlmFlowSceneState for the hooks.
 */
export function LlmFlow({ sceneId }: { sceneId: LlmFlowSceneId }) {
  const scene = scenes[sceneId]
  if (!scene) throw new Error(`Unknown LlmFlow scene: ${sceneId}`)
  const [scope, tl] = useTimeline(scene.build)
  const { state } = scene

  return (
    <Stack gap="md">
      <div ref={scope} className={s.diagram}>
        <section className={s.cycle} role="group" aria-label="วงจรการทำงานของ LLM">
          {state.parts.map((part, i) => (
            <Fragment key={part.id}>
              <div
                className={s.part}
                data-el={`part-${part.id}`}
                data-part={part.id}
                data-active={part.active ? 'true' : undefined}
              >
                <strong className={s.partLabel}>{part.label}</strong>
                <span className={s.partNote}>{part.note}</span>
                {part.sample && <code className={s.partSample}>{part.sample}</code>}
              </div>
              {i < state.parts.length - 1 && (
                <span className={s.arrow} data-el={`arrow-${i}`} aria-hidden="true">→</span>
              )}
            </Fragment>
          ))}
          <span className={s.loopArrow} data-el="arrow-loop">↺ วนกลับไปทำนายชิ้นถัดไป</span>
        </section>

        {state.prompt && (
          <section className={s.block} data-el="prompt" aria-label="prompt ของตัวอย่าง">
            <div className={s.blockHead}><Badge>Prompt</Badge></div>
            <p className={s.body}>{state.prompt}</p>
          </section>
        )}

        {state.tokens && (
          <section className={s.block} aria-label="ข้อความถูกตัดเป็น token">
            <div className={s.blockHead}>
              <Badge>Token</Badge>
              <Badge tone="accent">ตัวอย่าง</Badge>
            </div>
            <div className={s.tokenRow} data-el="tokens">
              {state.tokens.map((token) => (
                <span className={s.token} key={token.id} data-el={`token-${token.id}`}>{token.text}</span>
              ))}
            </div>
          </section>
        )}

        {state.candidates && (
          <section className={s.block} aria-label="ชิ้นถัดไปที่เป็นไปได้กับความน่าจะเป็นจำลอง">
            <div className={s.blockHead}>
              <Badge>ตัวเลือกถัดไป</Badge>
              <Badge>ตัวเลขจำลอง</Badge>
              <Badge tone="accent">ตัวอย่าง</Badge>
            </div>
            <div className={s.candidates}>
              {state.candidates.map((candidate) => (
                <div
                  className={s.candidate}
                  key={candidate.id}
                  data-el={`candidate-${candidate.id}`}
                  data-selected={candidate.selected ? 'true' : undefined}
                  data-wrong={candidate.wrong ? 'true' : undefined}
                >
                  <code className={s.candidateText}>{candidate.text}</code>
                  <span className={s.candidateBar}>
                    <i style={{ width: `${Math.round(candidate.probability * 100)}%` }} />
                  </span>
                  <span className={s.candidateValue}>{Math.round(candidate.probability * 100)}%</span>
                  {candidate.note && <span className={s.candidateNote}>{candidate.note}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {state.answer && (
          <section className={s.block} data-el="answer" aria-label="คำตอบที่ต่อทีละชิ้น">
            <div className={s.blockHead}><Badge>คำตอบ</Badge></div>
            <p className={s.body}>
              {state.answer.map((piece, i) => (
                <span key={i} data-el={`answer-piece-${i}`}>{piece}</span>
              ))}
            </p>
          </section>
        )}

        {state.context && (
          <section className={s.block} aria-label="context window ของบทสนทนา">
            <div className={s.blockHead}><Badge>Context window</Badge></div>
            <div className={s.contextWindow} data-el="context-window">
              {state.context.map((item) => (
                <div
                  className={s.contextItem}
                  key={item.id}
                  data-el={`context-item-${item.id}`}
                  data-overflow={item.overflow ? 'true' : undefined}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </section>
        )}

        {state.verdict && (
          <div className={s.verdict} data-el="verdict">
            <Text variant="label">{state.verdict}</Text>
          </div>
        )}
      </div>

      <div className={s.caption} aria-live="polite">
        <Text variant="label">{state.caption}</Text>
      </div>
      <TimelineControls
        playing={tl.playing}
        progress={tl.progress}
        canPrev={tl.step > 0}
        canNext={tl.step < tl.stepCount - 1}
        onToggle={tl.toggle}
        onRestart={tl.restart}
        onPrev={() => tl.goToStep(tl.step - 1)}
        onNext={() => tl.goToStep(tl.step + 1)}
        onSeek={tl.seek}
      />
    </Stack>
  )
}
