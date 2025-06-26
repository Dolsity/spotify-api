import { HashRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Navigator from './components/Navigation/Navigator'

import theme from './theme'

export function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Navigator />
				<Routes>
					<Route path="/" element={<Home />} />
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
