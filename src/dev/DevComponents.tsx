import { AtomsSection } from './AtomsSection'
import { DevLayout } from './DevLayout'
import { MoleculesSection } from './MoleculesSection'
import { TokensSection } from './TokensSection'

/** /dev/components — every shared component in isolation, with dummy props. */
export default function DevComponents() {
  return (
    <DevLayout title="Component gallery">
      <TokensSection />
      <AtomsSection />
      <MoleculesSection />
    </DevLayout>
  )
}
