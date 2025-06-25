import { HashRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}
