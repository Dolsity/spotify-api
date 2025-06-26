import { createApi } from '@reduxjs/toolkit/query/react'
import spotifyApiQuery from '../utils/spotifyApiQuery'

export type RequireToken = {
  token: string
}

const api = createApi({
  reducerPath: 'api',
  baseQuery: spotifyApiQuery,
  tagTypes: ['SavedTracks', 'SavedArtists', 'SavedAlbums'],
  endpoints: (builder) => ({
    getRecents: builder.query<SpotifyApi.PlayHistoryObject[], RequireToken>({
      query: ({ token }: RequireToken) => ['getMyRecentlyPlayedTracks', [{ limit: 50 }], token],
      transformResponse: (res: { items: SpotifyApi.PlayHistoryObject[] }) => res.items,
    }),
  }),
})

export default api
export const { useGetRecentsQuery } = api
