import api, { RequireToken } from './api'

const album = api.injectEndpoints({
  endpoints: (builder) => ({
    getAlbum: builder.query<SpotifyApi.AlbumObjectFull, { id: string } & RequireToken>({
      query: ({ token, id }) => ['getAlbum', [id], token],
    }),
    getAlbumTracks: builder.query<
      SpotifyApi.TrackObjectSimplified[],
      { id: string; limit?: number; offset?: number } & RequireToken
    >({
      query: ({ token, id }) => ['getAlbumTracks', [id], token],
      transformResponse: (res) => res.items,
    }),
    getIsInMySavedAlbums: builder.query<
      SpotifyApi.CheckUserSavedAlbumsResponse,
      { ids: string[] } & RequireToken
    >({
      query: ({ token, ids }) => ['containsMySavedAlbums', [ids], token],
      providesTags: ['SavedAlbums'],
    }),
  }),
})

export const { useGetAlbumQuery, useGetAlbumTracksQuery, useGetIsInMySavedAlbumsQuery } = album
