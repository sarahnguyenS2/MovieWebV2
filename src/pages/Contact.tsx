/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useRef } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }
  return (
    <Box sx={{ backgroundColor: 'var(--black-color)', py: 4 }}>
      <Typography sx={{ textAlign: 'center', color: 'var(--primary-color)', fontWeight: '700' }} variant='h4'>
        Send your request
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
          my: 3,
          width: { xs: '80%', sm: '60%' },
          mx: 'auto',
          color: 'white'
        }}
        variant='h6'
      >
        I would love to respond to your queries.
      </Typography>
      <Paper
        elevation={3}
        sx={{ width: { xs: '90%', sm: '60%' }, mx: 'auto', p: 4, backgroundColor: 'var(--light-color)' }}
      >
        <Box
          ref={form}
          component='form'
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}
        >
          <TextField
            sx={{
              my: 2,
              width: { xs: '100%', sm: '48%' }
            }}
            label='Full Name'
            name='from_name'
            required
          />

          <TextField
            sx={{
              my: 2,
              width: { xs: '100%', sm: '48%' }
            }}
            type='email'
            label='Email'
            name='from_email'
            required
          />

          <TextField
            sx={{
              my: 2,
              width: { xs: '100%', sm: '48%' }
            }}
            type='tel'
            label='Phone No.'
            name='from_phoneNo'
            required
          />

          <TextField
            sx={{
              my: 2,
              width: { xs: '100%', sm: '48%' }
            }}
            label='Subject'
            name='subject'
            required
          />

          <TextField
            sx={{
              my: 2,
              width: '100%'
            }}
            label='Message'
            multiline
            rows={4}
            name='message'
            required
          />
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              type='submit'
              variant='contained'
              sx={{
                width: '20%',
                backgroundColor: 'var(--primary-color)',
                '&:hover': { backgroundColor: 'var(--primary-light-color)' }
              }}
              size='medium'
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default ContactForm
