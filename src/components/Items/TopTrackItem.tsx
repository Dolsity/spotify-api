import { useNavigate } from 'react-router-dom'

import {
  Avatar,
  Divider,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Skeleton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'

import getDuration from '../../utils/getDuration'
import AsyncImage from '../AsyncImage'

const TopTrackItem = ({
  smallScreen,
  track,
  i,
}: {
  smallScreen: boolean
  track?: SpotifyApi.TrackObjectFull
  i?: number
}) => {
  const navigate = useNavigate()

  const handleTrackClick = (track?: SpotifyApi.TrackObjectFull) => {
    if (track) {
      navigate('/track/' + track.id)
    }
  }

  const handleArtistClick = (artist?: SpotifyApi.ArtistObjectSimplified) => {
    if (artist) {
      navigate('/artist/' + artist.id)
    }
  }

  return smallScreen ? (
    <ListItem onClick={() => handleTrackClick(track)} disablePadding>
      <ListItemButton sx={{ p: 1 }}>
        <Typography
          sx={{
            width: '2.5ch',
            flexShrink: 0,
            textAlign: 'center',
            mr: 0.5,
          }}
        >
          {i !== undefined ? i + 1 + '.' : ''}
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        <ListItemAvatar>
          <AsyncImage
            src={track?.album.images[0]?.url}
            skeleton={<Skeleton variant="rounded" width={45} height={45} sx={{ mx: 1 }} />}
            component={(thumbnailUrl) => (
              <Avatar
                sx={{
                  width: 45,
                  height: 45,
                  mx: 1,
                }}
                variant="rounded"
                src={thumbnailUrl}
              />
            )}
          />
        </ListItemAvatar>
        {track ? (
          <Typography variant="body1" noWrap>
            {track.name}
            <Typography variant="body2" noWrap>
              {track.artists.map((a) => a.name).join(', ')}
            </Typography>
          </Typography>
        ) : (
          <Stack my="6px">
            <Skeleton variant="text" width={200} height={24} />
            <Skeleton variant="text" width={160} height={20} />
          </Stack>
        )}
      </ListItemButton>
    </ListItem>
  ) : (
    <TableRow hover>
      <TableCell align="center">{i! + 1}</TableCell>
      <TableCell>
        <AsyncImage
          src={track?.album.images[0]?.url}
          skeleton={<Skeleton variant="rounded" width={45} height={45} />}
          component={(thumbnailUrl) => (
            <Avatar variant="rounded" sx={{ width: 45, height: 45 }} src={thumbnailUrl} />
          )}
        />
      </TableCell>
      <TableCell>
        {track ? (
          <Typography variant="body1">
            <Link
              sx={{ cursor: 'pointer' }}
              color="inherit"
              onClick={() => handleTrackClick(track)}
              underline="hover"
            >
              {track.name}
            </Link>
          </Typography>
        ) : (
          <Skeleton variant="text" width={160} height={20} />
        )}
      </TableCell>
      <TableCell>
        {track ? (
          <Typography variant="body1">
            {track.artists.map((artist, idx) => (
              <span key={artist.id}>
                <Link
                  sx={{
                    cursor: 'pointer',
                  }}
                  color="inherit"
                  onClick={() => handleArtistClick(artist)}
                  underline="hover"
                >
                  {artist.name}
                </Link>
                {idx < track.artists.length - 1 && ', '}
              </span>
            ))}
          </Typography>
        ) : (
          <Skeleton variant="text" width={120} height={20} />
        )}
      </TableCell>
      <TableCell align="center">
        {track ? (
          <Typography variant="body1">{getDuration(track.duration_ms)}</Typography>
        ) : (
          <Skeleton variant="text" width={160} height={20} />
        )}
      </TableCell>
    </TableRow>
  )
}

export default TopTrackItem
