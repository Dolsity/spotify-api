import SpotifyWebApi from 'spotify-web-api-js'
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'

import { setError } from '../slices/ErrorSlice'

export default (async ([func, args, token], { dispatch }) => {
  const spotifyApi = new SpotifyWebApi()
  spotifyApi.setAccessToken(token)

  try {
    // @ts-expect-error: Dynamic function access on spotifyApi may not be type-safe
    return { data: await spotifyApi[func](...args) }
  } catch (err) {
    dispatch(setError(err as Error))
    return { error: err as Error }
  }
}) satisfies BaseQueryFn<
  [func: keyof SpotifyWebApi.SpotifyWebApiJs, args: unknown[], token: string],
  unknown,
  object
>
