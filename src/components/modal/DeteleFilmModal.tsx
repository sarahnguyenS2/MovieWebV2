/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Typography } from '@mui/material'
import ModalLayout from '../layout/ModalLayout'
import useListOfFilms from '~/hooks/api/useListOfFilms'

interface Props {
  open: boolean
  handleClose: () => void
  filmId: string | null
}

const DeleteFilmModal = (props: Props) => {
  const { open, handleClose, filmId } = props

  const { deleteFilmById } = useListOfFilms()
  const handleDeleteFilm = async () => {
    if (filmId) {
      try {
        await deleteFilmById(filmId)
        handleClose()
      } catch (error) {
        console.log(error)
        handleClose()
      } finally {
        handleClose()
        window.location.reload()
      }
    }
  }
  return (
    <ModalLayout open={open} handleClose={handleClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          margin: '20px'
        }}
      >
        <Typography variant='h5' sx={{ mb: 2, fontWeight: '500' }}>
          Are you sure to delete this movie?
        </Typography>
        <Button sx={{ my: 1, mr: 1 }} variant='contained' color='error' onClick={handleDeleteFilm}>
          Delete
        </Button>
      </Box>
    </ModalLayout>
  )
}

export default DeleteFilmModal
