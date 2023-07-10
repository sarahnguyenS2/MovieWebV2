/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Edit } from '@mui/icons-material'
import { Box, Button, FormControl, TextField, Typography, useTheme } from '@mui/material'
import ModalLayout from '../layout/ModalLayout'
import useData from '~/hooks/useData'
import { Film } from '~/global/interface'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import useListOfFilms from '~/hooks/api/useListOfFilms'

interface Props {
  open: boolean
  handleClose: () => void
  filmId: string | null
}

const EditFilmModal = (props: Props) => {
  const { open, handleClose, filmId } = props
  const theme = useTheme()
  const { films } = useData()

  const { editFilmById } = useListOfFilms()
  const [film, setFilm] = useState<Film | undefined>({
    id: 0,
    image: '',
    title: '',
    year: '',
    nation: '',
    description: '',
    trailer: ''
  })
  useEffect(() => {
    if (filmId) {
      const selectedFilm = films.find((film) => String(film.id) === filmId)
      setFilm(selectedFilm)
      console.log(selectedFilm)
    }
  }, [filmId, films])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(e.target.name, e.target.value)
  }

  const validationSchema = yup.object({
    image: yup.string().required('Image link is required'),
    title: yup.string().required('Title is required'),
    year: yup.string().required('Year is required'),
    nation: yup.string().required('Nation is required'),
    description: yup.string().required('Description is required'),
    trailer: yup.string().required('Trailer link is required')
  })

  const formik = useFormik({
    initialValues: {
      id: film?.id || '',
      image: film?.image || '',
      title: film?.title || '',
      year: film?.year || '',
      nation: film?.nation || '',
      description: film?.description || '',
      trailer: film?.trailer || ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values)
        if (filmId) {
          const updatedFilm: Film = {
            id: Number(filmId),
            image: values.image,
            title: values.title,
            year: values.year,
            nation: values.nation,
            description: values.description,
            trailer: values.trailer
          }
          await editFilmById(filmId, updatedFilm)
        }
      } catch (error) {
        console.log(error)
      } finally {
        handleClose()
        window.location.reload()
      }
    }
  })

  return (
    <ModalLayout open={open} handleClose={handleClose}>
      <Box
        bgcolor={theme.palette.mode === 'dark' ? '#121212' : 'white'}
        display={'inline-flex'}
        sx={{
          p: {
            xs: 1.5,
            sm: 3
          },
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        }}
      >
        <Edit fontSize='large' sx={{ mx: 1 }} />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: '1.5rem',
              sm: '2rem'
            }
          }}
          variant='h4'
        >
          Edit film
        </Typography>
      </Box>
      <form method='POST' onSubmit={formik.handleSubmit}>
        <FormControl sx={{ width: '100%', px: 5, my: 2 }}>
          <TextField
            sx={{ my: 1 }}
            onChange={handleChange}
            value={formik.values.title}
            label='Film title'
            variant='standard'
            fullWidth
            name='title'
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            sx={{ my: 1 }}
            onChange={handleChange}
            value={formik.values.image}
            label='Film image link'
            variant='standard'
            fullWidth
            name='image'
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
          />
          <Box display={'flex'} sx={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TextField
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '47%'
                }
              }}
              label='Film year'
              variant='standard'
              fullWidth
              value={formik.values.year}
              onChange={handleChange}
              name='year'
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
            />
            <TextField
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '47%'
                }
              }}
              label='Film nation'
              variant='standard'
              fullWidth
              value={formik.values.nation}
              onChange={handleChange}
              name='nation'
              error={formik.touched.nation && Boolean(formik.errors.nation)}
              helperText={formik.touched.nation && formik.errors.nation}
            />
          </Box>

          <TextField
            sx={{ my: 1 }}
            label='Film description'
            multiline
            maxRows={4}
            variant='standard'
            fullWidth
            value={formik.values.description}
            onChange={handleChange}
            name='description'
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            sx={{ my: 1 }}
            label='Film trailer link (Youtube embed link)'
            variant='standard'
            fullWidth
            value={formik.values.trailer}
            onChange={handleChange}
            name='trailer'
            error={formik.touched.trailer && Boolean(formik.errors.trailer)}
            helperText={formik.touched.trailer && formik.errors.trailer}
          />
        </FormControl>

        <Box
          bgcolor={theme.palette.mode === 'dark' ? '#121212' : 'white'}
          sx={{
            marginTop: 3,
            p: 1.5,
            position: 'sticky',
            bottom: -1,
            zIndex: 1,
            display: 'flex',
            justifyContent: 'end',
            width: '100%',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
          }}
        >
          <Button sx={{ my: 1, mr: 1, backgroundColor: 'var(--blue-color)' }} variant='contained' type='submit'>
            Edit
          </Button>
          <Button
            sx={{ my: 1, color: 'var(--red-color)' }}
            variant='outlined'
            color='error'
            onClick={() => {
              handleClose()
              setFilm({
                id: 0,
                image: '',
                title: '',
                year: '',
                nation: '',
                description: '',
                trailer: ''
              })
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </ModalLayout>
  )
}

export default EditFilmModal
