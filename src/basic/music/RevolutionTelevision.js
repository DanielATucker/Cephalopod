import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";
import { Stream } from "@cloudflare/stream-react";


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

            <Stream controls
              src={this.props.song.url}
              height="720"
              width="1280"
              allowfullscreen="true" />

          </div>
        </CardContent>
      </Card>
    );
  }
}
