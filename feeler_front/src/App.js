import React, { Component } from "react";
import { Card } from '@mui/material';
import {SocketContext, socket} from 'context/socket.js';


import Main from "./components/main";


export default class App extends Component {
  constructor() {
    super();
    let a = 1;
  };

  render() { 
    return (
      <SocketContext.Provider value={socket}>
      <Card variant="outlined">
        <Main/>
      </Card>
      </SocketContext.Provider>
    )
  };
}

