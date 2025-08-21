import { useNavigate } from 'react-router-dom'

import { Box, Card, CardActionArea, CardMedia, Skeleton, Typography } from '@mui/material'

import { useGetAlbumQuery } from '../../api/album'
import useAuthenticated from '../../hooks/useAuthenticated'
import AsyncImage from '../AsyncImage'

const AlbumCard = ({ albumId, position }: { albumId?: string; position?: number }) => {
  const token = useAuthenticated()

  const navigate = useNavigate()

  const { data: album } = useGetAlbumQuery({ id: albumId!, token }, { skip: !albumId })

  const handleAlbumClick = () => {
    if (album) {
      navigate('/album/' + album.id)
    }
  }

  return (
    <Card onClick={handleAlbumClick}>
      <CardActionArea>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <AsyncImage
            src={album?.images[0]?.url}
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
            {album ? (
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
                  {album.name}
                </Typography>
                <Typography variant="subtitle1">Track #{position}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {album.total_tracks} track
                  {album.total_tracks > 1 ? 's' : ''}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {album.release_date}
                </Typography>
              </>
            ) : (
              <>
                <Skeleton variant="text" width={200} height={40} />
                <Skeleton variant="text" width={160} height={30} />
                <Skeleton variant="text" width={120} height={30} />
              </>
            )}
          </CardMedia>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default AlbumCard
