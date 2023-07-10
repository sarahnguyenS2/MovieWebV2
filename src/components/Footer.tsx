import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary'>
      {'Copyright © '}
      Thanh Hao {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const StickyFooter: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CssBaseline />
      <Box
        component='footer'
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          bgcolor: 'lightgrey' // Update the background color here
        }}
      >
        <Container maxWidth='sm'>
          <Copyright />
        </Container>
      </Box>
    </Box>
  )
}

export default StickyFooter
