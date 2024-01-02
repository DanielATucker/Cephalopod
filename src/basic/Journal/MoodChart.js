import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";

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

  getMoodChart = () => {
    axios
      .put(`http://localhost:5001/moodchart/out`, { withCredentials: true })
      .then((result) => {
        console.log(`MoodChartOut update: ${JSON.stringify(result.data)}`);

        let MoodChartData = {
          Anxiety: [],
          Depression: [],
          Mood: [],
          Energy: [],
        };

        console.log(`MoodChartData: ${JSON.stringify(MoodChartData, null, 2)}`);

        if (result.data.Anxiety) {
          Object.values(result.data).forEach((mood, moodVal) => {
            let moodName = Object.keys(MoodChartData)[moodVal];

            console.log(`Mood: ${JSON.stringify(mood)} MoodName: ${moodName}`);

            Object.values(mood).forEach((entry) => {
              Object.values(entry).forEach((point, pointNameVal) => {
                let pointName = Object.keys(entry)[pointNameVal];

                console.log(`PointName: ${pointName}`);

                if (pointName === "x") {
                  console.log(`Entry: ${JSON.stringify(entry, null, 2)}`);
                  entry.x = new Date(entry.x);

                  console.log(`Final Entry: ${JSON.stringify(entry, null, 2)}`);
                }
              });
            });
            MoodChartData[moodName] = mood;
          });

          let NewOptions = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            title: {
              text: "Moods",
            },
            axisY: {
              title: "Mood Val",
            },
            axisX: {
              title: "Time",
              interval: 2,
            },
            data: [
              {
                type: "line",
                toolTipContent: "Week",
                dataPoints: MoodChartData.Anxiety,
              },
            ],
          };

          console.log(
            `DataPonts: ${JSON.stringify(
              NewOptions.data[0].dataPoints,
              null,
              2
            )}`
          );
          this.setState({ options: NewOptions });
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

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
