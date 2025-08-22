import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Avatar,
  Card,
  CardActionArea,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
} from '@mui/material'

import AsyncImage from './AsyncImage'

const TrackContent = ({
  track,
  album,
  i,
  onClick,
}: {
  track?: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified
  album?: SpotifyApi.AlbumObjectSimplified
  i: number
  onClick: () => void
}) => {
  return (
    <Card sx={{ my: 1 }} key={i} onClick={onClick}>
      <CardActionArea>
        <ListItem>
          <ListItemAvatar>
            <AsyncImage
              src={(track && 'album' in track ? track.album : album)?.images[0]?.url}
              skeleton={<Skeleton variant="circular" width={45} height={45} />}
              component={(thumbnailUrl) => (
                <Avatar sx={{ width: 45, height: 45 }} src={thumbnailUrl} />
              )}
            />
          </ListItemAvatar>
          {track ? (
            <ListItemText
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}
              primaryTypographyProps={{ noWrap: true }}
              secondaryTypographyProps={{ noWrap: true }}
              disableTypography={false}
              primary={track.name}
              secondary={track.artists.map((a) => a.name).join(', ')}
            />
          ) : (
            <Stack my="6px">
              <Skeleton variant="text" width={200} height={24} />
              <Skeleton variant="text" width={160} height={20} />
            </Stack>
          )}
        </ListItem>
      </CardActionArea>
    </Card>
  )
}

const Track = ({
  track,
  album,
  i,
}: {
  track?: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified
  album?: SpotifyApi.AlbumObjectSimplified
  i: number
}) => {
  const navigate = useNavigate()

  const handleTrackClick = () => {
    if (track) {
      navigate('/track/' + track.id)
    }
  }

  return (
    <Suspense fallback={<div style={{ height: 72 }} />}>
      <TrackContent track={track} album={album} i={i} onClick={handleTrackClick} />
    </Suspense>
  )
}

export default Track
