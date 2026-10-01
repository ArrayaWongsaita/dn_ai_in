import { Heading, Kicker, Screen, Stack } from '@/shared/components/atoms'
import { ChromeBar, ThemeToggle } from '@/shared/components/molecules'
import { TocList } from '@/shared/components/organisms'
import { chapters } from '@/content'

export default function Home() {
  return (
    <Screen as="main">
      <ChromeBar><ThemeToggle /></ChromeBar>
      <Stack gap="lg">
        <Stack>
          <Kicker>การสร้างเว็บไซต์</Kicker>
          <Heading level="display">{'สร้างเว็บที่\nคนใช้ได้จริง'}</Heading>
        </Stack>
        <TocList items={chapters.map((c) => ({ to: `/${c.slug}`, title: c.title, summary: c.summary }))} />
      </Stack>
    </Screen>
  )
}
