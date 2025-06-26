import { createTheme } from '@mui/material'

const palette = {
	success: {
		main: '#1DB954',
	},
	error: {
		main: '#E22134',
	},
	warning: {
		main: '#FF5722',
	},
}

const theme = createTheme({
	palette: {
		...palette,
		primary: {
			main: '#121212',
			contrastText: '#DDDDDD',
		},
		background: {
			paper: '#161616',
			default: '#20262D',
		},
		text: {
			primary: '#FFFFFF',
			secondary: '#B3B3B3',
		},
		divider: '#222222',
		action: {
			active: '#FFFFFF',
			hover: '#333333',
			selected: '#444444',
			disabled: '#555555',
			disabledBackground: '#666666',
		},
	},
})

export default theme
