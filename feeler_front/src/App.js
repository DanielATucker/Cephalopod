import React, { Component } from "react";
import { Card } from '@mui/material';

import { Theme } from "./theme.js";
import { ThemeProvider } from '@mui/material/styles';

import Main from "./components/main.js";


export default class App extends Component {
  render() { 
    return (
      <>
      <ThemeProvider theme={Theme}>
      <Card variant="outlined">
        <Main />
      </Card>
      </ThemeProvider>
      </>
    )
  };
}

