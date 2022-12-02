import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#d20104',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#d20104',
    },
    background: {
      paper: '#d20104',
      default: '#000000',
    },
  },
});