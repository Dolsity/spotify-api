import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { WrappedApp } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WrappedApp />
  </StrictMode>
)
