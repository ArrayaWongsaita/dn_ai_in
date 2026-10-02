import { Stack, Text } from '@/shared/components/atoms'
import { FolderTree, Terminal, TimelineControls, type FolderTreeItem } from '@/shared/components/molecules'
import { nodeLabel, terminalScenes } from '@/shared/animation/terminal'
import { useTimeline } from '@/shared/hooks'
import s from './TerminalFlow.module.css'

/** Folder tree + mock terminal + step caption, driven by the terminal scene registry. */
export function TerminalFlow({ sceneId, command }: { sceneId: string; command: string }) {
  const scene = terminalScenes[sceneId]
  if (!scene) throw new Error(`Unknown terminal scene: ${sceneId}`)
  if (scene.command !== command) throw new Error(`Command does not match terminal scene: ${sceneId}`)
  const [scope, tl] = useTimeline(scene.build)
  if (tl.stepCount > 0 && scene.captions.length !== tl.stepCount) {
    throw new Error(`Caption count does not match terminal scene steps: ${sceneId}`)
  }
  const nodes: FolderTreeItem[] = scene.state.nodes.map((node) => ({
    id: node.id,
    name: node.name,
    kind: node.kind,
    depth: node.depth,
    state: node.state,
    label: nodeLabel(node),
  }))

  return (
    <Stack gap="md">
      <div ref={scope} className={s.layout}>
        <Stack gap="md">
          <FolderTree nodes={nodes} />
          <Terminal prompt={scene.state.prompt} command={command} output={scene.state.output} />
        </Stack>
      </div>
      <div className={s.caption} aria-live="polite">
        <Text variant="label">{scene.captions[tl.step] ?? ''}</Text>
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
