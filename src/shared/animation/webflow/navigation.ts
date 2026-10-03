export interface WebFlowNavigationDefinition {
  kind: 'navigation'
  mode: 'mpa' | 'spa'
  title: string
  captions: string[]
  build: (tl: gsap.core.Timeline) => void
}
