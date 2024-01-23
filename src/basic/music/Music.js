import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";
import { Stream } from "@cloudflare/stream-react";


export default class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "47c51e41d6b1efbed0461761dcf01747"
    };
  }

  render() {
    return (
      <>
        <Card>
          <CardContent>
            <h1>Music</h1>

            <div>
              <Stream controls src={this.state.token} />
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}
