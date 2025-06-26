// pages/Deauthorize.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setToken } from '../slices/TokenSlice'

const Deauthorize = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setToken(null))
    localStorage.removeItem('token')
    sessionStorage.clear()

    // Redirect user to Spotify's app management page
    window.location.href = 'https://www.spotify.com/account/apps/'
  }, [dispatch, navigate])

  return null
}

export default Deauthorize
