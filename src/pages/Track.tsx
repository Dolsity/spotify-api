import { useLocation } from 'react-router-dom'

import { Container, Grid, List, Stack, Typography } from '@mui/material'

import { useGetRecentsQuery } from '../api/api'
import { useGetTrackQuery } from '../api/track'
import AlbumCard from '../components/Cards/AlbumCard'
import AppearanceCard from '../components/Cards/AppearanceCard'
import ArtistCard from '../components/Cards/ArtistCard'
import TrackDetails from '../components/Details/TrackDetails'
import useAuthenticated from '../hooks/useAuthenticated'
import useGetFullTopTracksQuery from '../hooks/useGetFullTopTracksQuery'

/**
 * * Name
 * * Picture
 * * Duration
 * * Check if you liked the track
 * * Artists
 * * Artists[i]
 * * - Name
 * * - Followers
 * * - Check if you're following the artist
 * * Album
 * * - Name
 * * - Picture
 * * - Track Number
 * * - Number of Tracks
 * * - Release Date
 *
 * * Position in Top Tracks
 */

const Track = () => {
  const token = useAuthenticated()
  const location = useLocation()

  const trackId = location.pathname.split('/')[2]!
  const { data: track } = useGetTrackQuery({ id: trackId, token })
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

  const appearances: iAppearanceCard[] = [
    {
      hash: true,
      link: '/top-tracks/short-term',
      text: 'streamed track of the last month',
      condition: () => (userTopTracksShortTerm?.findIndex((t) => t.id === trackId) || 0) + 1,
    },
    {
      hash: true,
      link: '/top-tracks/medium-term',
      text: 'streamed track of the last 6 months',
      condition: () => (userTopTracksMediumTerm?.findIndex((t) => t.id === trackId) || 0) + 1,
    },
    {
      hash: true,
      link: '/top-tracks/long-term',
      text: 'streamed track of your lifetime',
      condition: () => (userTopTracksLongTerm?.findIndex((t) => t.id === trackId) || 0) + 1,
    },
    {
      hash: false,
      link: '/recents',
      text: `appearances of ${track?.name} in your last 50 streams`,
      condition: () => userRecents?.filter((t) => t.track.id === trackId).length,
    },
  ]

  return (
    <Container>
      <TrackDetails track={track} />
      <List>
        <Stack sx={{ borderRadius: 1 }}>
          <Typography
            sx={{ bgcolor: 'background.paper', p: 1, mb: 1, borderRadius: 1 }}
            variant="h5"
          >
            Artists on the Track:
          </Typography>
          {track ? (
            track.artists.map((artist) => <ArtistCard key={artist.id} artistId={artist.id} />)
          ) : (
            <ArtistCard />
          )}
        </Stack>
        <Stack>
          <Typography
            sx={{ bgcolor: 'background.paper', p: 1, mb: 1, borderRadius: 1 }}
            variant="h5"
          >
            Album:
          </Typography>
          <AlbumCard albumId={track?.album.id} position={track?.track_number} />
        </Stack>
      </List>
      <Grid sx={{ m: 'auto', mt: 3 }} spacing={1} justifyContent="space-evenly" container>
        {appearances.map((appearance, i) => (
          <AppearanceCard key={i} appearance={appearance} />
        ))}
      </Grid>
    </Container>
  )
}

export default Track
