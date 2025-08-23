import { useState } from 'react'

import {
  Backdrop,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  Grid,
  Skeleton,
  Divider,
  Typography,
} from '@mui/material'

import { useGetIsInMySavedAlbumsQuery } from '../../api/album'
import useAuthenticated from '../../hooks/useAuthenticated'
import getDuration from '../../utils/getDuration'
import AsyncImage from '../AsyncImage'
import PageIndicator from '../PageIndicator'

const AlbumDetails = ({
  album,
  tracks,
}: {
  album?: SpotifyApi.AlbumObjectFull
  tracks: SpotifyApi.TrackObjectSimplified[] | undefined[]
}) => {
  const token = useAuthenticated()

  const { data: isInMySavedAlbums } = useGetIsInMySavedAlbumsQuery(
    { ids: [album?.id ?? ''], token },
    { skip: !album }
  )

  const [showImage, setShowImage] = useState(false)

  const liked = isInMySavedAlbums?.[0] ?? null

  return (
    <>
      <Grid
        sx={{
          bgcolor: 'background.paper',
          my: { xs: 2, sm: 4 },
          borderRadius: 1,
          boxShadow: 3,
          p: { xs: 2, sm: 0 },
        }}
        container
        direction={{ xs: 'column', sm: 'row' }}
      >
        <Grid sx={{ mx: { xs: 'auto', sm: 2 }, my: { xs: 'auto', sm: 2 } }}>
          <AsyncImage
            src={album?.images[0]?.url}
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
          <PageIndicator>ALBUM • {album?.release_date}</PageIndicator>
          {album ? (
            <>
              <Typography variant="h4">{album.name}</Typography>
              <Typography variant="h6">{album.artists.map((a) => a.name).join(', ')}</Typography>
              {/* <Typography variant="subtitle1">{album.total_tracks} tracks</Typography> */}
              <Typography variant="subtitle2">
                {album.tracks?.total ?? tracks.length} tracks •{' '}
                {getDuration(tracks.map((t) => t?.duration_ms || 0).reduce((v, a) => v + a, 0))}
              </Typography>
              {liked ? (
                <>
                  <Divider sx={{ my: 0.8 }} />
                  <Typography sx={{ color: 'text.secondary' }} variant="subtitle2">
                    {liked ? 'You liked this album' : ''}
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
          src={album?.images[0]?.url || ''}
          alt="Image"
        />
      </Dialog>
    </>
  )
}

export default AlbumDetails
