import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { TabContext } from '@mui/lab'
import { Box, Tab, Tabs, Card, Container, Grid, LinearProgress, Typography } from '@mui/material'

import { tabs } from '../tabs'
import TopArtistItem from '../components/Items/TopArtistItem'
import useAuthenticated from '../hooks/useAuthenticated'
import useGetFullTopArtistsQuery from '../hooks/useGetFullTopArtistsQuery'

const TopArtists = () => {
  const token = useAuthenticated()

  const navigate = useNavigate()
  const location = useLocation()

  const [term, setTerm] = useState<'' | 'short_term' | 'medium_term' | 'long_term'>('')
  const { data: topArtists } = useGetFullTopArtistsQuery(
    {
      time_range: term as 'short_term' | 'medium_term' | 'long_term',
      token,
    },
    { skip: !term }
  )

  useEffect(() => {
    const parts = location.pathname.split('/')
    setTerm(
      parts[parts.length - 1]!.replace('-', '_') as 'short_term' | 'medium_term' | 'long_term'
    )
  }, [location.pathname])

  return term ? (
    <TabContext value={term}>
      <Box sx={{ p: { xs: 0, lg: 2 } }}>
        <Card
          sx={{
            p: 2,
            mx: 'auto',
            maxWidth: 'lg',
            borderRadius: { xs: 0, lg: 2 },
          }}
        >
          <Typography variant="h4">Top 100 Artists</Typography>
          <Typography variant="h6">{tabs.find((t) => t.term === term)?.description}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            These are the artists you listened to the most.
          </Typography>
        </Card>
        <Container>
          <Grid sx={{ my: 2 }} container spacing={5} justifyContent="space-evenly">
            {(topArtists ?? Array(5).fill(undefined)).map((a, i) => (
              <TopArtistItem key={i} artist={a} i={i} />
            ))}
          </Grid>
        </Container>
      </Box>
      <Tabs
        value={term}
        onChange={(_, tab) => {
          setTerm(tab as 'short_term' | 'medium_term' | 'long_term')
          navigate('../' + tab.replace('_', '-'))
        }}
        textColor="inherit"
        sx={{
          position: 'sticky',
          bottom: 0,
          width: '100%',
          bgcolor: 'primary.main',
        }}
        centered
      >
        {tabs.map((t) => (
          <Tab
            key={t.term}
            label={
              <Typography
                variant="caption"
                sx={{
                  textTransform: 'capitalize',
                }}
              >
                {t.description}
              </Typography>
            }
            value={t.term}
          />
        ))}
      </Tabs>
    </TabContext>
  ) : (
    <LinearProgress />
  )
}

export default TopArtists
