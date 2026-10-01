import { Route, Routes } from 'react-router'
import DevAnimations from './DevAnimations'
import DevComponents from './DevComponents'
import DevIndex from './DevIndex'
import DevSlides from './DevSlides'

/** Mounted at /dev/* — only exists in dev builds (see app/App.tsx). */
export default function DevRoutes() {
  return (
    <Routes>
      <Route index element={<DevIndex />} />
      <Route path="slides" element={<DevSlides />} />
      <Route path="animations" element={<DevAnimations />} />
      <Route path="components" element={<DevComponents />} />
    </Routes>
  )
}
