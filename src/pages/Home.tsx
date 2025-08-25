import { useNavigate } from 'react-router-dom'

import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'

import HomeCard from '../components/Cards/HomeCard'
import useAppSelector from '../hooks/useAppSelector'

const Home = () => {
  const navigate = useNavigate()

  const token = useAppSelector((state) => state.token)

  const cards: iHomeCard[] = [
    {
      id: 'home-top-tracks',
      header: 'Top Tracks',
      body: 'See the top 100 tracks you played on Spotify in the last month, 6 months and lifetime!',
      url: '/top-tracks',
    },
    {
      id: 'home-top-artists',
      header: 'Top Artists',
      body: 'See the top 100 artists you played on Spotify in the last month, 6 months and lifetime!',
      url: '/top-artists',
    },
    {
      id: 'home-recents',
      header: 'Recently Played',
      body: 'See the last 50 tracks that you played and when you played them on Spotify!',
      url: '#',
    },
    {
      id: 'home-playlists',
      header: 'Playlists',
      body: 'See the playlists you created and followed on Spotify!',
      url: '#',
    },
    {
      id: 'home-recommendations',
      header: 'Recommendations',
      body: 'Get personalized recommendations based on your listening habits and preferences!',
      url: '#',
    },
  ]

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', py: 7 }}>
        <Container maxWidth="sm">
          <Typography
            variant="h2"
            align="center"
            color="text.primary"
            textTransform="uppercase"
            gutterBottom
          >
            Spotify API
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary">
            {token ? 'View your Spotify Statistics' : 'Log in to see your Spotify Statistics'}
          </Typography>
          <Stack sx={{ py: 1.5, my: 1 }} direction="row" spacing={2} justifyContent="center">
            <Button
              size="large"
              variant="contained"
              disabled={!!token}
              onClick={() => navigate('/login')}
              sx={{}}
            >
              {token ? 'You are signed in' : 'Sign in with Spotify'}
            </Button>
          </Stack>
          <Typography variant="subtitle2" align="center" color="text.secondary">
            Your Data is <b>NOT</b> stored
            <br />
            It is only used to display your statistics.
          </Typography>
        </Container>
      </Box>
      <Grid sx={{ my: 2, py: 2 }} container spacing={1} justifyContent="center">
        {cards.map((card) => (
          <HomeCard key={card.id} card={card} />
        ))}
      </Grid>
    </>
  )
}

export default Home
