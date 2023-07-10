/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { ArrowBack, PlayCircleFilled } from '@mui/icons-material'
import VideoPopup from '../components/VideoPopup'
import useListOfFilms from '~/hooks/api/useListOfFilms'
import { Film } from '~/global/interface'
import Loading from '~/components/Loading'

interface DetailParams extends Record<string, string | undefined> {
  id: string
}

const Detail = () => {
  const navigate = useNavigate()
  const { id } = useParams<DetailParams>()
  const [showVideoPopup, setShowVideoPopup] = useState(false)
  const [film, setFilm] = React.useState<Film>({})
  const { getFilmById } = useListOfFilms()
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    const fetchFilm = async () => {
      const response = await getFilmById(id)
      setFilm(response)
      setLoading(false)
    }
    fetchFilm()
  }, [getFilmById, id])

  if (!film) {
    return <div>Movie not found</div>
  }

  const openVideoPopup = () => {
    setShowVideoPopup(true)
  }

  const closeVideoPopup = () => {
    setShowVideoPopup(false)
  }

  return loading ? (
    <Loading />
  ) : (
    <Box sx={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box position='relative'>
              <img src={film.image} alt={film.title} style={{ width: '100%', height: 'auto' }} />
              {showVideoPopup && <VideoPopup film={film} onClose={closeVideoPopup} />}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display='flex' justifyContent='space-between' alignItems='center' marginBottom='1rem'>
              <Box>
                <Button
                  startIcon={<ArrowBack />}
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    navigate('/')
                  }}
                  sx={{ marginRight: '1rem' }}
                >
                  Back
                </Button>
                <Button
                  startIcon={<PlayCircleFilled />}
                  variant='contained'
                  color='primary'
                  onClick={openVideoPopup}
                  sx={{ zIndex: 0 }}
                >
                  View Trailer
                </Button>
              </Box>
              <Box display={{ xs: 'none', sm: 'flex', md: 'flex' }} justifyContent='flex-end' flexGrow={1}>
                <Button
                  variant='contained'
                  disabled={!film.id}
                  onClick={() => navigate(`/detail/${Number(id) + 1}`)}
                  sx={{
                    backgroundColor: 'var(--primary-color)',
                    '&:hover': { backgroundColor: 'var(--primary-light-color)' }
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
            <Typography
              variant='h3'
              component='h1'
              sx={{ fontWeight: 700, color: 'var(--primary-color)', marginTop: '60px' }}
            >
              {film.title}
            </Typography>
            <Typography variant='body1' sx={{ marginTop: '1rem', textAlign: 'justify' }}>
              {film.description}
            </Typography>
            <Typography variant='body2' sx={{ marginTop: '1rem' }}>
              Nation: {film.nation}
            </Typography>
            <Typography variant='body2' sx={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
              Year: {film.year}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Detail
