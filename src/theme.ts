import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    success: {
      main: '#1DB954',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E22134',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FF5745',
      contrastText: '#FFFFFF',
    },
    primary: {
      main: '#121212',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#CCCCCC',
      paper: '#212121',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
    },
    divider: '#B3B3B3',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
  },
})

export default theme
