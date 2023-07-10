/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Info } from '@mui/icons-material'
import { Film } from '~/global/interface'

interface FilmPresentationProps {
  films: Film[]
}

export default function FilmPresentation({ films }: FilmPresentationProps) {
  const navigate = useNavigate()
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null)

  const handleToggleDetails = (filmId: number) => {
    if (expandedCardId === filmId) {
      setExpandedCardId(null)
    } else {
      setExpandedCardId(filmId)
    }
  }
  return (
    <Grid
      bgcolor='var(--black-color)'
      container
      spacing={3}
      sx={{
        marginTop: '0',
        // marginBottom: '5rem',
        padding: '10px 30px 030px'
      }}
    >
      {films.map((film) => (
        <Grid xs={12} sm={6} lg={3} item key={film.id}>
          <Card sx={{ backgroundColor: 'var(--black-light-color)', color: 'var(--white-color)', fontWeight: '700' }}>
            <CardMedia sx={{ height: '300px' }} image={film.image} title={film.title} />
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  onClick={() => handleToggleDetails(film.id!)}
                  style={{ cursor: 'pointer' }}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    cursor: 'default',
                    '&:hover': {
                      color: 'var(--primary-color)'
                    }
                  }}
                >
                  {film.title}
                </Typography>
                <Button
                  startIcon={<Info sx={{ color: 'var(--primary-color)', width: 'fit-content' }} />}
                  onClick={() => {
                    navigate(`/detail/${film.id}`)
                  }}
                  sx={{
                    '&:hover': { backgroundColor: 'transparent' },
                    '&:active': { backgroundColor: 'transparent' },
                    justifyContent: 'flex-end'
                  }}
                />
              </div>
              {expandedCardId === film.id && (
                <>
                  <Typography>
                    <strong>Nation:</strong> {film.nation}
                  </Typography>
                  <Typography>
                    <strong>Year:</strong> {film.year}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
