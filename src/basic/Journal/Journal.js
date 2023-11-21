import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";
import Calendar from "react-calendar";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MoodChart from "./MoodChart";
import Day from "./Day";

export default class Journal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateSelected: new Date(),
    };
  }

  onDateChange = (data) => {
    console.log(`Date Data: ${data}`);
  };

  render() {
    return (
      <div class="row">
        <div class="col">
          <Card>
            <CardContent>
              <h1>Journal</h1>

              <Calendar
                onChange={this.onDateChange}
                value={this.state.dateSelected}
              />

              <Day day={this.state.dateSelected} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
