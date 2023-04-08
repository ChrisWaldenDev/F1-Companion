import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6d090e',
            dark: '#471011'
        },
        secondary: {
            main: '#e8c50a',
        },
    },
    typography: {
        fontFamily: '"Roboto"',
        textTransform: 'none'
    },
    // Add any other customizations here
});

export default theme;