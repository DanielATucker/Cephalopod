import React, { Component } from "react";
import { Card } from '@mui/material';

import Main from "./components/main";


export default class App extends Component {
  constructor() {
    super();
    let a = 1;
  };

  render() { 
    return (
      <Card variant="outlined">
        <Main/>
      </Card> 
    )
  };
}

