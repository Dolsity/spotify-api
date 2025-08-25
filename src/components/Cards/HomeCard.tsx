import { useNavigate } from 'react-router-dom'

import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'

import useAppSelector from '../../hooks/useAppSelector'

const HomeCard = ({ card }: { card: iHomeCard }) => {
  const navigate = useNavigate()

  const token = useAppSelector((state) => state.token)

  return (
    <Grid key={card.id}>
      <Card key={card.id} sx={{ maxWidth: 380, p: 0.5, mx: 1.5, mb: 1 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {card.header}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {card.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{ color: 'text.primary' }}
            size="medium"
            disabled={!token}
            onClick={() => navigate(card.url)}
          >
            {token ? 'Bring me there!' : 'Sign in first!'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default HomeCard
