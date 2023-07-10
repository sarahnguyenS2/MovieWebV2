/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Box, Button } from '@mui/material'
import React from 'react'
import { Film } from '~/global/interface'
import useListOfFilms from '~/hooks/api/useListOfFilms'

interface VideoPopupProps {
  film: Film
  onClose: () => void
}

const VideoPopup = ({ film, onClose }: VideoPopupProps) => {
  const { getFilms } = useListOfFilms()
  const [films, setFilms] = React.useState<Film[]>([])

  React.useEffect(() => {
    const fetchFilm = async () => {
      const response = await getFilms()
      setFilms(response)
      console.log(films)
    }
    fetchFilm()
  }, [films, getFilms])

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '80%',
          maxWidth: 800,
          backgroundColor: 'black',
          borderRadius: '8px'
        }}
      >
        <iframe
          title='YouTube video player'
          width='100%'
          height='400'
          src={film.trailer}
          frameBorder='0'
          allowFullScreen
        ></iframe>
        <Button
          variant='contained'
          color='error'
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: '-1rem',
            right: '-1rem',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            minWidth: 0,
            minHeight: 0,
            padding: 0
          }}
        >
          X
        </Button>
      </Box>
    </Box>
  )
}

export default VideoPopup
