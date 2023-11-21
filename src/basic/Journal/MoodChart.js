import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class MoodChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", // "light1", "dark1", "dark2"
        title: {
          text: "Moods",
        },
        axisY: {
          title: "Mood Val",
          suffix: "%",
        },
        axisX: {
          title: "Time",
          prefix: "T",
          interval: 2,
        },
        data: [
          {
            type: "line",
            toolTipContent: "Week {x}: {y}%",
            dataPoints: [{ x: new Date(), y: 64 }],
          },
        ],
      },
    };
  }

  render() {
    return (
      <>
        <Card>
          <CardContent>
            {" "}
            <div>
              <CanvasJSChart
                options={this.state.options}
                /* onRef={ref => this.chart = ref} */
              />
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}
