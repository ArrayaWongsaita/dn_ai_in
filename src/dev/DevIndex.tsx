import { TocList } from '@/shared/components/organisms'
import { DevLayout } from './DevLayout'

const items = [
  { to: '/dev/slides', title: 'Slide showcase', summary: 'ทุกชนิดสไลด์ด้วยข้อมูลสมมติ (deck จริง)' },
  { to: '/dev/animations', title: 'Animations', summary: 'HTTP request/response (GSAP timeline)' },
  { to: '/dev/components', title: 'Component gallery', summary: 'atoms · molecules · organisms · design tokens' },
]

export default function DevIndex() {
  return (
    <DevLayout title="Dev pages" back={false}>
      <TocList items={items} />
    </DevLayout>
  )
}
