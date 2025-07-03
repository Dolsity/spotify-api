import { useNavigate } from 'react-router-dom'

import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material'

const AppearanceCard = ({ appearance }: { appearance: iAppearanceCard }) => {
  const navigate = useNavigate()

  return appearance.condition() ? (
    <Card sx={{ width: 280, mb: 2 }} onClick={() => navigate(appearance.link)}>
      <CardActionArea
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
        }}
      >
        <CardContent sx={{ p: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              color="text.primary"
              variant="h3"
              sx={{
                fontWeight: 'bold',
                mr: 1,
                minWidth: 40,
                textAlign: 'center',
              }}
            >
              {appearance.hash ? '#' : ''}
              {appearance.condition()}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'left' }}>
              {appearance.text}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  ) : (
    <></>
  )
}

export default AppearanceCard
