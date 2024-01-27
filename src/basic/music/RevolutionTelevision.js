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
              url={`https://customer-ba23880fbe114d86ebe685cad62bf9e2.cloudflarestream.com/${song.url}/manifest/video.m3u8`}
              controls={true}

            />

          </div>
        </CardContent>
      </Card>
    );
  }
}
