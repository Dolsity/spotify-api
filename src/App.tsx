import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'

import Navigator from './components/Navigation/Navigator'

import Home from './pages/Home'
import Artist from './pages/Artist'
import TopArtists from './pages/TopArtists'
import Track from './pages/Track'
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
        <Box minWidth={300}>
          <Navigator />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="top-artists">
              <Route index element={<Navigate to="short-term" replace />} />
              <Route path="short-term" element={<TopArtists />} />
              <Route path="medium-term" element={<TopArtists />} />
              <Route path="long-term" element={<TopArtists />} />
              <Route path="*" element={<Navigate to="short-term" replace />} />
            </Route>
            <Route path="track">
              <Route index element={<Navigate to="" replace />} />
              <Route path=":id" element={<Track />} />
            </Route>
            <Route path="artist">
              <Route index element={<Navigate to="" replace />} />
              <Route path=":id" element={<Artist />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="deauthorize" element={<Deauthorize />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
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
