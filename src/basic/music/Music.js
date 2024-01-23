import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

export default class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Card>
          <CardContent>
            <h1>Music</h1>
          </CardContent>
        </Card>
      </>
    );
  }
}
