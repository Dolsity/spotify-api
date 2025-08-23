import { useLocation } from 'react-router-dom'

import { Container, List, Typography, Stack } from '@mui/material'

import { useGetAlbumQuery, useGetAlbumTracksQuery } from '../api/album'
import ArtistCard from '../components/Cards/ArtistCard'
import AlbumDetails from '../components/Details/AlbumDetails'
import Track from '../components/Track'
import useAuthenticated from '../hooks/useAuthenticated'

/**
 * * Name
 * ! Release Date
 * * Length
 * * Artists
 * * - Name
 * * - Link
 * * - Picture
 * * Tracks
 * * - Name
 * * - Artists
 * * - Picture
 */

const Album = () => {
  const token = useAuthenticated()
  const location = useLocation()

  const { data: album } = useGetAlbumQuery({ id: location.pathname.split('/')[2]!, token })
  const { data: tracks } = useGetAlbumTracksQuery({ id: location.pathname.split('/')[2]!, token })

  return (
    <Container>
      <AlbumDetails album={album} tracks={tracks ?? Array(10).fill(undefined)} />
      <List>
        <Stack sx={{ borderRadius: 1 }}>
          <Typography
            sx={{ bgcolor: 'background.paper', p: 1, mb: 1, borderRadius: 1 }}
            variant="h5"
          >
            Artists on the album:
          </Typography>
          {album ? (
            album.artists.map((artist) => <ArtistCard key={artist.id} artistId={artist.id} />)
          ) : (
            <ArtistCard />
          )}
        </Stack>
        <Stack>
          <Typography
            sx={{ bgcolor: 'background.paper', p: 1, mb: 0, borderRadius: 1 }}
            variant="h5"
          >
            Tracks:
          </Typography>
        </Stack>
        {(tracks ?? Array(10).fill(undefined)).map((track, i) => (
          <Track key={i} track={track} album={album} i={i} />
        ))}
      </List>
    </Container>
  )
}

export default Album
