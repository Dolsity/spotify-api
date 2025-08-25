import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useIsOnline } from 'react-use-is-online'

import CloudOffIcon from '@mui/icons-material/CloudOff'
import { Box, LinearProgress, Typography } from '@mui/material'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { setToken } from '../slices/TokenSlice'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const token = useAppSelector((state) => state.token)
  const dispatch = useAppDispatch()

  const { isOnline, isOffline } = useIsOnline()

  // Prevent double redirects
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (isOffline) return

    const redirectBack = () => {
      if (hasRedirected.current) return
      hasRedirected.current = true
      console.log('Attempting to redirect back...')
      if (sessionStorage.getItem('redirect')) {
        console.log('Found redirect:', sessionStorage.getItem('redirect'))
        navigate(sessionStorage.getItem('redirect') || '/')
        sessionStorage.removeItem('redirect')
      } else {
        navigate('/')
      }
    }

    const doAuthFlow = () => {
      console.log('Starting auth flow:', window.location.href)
      const query = new URLSearchParams({
        response_type: 'token',
        client_id: '2a18522306c8438d836a14d4178186bc',
        show_dialog: 'false',
        state: 'spotify',
        redirect_uri: `${window.location.origin}/login`, // your redirect
        scope:
          'user-top-read user-read-recently-played user-follow-read user-library-read user-read-private user-read-playback-state user-read-currently-playing',
      })
      window.location.href = 'https://accounts.spotify.com/authorize?' + query.toString()
    }

    const checkToken = async (tk: string) => {
      console.log('Checking token')
      try {
        const res = await fetch('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${tk}` },
        })
        if (res.status === 401) {
          console.log('Token is invalid/expired: Restarting auth flow...')
          doAuthFlow()
          return
        }
        redirectBack()
      } catch (error) {
        console.error('Error validating token', error)
        doAuthFlow()
      }
    }

    if (location.hash.includes('access_token=')) {
      console.log('Found hash')
      const matches = location.hash.match(/access_token=([^&]*)/)
      if (matches) {
        console.log('Found access token')
        const accessToken = matches[1]
        dispatch(setToken(accessToken))
        window.location.hash = ''
        checkToken(accessToken)
        return
      }
    }

    if (token) {
      console.log('Found token in state')
      checkToken(token)
      return
    }

    doAuthFlow()
  }, [dispatch, location.hash, token, isOffline, navigate])

  return isOnline ? (
    <LinearProgress />
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CloudOffIcon sx={{ mt: 16, height: 96, width: 96 }} />
      <Typography sx={{ mt: 4 }} variant="h5">
        You&apos;re Offline!
      </Typography>
      <Typography sx={{ mt: 1, textAlign: 'center' }}>
        Waiting for Internet Connection
        <br />
        before proceeding...
      </Typography>
    </Box>
  )
}

export default Login
