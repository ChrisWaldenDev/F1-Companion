import React from 'react'
import { AppBar, Box, Button, Divider, Stack, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

// Defines the Navbar
function Navbar (): JSX.Element {
  const navigate = useNavigate()

  function handleClick (route: string): void {
    navigate(route)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        minHeight: '80px',
        justifyContent: 'center'
      }}>
        <Toolbar>
          <Button disableRipple onClick={() => {
            handleClick('/')
          }} sx={{ textTransform: 'none', ml: '-10px' }}>
            <Typography fontSize="x-large" fontWeight="bold" color="#f3f3f3">
              F1 Companion
            </Typography>
          </Button>
          <Divider orientation="vertical" flexItem sx={{ p: '5px' }}/>
          <Stack direction="row" spacing={2}
                 divider={<Divider orientation="vertical" variant="middle" flexItem/>}
                 sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
            <Button variant="text" disableRipple onClick={() => {
              handleClick('/drivers')
            }}
                    sx={{ m: 1, color: '#f3f3f3', textTransform: 'none', fontSize: 'large' }}>
              Drivers
            </Button>
            <Button variant="text" disableRipple onClick={() => {
              handleClick('/constructors')
            }}
                    sx={{ m: 1, color: '#f3f3f3', textTransform: 'none', fontSize: 'large' }}>
              Constructors
            </Button>
            <Button variant="text" disableRipple onClick={() => {
              handleClick('/schedule')
            }}
                    sx={{ m: 1, color: '#f3f3f3', textTransform: 'none', fontSize: 'large' }}>
              Schedule
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
