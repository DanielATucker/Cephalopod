import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Card, CardContent } from "@mui/material";

export class Wade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      WadeData: {
        datasets: [
          {
            data: [50, 50],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
          },
        ],
        labels: ["Personnel 50%", "Software 50%"],
      },
      WadeOptions: {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    };
  }
  render() {
    return (
      <>
        <Card>
          <CardContent>
            <div style={{ textAlign: "center" }}>
              <h4>Wade</h4>
            </div>

            <div style={{ textAlign: "center" }}>
              Community response system made to assist with the development,
              design, and organization of protests
            </div>

            <div className="row">
              <div className="col" style={{ textAlign: "center" }}>
                <Doughnut
                  data={this.state.WadeData}
                  options={this.state.WadeOptions}
                />
              </div>
            </div>

           
          </CardContent>
        </Card>
      </>
    );
  }
}

export default Wade;
