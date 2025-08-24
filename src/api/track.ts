import api, { RequireToken } from './api'

const track = api.injectEndpoints({
  endpoints: (builder) => ({
    getTopTracks: builder.query<
      SpotifyApi.TrackObjectFull[],
      {
        limit?: number
        offset?: number
        time_range: 'short_term' | 'medium_term' | 'long_term'
      } & RequireToken
    >({
      query: ({ token, ...args }) => ['getMyTopTracks', [args], token],
      transformResponse: (res) => res.items,
    }),
    getTracks: builder.query<SpotifyApi.TrackObjectFull[], { ids: string[] } & RequireToken>({
      query: ({ token, ids }) => ['getTracks', [ids], token],
      transformResponse: (res) => res.tracks,
    }),
    getTrack: builder.query<SpotifyApi.TrackObjectFull, { id: string } & RequireToken>({
      query: ({ token, id }) => ['getTrack', [id], token],
    }),
    getIsInMySavedTracks: builder.query<
      SpotifyApi.CheckUsersSavedTracksResponse,
      { ids: string[] } & RequireToken
    >({
      query: ({ token, ids }) => ['containsMySavedTracks', [ids], token],
      providesTags: ['SavedTracks'],
    }),
  }),
})

export const {
  useGetIsInMySavedTracksQuery,
  useGetTopTracksQuery,
  useGetTrackQuery,
  useGetTracksQuery,
} = track
