import React, { Component } from "react";
import { Card } from '@mui/material';

import Main from "./components/main.js";


export default class App extends Component {
  render() { 
    return (
      <Card variant="outlined">
        <Main/>
      </Card>
    )
  };
}

