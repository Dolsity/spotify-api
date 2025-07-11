import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { WrappedApp } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WrappedApp />
  </StrictMode>
)
