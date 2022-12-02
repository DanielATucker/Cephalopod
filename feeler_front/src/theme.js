import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#d20104',
    },
    background: {
      paper: '#262525',
      default: '#262525',
    },
  },
});