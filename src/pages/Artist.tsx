import { useLocation } from 'react-router-dom'

import { Container, Grid, List, Skeleton, Stack, Typography } from '@mui/material'

import { useGetRecentsQuery } from '../api/api'
import { useGetArtistQuery, useGetArtistTopTracksQuery } from '../api/artist'
import AppearanceCard from '../components/Cards/AppearanceCard'
import ArtistDetails from '../components/Details/ArtistDetails'
import Track from '../components/Track'
import useAuthenticated from '../hooks/useAuthenticated'
import useGetFullTopArtistsQuery from '../hooks/useGetFullTopArtistsQuery'
import useGetFullTopTracksQuery from '../hooks/useGetFullTopTracksQuery'

/**
 * * Name
 * * Followers
 * * Check if you are following
 * * Genres
 * * Image
 * * Top Tracks
 * * Position in Top Artists
 * * Appearances in Top Tracks
 * * Appearances in Recents
 */

const Artist = () => {
  const token = useAuthenticated()

  const location = useLocation()

  const artistId = location.pathname.split('/')[2]!
  const { data: artist } = useGetArtistQuery({ id: artistId, token })
  const { data: artistTopTracks } = useGetArtistTopTracksQuery({ id: artistId, token })
  const { data: userTopArtistsShortTerm } = useGetFullTopArtistsQuery({
    time_range: 'short_term',
    token,
  })
  const { data: userTopArtistsMediumTerm } = useGetFullTopArtistsQuery({
    time_range: 'medium_term',
    token,
  })
  const { data: userTopArtistsLongTerm } = useGetFullTopArtistsQuery({
    time_range: 'long_term',
    token,
  })
  const { data: userTopTracksShortTerm } = useGetFullTopTracksQuery({
    time_range: 'short_term',
    token,
  })
  const { data: userTopTracksMediumTerm } = useGetFullTopTracksQuery({
    time_range: 'medium_term',
    token,
  })
  const { data: userTopTracksLongTerm } = useGetFullTopTracksQuery({
    time_range: 'long_term',
    token,
  })
  const { data: userRecents } = useGetRecentsQuery({ token })

  interface iAppearanceCard {
    hash: boolean
    text: string
    link: string
    condition: () => number | undefined
  }

  const appearances: iAppearanceCard[] = [
    {
      hash: true,
      text: 'streamed artist of the last month',
      link: '/top-artists/short-term',
      condition: () => (userTopArtistsShortTerm?.findIndex((t) => t.id === artistId) || 0) + 1,
    },
    {
      hash: true,
      text: 'streamed artist of the last 6 months',
      link: '/top-artists/medium-term',
      condition: () => (userTopArtistsMediumTerm?.findIndex((t) => t.id === artistId) || 0) + 1,
    },
    {
      hash: true,
      text: 'streamed artist of your lifetime',
      link: '/top-artists/long-term',
      condition: () => (userTopArtistsLongTerm?.findIndex((t) => t.id === artistId) || 0) + 1,
    },
    {
      hash: false,
      link: '#',
      text: `appearances from ${artist?.name} in your top tracks of the last month`,
      condition: () =>
        userTopTracksShortTerm?.filter((t) => t.artists.find((a) => a.id === artistId)).length,
    },
    {
      hash: false,
      link: '#',
      text: `appearances from ${artist?.name} in your top tracks of the last 6 months`,
      condition: () =>
        userTopTracksMediumTerm?.filter((t) => t.artists.find((a) => a.id === artistId)).length,
    },
    {
      hash: false,
      link: '#',
      text: `appearances from ${artist?.name} in your top tracks of your lifetime`,
      condition: () =>
        userTopTracksLongTerm?.filter((t) => t.artists.find((a) => a.id === artistId)).length,
    },
    {
      hash: false,
      link: '/recents',
      text: `appearances from ${artist?.name} in your last 50 streams`,
      condition: () =>
        userRecents?.filter((t) => t.track.artists.find((a) => a.id === artistId)).length,
    },
  ]

  return (
    <Container>
      <ArtistDetails artist={artist} />
      <List>
        <Stack sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 1 }} direction="row">
          {!artist ? <Skeleton variant="text" width={100} height={40} /> : null}
          <Typography sx={{ height: 'fit-content', my: 'auto !important' }} variant="h5">
            {artist ? artist.name + "'s" : ''} Top Tracks:
          </Typography>
        </Stack>
        {(artistTopTracks ?? Array(5).fill(undefined)).map((t, i) => (
          <Track key={i} track={t} i={i} />
        ))}
      </List>
      <Grid sx={{ m: 'auto', my: 2 }} spacing={1} justifyContent="space-evenly" container>
        {appearances.map((appearance, i) => (
          <AppearanceCard key={i} appearance={appearance} />
        ))}
      </Grid>
    </Container>
  )
}

export default Artist
