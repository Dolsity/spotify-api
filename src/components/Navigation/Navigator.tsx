import React, { useState } from 'react'

import { AppBar, Box, IconButton, List, SwipeableDrawer, Toolbar, Typography } from '@mui/material'

import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'

import Tooltip from '@mui/material/Tooltip'
import CloseIcon from '@mui/icons-material/Close'

import DrawerItem from './DrawerItem'

const Navigator = () => {
	const [open, setOpen] = useState(false)

	const data: iDrawerItem[] = [
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
			url: '#',
			icon: undefined,
			condition: () => true,
		},
	]

	return (
		<>
			<AppBar sx={{ bgcolor: 'primary.main' }} position="relative">
				<Toolbar>
					<Typography variant="h5" textTransform={'uppercase'}>
						spotify stats
					</Typography>
					<IconButton
						onClick={() => setOpen(true)}
						size="large"
						edge="end"
						aria-label="menu"
						sx={{ ml: 'auto' }}
					>
						<Tooltip title="Open Menu" placement="left">
							{/* TODO: Default avatar if not authenticated, else user avatar */}
							<Avatar
								sx={{
									width: 38,
									height: 38,
									border: '1.5px solid #25b359', // TODO: Green border if authenticated, else default
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
								{/* TODO: Hello <user> if authenticated, else "spotify stats" */}
								<Typography variant="h6" textTransform={'uppercase'}>
									spotify stats
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
						{data.map((el) => (
							<DrawerItem key={el.id} setOpen={setOpen} item={el} />
						))}
					</List>
				</Box>
			</SwipeableDrawer>
		</>
	)
}

export default Navigator
