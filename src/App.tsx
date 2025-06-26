import { HashRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'

import Navigator from './components/Navigation/Navigator'

import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import NotFound from './pages/NotFound'
import Deauthorize from './pages/Deauthorize'

import theme from './theme'

export function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigator />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="deauthorize" element={<Deauthorize />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}
