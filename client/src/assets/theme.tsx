import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#e10600',
      dark: '#6d090e'
    },
    secondary: {
      main: '#e8c50a'
    }
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#f3f3f3',
            '&:hover': {
              backgroundColor: '#f3f3f3'
            }
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#000'
        },
        select: {
          '&:focus': {
            backgroundColor: '#f3f3f3',
            borderRadius: '5px'
          },
          '&:hover': {
            backgroundColor: '#f3f3f3',
            borderRadius: '5px'
          }
        }
      }
    }
  },
  typography: {
    fontFamily: '"Roboto"'
  }
})

export default theme
