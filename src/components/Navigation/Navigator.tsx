import { useState } from 'react'

import { AppBar, Box, IconButton, List, SwipeableDrawer, Toolbar, Typography } from '@mui/material'

import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import CloseIcon from '@mui/icons-material/Close'

import useAppSelector from '../../hooks/useAppSelector'
import DrawerItem from './DrawerItem'
import DrawerDropdown from './DrawerDropdown'

const Navigator = () => {
  const token = useAppSelector((state) => state.token)

  const [open, setOpen] = useState(false)

  const data: (iDrawerItem | iDrawerDropdown)[] = [
    {
      id: 'nav-home',
      title: 'Home',
      url: '/',
      icon: undefined,
      condition: () => true,
    },
    {
      id: 'nav-login',
      title: 'Login',
      url: '/login',
      icon: undefined,
      condition: () => !token,
    },
    {
      id: 'nav-top-artists',
      icon: undefined,
      title: 'Top Artists',
      url: '/top-artists',
      drop: 0,
      items: [
        {
          id: 'nav-top-artists-short-term',
          icon: undefined,
          title: 'Last Month',
          url: '/top-artists/short-term',
          condition: () => !!token,
        },
        {
          id: 'nav-top-artists-medium-term',
          icon: undefined,
          title: 'Last 6 Months',
          url: '/top-artists/medium-term',
          condition: () => !!token,
        },
        {
          id: 'nav-top-artists-long-term',
          icon: undefined,
          title: 'All Time',
          url: '/top-artists/long-term',
          condition: () => !!token,
        },
      ],
      condition: () => !!token,
    },
    {
      id: 'nav-top-tracks',
      icon: undefined,
      title: 'Top Tracks',
      url: '/top-tracks',
      drop: 0,
      items: [
        {
          id: 'nav-top-tracks-short-term',
          icon: undefined,
          title: 'Last Month',
          url: '/top-tracks/short-term',
          condition: () => !!token,
        },
        {
          id: 'nav-top-tracks-medium-term',
          icon: undefined,
          title: 'Last 6 Months',
          url: '/top-tracks/medium-term',
          condition: () => !!token,
        },
        {
          id: 'nav-top-tracks-long-term',
          icon: undefined,
          title: 'All Time',
          url: '/top-tracks/long-term',
          condition: () => !!token,
        },
      ],
      condition: () => !!token,
    },
    {
      id: 'nav-recently-played',
      icon: undefined,
      title: 'Recently Played',
      url: '#',
      condition: () => !!token,
    },
    {
      id: 'nav-deauthorize',
      icon: undefined,
      title: 'Deauthorize App',
      url: '/deauthorize',
      condition: () => !!token,
    },
    {
      id: 'nav-logout',
      icon: undefined,
      title: 'Logout',
      url: '/logout',
      condition: () => !!token,
    },
  ]

  return (
    <>
      <AppBar sx={{ bgcolor: 'primary.main' }} position="sticky">
        <Toolbar>
          <Typography variant="h5" textTransform={'uppercase'}>
            spotify api
          </Typography>
          <IconButton
            onClick={() => setOpen(true)}
            size="large"
            edge="end"
            aria-label="menu"
            sx={{ ml: 'auto' }}
          >
            <Tooltip title="Open Menu" placement="left">
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  border: '1.5px solid',
                  borderColor: token ? 'success.main' : 'warning.main',
                  backgroundColor: 'background.paper',
                  color: 'background.default',
                }}
              ></Avatar>
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List
            subheader={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 3,
                  py: 1,
                }}
              >
                <Typography variant="h6" textTransform={'uppercase'}>
                  spotify api
                </Typography>
                <IconButton
                  onClick={() => setOpen(false)}
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="close menu"
                  sx={{ ml: 'auto' }}
                >
                  <Tooltip title="Close Menu" placement="bottom-end">
                    <CloseIcon />
                  </Tooltip>
                </IconButton>
              </Box>
            }
          >
            <Divider />
            {data.map((el) =>
              'drop' in el ? (
                <DrawerDropdown key={el.id} setOpen={setOpen} dropdown={el} />
              ) : (
                <DrawerItem key={el.id} setOpen={setOpen} item={el} />
              )
            )}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default Navigator
