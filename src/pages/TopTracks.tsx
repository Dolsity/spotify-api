import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { TabContext } from '@mui/lab'
import {
  Box,
  Card,
  Container,
  LinearProgress,
  List,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { tabs } from '../tabs'
import TopTrackItem from '../components/Items/TopTrackItem'
import useAuthenticated from '../hooks/useAuthenticated'
import useGetFullTopTracksQuery from '../hooks/useGetFullTopTracksQuery'

const TopTracks = () => {
  const token = useAuthenticated()

  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('lg'))

  const [term, setTerm] = useState<'' | 'short_term' | 'medium_term' | 'long_term'>('')
  const { data: topTracks } = useGetFullTopTracksQuery(
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
      <Box>
        <Container sx={{ my: 2 }}>
          <Card sx={{ p: 2, borderRadius: 0 }}>
            <Typography variant="h4" gutterBottom>
              Top 100 Tracks
            </Typography>
            <Typography variant="h6">{tabs.find((t) => t.term === term)?.description}</Typography>
            <Typography variant="body1" color="text.secondary">
              These are the tracks you listen to the most
            </Typography>
          </Card>
          <Card sx={{ my: 3 }}>
            {smallScreen ? (
              <List>
                {(topTracks ?? Array(10).fill(undefined)).map((t, i) => (
                  <TopTrackItem key={i} smallScreen={smallScreen} track={t} i={i} />
                ))}
              </List>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Position</TableCell>
                      <TableCell>Cover</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Artist</TableCell>
                      <TableCell>Duration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(topTracks ?? Array(10).fill(undefined)).map((t, i) => (
                      <TopTrackItem key={i} smallScreen={smallScreen} track={t} i={i} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Card>
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

export default TopTracks
