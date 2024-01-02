import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

import MoodChart from "./MoodChart.js";
import MoodSelector from "./MoodSelector.js";
import axios from "axios";

axios.defaults.withCredentials = true;


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

  getMoodChart = () => {
    axios
      .put(`http://${process.env.host}:5001/moodchart/out`, { withCredentials: true })
      .then((result) => {
        console.log(`MoodChartOut update: ${JSON.stringify(result.data)}`);

        let MoodChartData = {
          Anxiety: [],
          Depression: [],
          Mood: [],
          Energy: [],
        };

        console.log(`MoodChartData: ${JSON.stringify(MoodChartData, null, 2)}`);

        if (result.data !== "No Data") {
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

  render() {
    return (
      <>
        <Card variant="outlined">
          <CardContent>
            <h1>Day {this.props.day.toLocaleDateString(dateOptions)}</h1>
            <MoodSelector getMoodChart={this.getMoodChart} />
            <MoodChart getMoodChart={this.getMoodChart} />
          </CardContent>
        </Card>
      </>
    );
  }
}
