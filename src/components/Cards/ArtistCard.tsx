import { useNavigate } from 'react-router-dom'

import { Box, Card, CardActionArea, CardMedia, Skeleton, Typography, Divider } from '@mui/material'

import { useGetArtistQuery, useGetIsFollowingArtistsQuery } from '../../api/artist'
import useAuthenticated from '../../hooks/useAuthenticated'
import getFollowers from '../../utils/getFollowers'
import AsyncImage from '../AsyncImage'

const ArtistCard = ({ artistId }: { artistId?: string }) => {
  const token = useAuthenticated()

  const navigate = useNavigate()

  const { data: artist } = useGetArtistQuery({ id: artistId!, token }, { skip: !artistId })

  const handleArtistClick = () => {
    if (artist) {
      navigate('/artist/' + artist.id)
    }
  }

  const { data: isFollowingArtists } = useGetIsFollowingArtistsQuery(
    { ids: [artist?.id ?? ''], token },
    { skip: !artist }
  )

  const following = isFollowingArtists?.[0] ?? null

  return (
    <Card sx={{ mb: 2 }} onClick={handleArtistClick}>
      <CardActionArea>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <AsyncImage
            src={artist?.images[0]?.url}
            skeleton={<Skeleton variant="rectangular" width={120} height={120} />}
            component={(thumbnailUrl) => (
              <CardMedia component="img" sx={{ width: 120 }} image={thumbnailUrl} alt="Picture" />
            )}
          />
          <CardMedia
            sx={{
              mx: 1.5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minWidth: 0,
            }}
          >
            {artist ? (
              <>
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {artist.name}
                </Typography>
                <Typography variant="subtitle1">{getFollowers(artist)}</Typography>
                {following ? (
                  <>
                    <Divider sx={{ my: 0.5 }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      {following ? 'Following' : null}
                    </Typography>
                  </>
                ) : null}
              </>
            ) : (
              <>
                <Skeleton variant="text" width={200} height={40} />
                <Skeleton variant="text" width={160} height={30} />
                <Skeleton variant="text" width={140} height={30} />
              </>
            )}
          </CardMedia>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default ArtistCard
