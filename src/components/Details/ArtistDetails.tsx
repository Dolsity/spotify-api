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
          {/* <PageIndicator>ARTIST{following && ' • Following'}</PageIndicator> */}
          <PageIndicator>ARTIST</PageIndicator>
          {artist ? (
            <>
              <Typography variant="h4">{artist.name}</Typography>
              <Typography variant="h6">
                {artist.followers.total.toLocaleString()} Followers
              </Typography>
              {following && artist.genres?.length === 0 && <Divider sx={{ my: 0.8 }} />}
              {following && <Typography variant="body2">Following</Typography>}
            </>
          ) : (
            <>
              <Skeleton variant="text" width={200} height={45} />
              <Skeleton variant="text" width={160} height={35} />
              <Skeleton variant="text" width={110} height={30} />
            </>
          )}
          {artist ? (
            <>
              {artist.genres && artist.genres.length > 0 && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    flexWrap="wrap"
                    justifyContent={{ xs: 'center', sm: 'flex-start' }}
                  >
                    {artist.genres.map((genre, i) => (
                      <Typography
                        sx={{
                          bgcolor: 'primary.main',
                          p: 0.35,
                          borderRadius: 1,
                        }}
                        key={i}
                        variant="body2"
                        color="text.primary"
                      >
                        {genre}
                      </Typography>
                    ))}
                  </Stack>
                </>
              )}
            </>
          ) : (
            <Skeleton variant="text" width={100} height={25} />
          )}
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
