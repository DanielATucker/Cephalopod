import { Card, CardContent } from "@mui/material";
import React, { Component } from "react";

export class Stats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardContent>
          <h1>Stats</h1>
        </CardContent>
      </Card>
    );
  }
}

export default Stats;
