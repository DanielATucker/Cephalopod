import React, { Component } from "react";
import { Card } from '@mui/material';

import Main from "./components/main.js";
import { Theme } from "./theme.js";


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

