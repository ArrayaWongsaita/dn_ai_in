import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { applyStoredTheme } from '@/shared/lib/theme'
import '@/shared/styles/tokens.css'
import '@/shared/styles/base.css'
import App from './app/App'

applyStoredTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
