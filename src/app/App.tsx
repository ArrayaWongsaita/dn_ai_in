import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import ChapterPage from '@/pages/ChapterPage'
import Home from '@/pages/Home'

// Dev pages (/dev/*): the `import.meta.env.DEV` guard is replaced by `false` in production builds,
// so the dynamic import is dropped and no dev code or dummy content is shipped.
const DevRoutes = import.meta.env.DEV ? lazy(() => import('@/dev/DevRoutes')) : null

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        {DevRoutes && <Route path="/dev/*" element={<DevRoutes />} />}
        <Route path="/:slug" element={<ChapterPage />} />
      </Routes>
    </Suspense>
  )
}
