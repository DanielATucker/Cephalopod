import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

import MoodChart from "./MoodChart.js";
import MoodSelector from "./MoodSelector.js";
import axios from "axios";
import Tasks from "./Tasks/Tasks.js";
import TextArea from "./TextArea/TextArea.js";
import strftime from "strftime";

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
      tasks: {
        newTaskName: "",
        newSubTaskName: "",
      },
      taskList: {},
      entry: "",
    };
  }

  updateEntry = (entry, socket) => {
    if ((entry !== this.state.entry && entry !== "Not Initalized")) {
      this.setState({ entry: entry })

      socket.emit("TextArea_Entry", ({
        entry: entry,
        date: strftime("%y%m%d", this.props.day)
      }));
    }
  }


  getMoodChart = () => {
    axios
      .put(`https://${process.env.host}/moodchart/out`, { withCredentials: true })
      .then((result) => {
        console.log(`MoodChartOut update: ${JSON.stringify(result.data)}`);

        let MoodChartData = {
          Anxiety: [],
          Depression: [],
          Mood: [],
          Energy: [],
        };

        console.log(`MoodChartData: ${JSON.stringify(MoodChartData, null, 2)}`);

        if (result.data !== "No Data" && result.data.ok) {
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
                axisYType: "secondary",
                name: "Anxiety",
                showInLegend: true,
                dataPoints: [
                  MoodChartData.Anxiety],
              },
              {
                type: "line",
                axisYType: "secondary",
                name: "Depression", showInLegend: true,
                dataPoints: [
                  MoodChartData.Depression],
              },
              {
                type: "line",
                axisYType: "secondary",
                name: "Mood", showInLegend: true,
                dataPoints: [
                  MoodChartData.Mood],
              },
              {
                type: "line",
                axisYType: "secondary",
                name: "Energy", showInLegend: true,
                dataPoints: [
                  MoodChartData.Energy],
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

  newTaskNameChange = (TaskName) => {
    this.setState({ tasks: { newTaskName: TaskName } });
  };

  newSubTaskNameChange = (TaskName) => {
    this.setState({ tasks: { newSubTaskName: TaskName } });
  };

  subTaskSubmit = (task) => {
    console.log(`Submit: ${JSON.stringify(task, null, 2)}`);
    axios
      .put(`https://${process.env.host}/tasks/subTaskIn`, {
        subTaskName: this.state.tasks.newSubTaskName,
        parent: task

      }, { withCredentials: true })
      .then((result) => {
        console.log(`Result: ${JSON.stringify(result, null, 2)}`);

        this.setTaskList(result.data);
      });
  }

  submit = () => {
    console.log(`Submit: ${JSON.stringify(this.props.tasks, null, 2)}`);
    axios
      .put(`https://${process.env.host}/tasks/taskIn`, {
        taskName: this.state.tasks.newTaskName,
      }, { withCredentials: true })
      .then((result) => {
        console.log(`Result: ${JSON.stringify(result.data, null, 2)}`);

        this.setTaskList(result.data);
      });
  };

  setTaskList = (taskList) => {
    this.setState({ taskList: taskList });
  };

  render() {
    return (
      <>
        <Card variant="outlined">
          <CardContent>
            <h1>Day {this.props.day.toLocaleDateString(dateOptions)}</h1>
            <MoodSelector getMoodChart={this.getMoodChart} />
            <MoodChart getMoodChart={this.getMoodChart} options={this.state.options} />
            <TextArea entry={this.state.entry} updateEntry={this.updateEntry} day={this.props.day} getMoodChart={this.getMoodChart} username={this.props.username} />

            <Tasks day={this.props.day} tasks={this.state.tasks} newTaskNameChange={this.newTaskNameChange} taskList={this.state.taskList} setTaskList={this.setTaskList} submit={this.submit} subTaskSubmit={this.subTaskSubmit} newSubTaskNameChange={this.newSubTaskNameChange} />
          </CardContent>
        </Card>
      </>
    );
  }
}
