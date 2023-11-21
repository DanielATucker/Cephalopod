import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

import MoodChart from "./MoodChart.js";
import MoodSelector from "./MoodSelector.js";

var dateOptions = {
  weekday: "long",
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour12: false,
};

export default class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Card>
          <CardContent>
            <h1>Day {this.props.day.toLocaleDateString(dateOptions)}</h1>
            <MoodSelector />
            <MoodChart />
          </CardContent>
        </Card>
      </>
    );
  }
}
