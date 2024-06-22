import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#999',
      contrastText: '#000',
    },
    text: {
      primary: '#000',
    },
  },
  typography: {
    fontFamily: '"Raleway", sans-serif',
    fontSize: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          borderWidth: 2,
          px: 0,
          fontWeight: 700,
          fontSize: 26,
          borderRadius: 10,
          ':hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
})
