import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";
import ReactPlayer from 'react-player'

export default class RevolutionTelevision extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Card>
        <CardContent>

          <div className="col-sm-3">
            <h1> Revolution Television</h1>
          </div>

          <div class="row">

            <h3>{this.props.song.Name}</h3>
            <ReactPlayer 
            url='https://www.youtube.com/watch?v=LXb3EKWsInQ' 
            controls={true}
            
            />

          </div>
        </CardContent>
      </Card>
    );
  }
}
