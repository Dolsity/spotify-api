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
  Stack,
  Divider,
  Typography,
} from '@mui/material'

import { useGetIsFollowingArtistsQuery } from '../../api/artist'
import useAuthenticated from '../../hooks/useAuthenticated'
import AsyncImage from '../AsyncImage'
import PageIndicator from '../PageIndicator'

const ArtistDetails = ({ artist }: { artist?: SpotifyApi.ArtistObjectFull }) => {
  const token = useAuthenticated()

  const { data: isFollowingArtists } = useGetIsFollowingArtistsQuery(
    { ids: [artist?.id ?? ''], token },
    { skip: !artist }
  )

  const [showImage, setShowImage] = useState(false)

  const following = isFollowingArtists?.[0] ?? null

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
            src={artist?.images[0]?.url}
            skeleton={
              <Skeleton sx={{ borderRadius: 5 }} variant="rectangular" width={200} height={200} />
            }
            component={(thumbnailUrl) => (
              <Card sx={{ borderRadius: 5 }} onClick={() => setShowImage(true)}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    width={200}
                    height={200}
                    image={thumbnailUrl}
                    alt="Image"
                  />
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
          <PageIndicator>ARTIST</PageIndicator>
          {artist ? (
            <>
              <Typography variant="h4">{artist.name}</Typography>
              <Typography variant="h5">
                {artist.followers.total.toLocaleString()} Followers
              </Typography>
              <Typography variant="body1">{following ? 'Following' : null}</Typography>
            </>
          ) : (
            <>
              <Skeleton variant="text" width={200} height={45} />
              <Skeleton variant="text" width={160} height={40} />
              <Skeleton variant="text" width={120} height={40} />
            </>
          )}
          <Divider sx={{ my: 1 }} />
          <Stack direction="row" spacing={1} mx={{ xs: 'auto', sm: 0 }}>
            {artist?.genres ? (
              artist.genres.map((genre, i) => (
                <Typography
                  sx={{
                    bgcolor: 'primary.main',
                    p: 0.4,
                    borderRadius: 1.5,
                  }}
                  key={i}
                  variant="body2"
                  color="text.primary"
                >
                  {genre}
                </Typography>
              ))
            ) : (
              <Skeleton variant="rounded" width={100} height={30} />
            )}
          </Stack>
        </Grid>
      </Grid>
      <Dialog open={showImage} onClose={() => setShowImage(false)} BackdropComponent={Backdrop}>
        <Box
          sx={{ width: { xs: 300, sm: 500 }, height: { xs: 300, sm: 500 } }}
          component="img"
          src={artist?.images[0]?.url || ''}
          alt="Image"
        />
      </Dialog>
    </>
  )
}

export default ArtistDetails
