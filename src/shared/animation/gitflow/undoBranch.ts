import type { GitFlowSceneDefinition } from './index'

/** Restore, branch and merge builders are added in the undo/branch tickets. */
export const undoBranchScenes = {} satisfies Record<string, GitFlowSceneDefinition>
