import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class MoodChart extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  }

  componentDidMount() {
    this.props.getMoodChart();
  }
  render() {
    return (
      <>
        <Card>
          <CardContent>
            {" "}
            <div>
              <CanvasJSChart
                options={this.props.options}
              /* onRef={ref => this.chart = ref} */
              />
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}
