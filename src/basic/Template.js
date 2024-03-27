import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

export default class Template extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Card>
          <CardContent>
            <h1>Template</h1>
          </CardContent>
        </Card>
      </>
    );
  }
}
