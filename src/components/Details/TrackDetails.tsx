import { useState } from 'react'

import {
  Backdrop,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material'

import { useGetIsInMySavedTracksQuery } from '../../api/track'
import useAuthenticated from '../../hooks/useAuthenticated'
import getDuration from '../../utils/getDuration'
import AsyncImage from '../AsyncImage'
import PageIndicator from '../PageIndicator'

const TrackDetails = ({ track }: { track?: SpotifyApi.TrackObjectFull }) => {
  const token = useAuthenticated()

  const { data: isInMySavedTracks } = useGetIsInMySavedTracksQuery(
    { ids: [track?.id ?? ''], token },
    { skip: !track }
  )

  const [showImage, setShowImage] = useState(false)

  const liked = isInMySavedTracks?.[0] ?? null

  return (
    <>
      <Grid
        sx={{
          bgcolor: 'background.paper',
          my: { xs: 2, sm: 4 },
          mb: { sm: 4 },
          borderRadius: 1,
          boxShadow: 3,
          p: { xs: 2, sm: 0 },
        }}
        container
        direction={{ xs: 'column', sm: 'row' }}
      >
        <Grid sx={{ mx: { xs: 'auto', sm: 2 }, my: { xs: 'auto', sm: 2 } }}>
          <AsyncImage
            src={track?.album.images[0]?.url}
            skeleton={
              <Skeleton sx={{ borderRadius: 5 }} variant="rectangular" width={200} height={200} />
            }
            component={(thumbnailUrl) => (
              <Card
                sx={{ borderRadius: 5, width: 200, height: 200 }}
                onClick={() => setShowImage(true)}
              >
                <CardActionArea>
                  <CardMedia component="img" image={thumbnailUrl} alt="Image" />
                </CardActionArea>
              </Card>
            )}
          />
        </Grid>
        <Grid
          sx={{
            my: { xs: 1, sm: 3 },
            mx: { xs: 'auto', sm: 3 },
            textAlign: { xs: 'center', sm: 'start' },
          }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <PageIndicator>TRACK</PageIndicator>
          {track ? (
            <>
              <Typography variant="h4">{track.name}</Typography>
              <Typography variant="h6">{track.artists.map((a) => a.name).join(', ')}</Typography>
              <Typography variant="subtitle1">{getDuration(track.duration_ms)}</Typography>
              {liked ? (
                <>
                  <Divider sx={{ my: 0.8 }} />
                  <Typography sx={{ color: 'text.secondary' }} variant="subtitle2">
                    {liked ? 'You liked this track' : ''}
                  </Typography>
                </>
              ) : null}
            </>
          ) : (
            <>
              <Skeleton variant="text" width={200} height={45} />
              <Skeleton variant="text" width={160} height={40} />
              <Skeleton variant="text" width={80} height={30} />
            </>
          )}
        </Grid>
      </Grid>
      <Dialog open={showImage} onClose={() => setShowImage(false)} BackdropComponent={Backdrop}>
        <Box
          sx={{ width: { xs: 300, sm: 500 }, height: { xs: 300, sm: 500 } }}
          component="img"
          src={track?.album.images[0]?.url || ''}
          alt="Image"
        />
      </Dialog>
    </>
  )
}

export default TrackDetails
