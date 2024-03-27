import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";
import ReactPlayer from 'react-player'

export default class SundaySocial extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="row RevolutionTelevision">
        <Card>
          <CardContent>
            <h1>Sunday Social</h1>


            <h3>Revolution Television</h3>
            <ReactPlayer
              url={process.env.socialHost}
              controls={true}
              width="500px"
              height="500px"
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}
