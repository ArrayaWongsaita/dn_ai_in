import s from './FolderTree.module.css'

export interface FolderTreeItem {
  id: string
  name: string
  kind: 'folder' | 'file'
  depth: 0 | 1
  state: 'normal' | 'current' | 'new' | 'gone'
  label: string
}

interface Props { nodes: FolderTreeItem[] }

/** Folder diagram for the terminal story; state shows through marker + border, never colour alone. */
export function FolderTree({ nodes }: Props) {
  return (
    <section className={s.tree} aria-label="แผนผังโฟลเดอร์">
      <span className={s.title}>แผนผังโฟลเดอร์</span>
      <ul className={s.list}>
        {nodes.map((node) => (
          <li
            key={node.id}
            className={s.node}
            data-el={`tree-${node.id}`}
            data-kind={node.kind}
            data-state={node.state}
            data-depth={node.depth}
            aria-label={node.label}
          >
            <span className={s.name}>{node.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
