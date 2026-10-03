export interface WebFlowDiagramDefinition {
  kind: 'diagram'
  title: string
  nodes: { label: string; note: string }[]
  steps: { text: string; caption: string }[]
  build: (tl: gsap.core.Timeline) => void
}
