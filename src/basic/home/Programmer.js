import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";


export class Programmer extends Component {
  render() {
    return (
      <>
        <div style={{ textAlign: "center" }}>Positions</div>

<div className="row">
  <div className="col">
    <Card variant="outlined">
      <CardContent>
        <div style={{ textAlign: "center" }}>
          <h4> Node js Programer</h4>
        </div>
        <div style={{ textAlign: "center" }}>
          Work in Node js to build the backend for
          LeftistMediaGroup.org and Sophia
          <br />
        </div>

        <div style={{ textAlign: "left" }}>
          <br />
          Time Requirement: <br />
          <ul>
            <li>1 Hour a week</li>
          </ul>
          Position Requirements:
          <ul>
            <li>Experience with front and backend development</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
</div> 
      </>
    );
  }
}

export default Programmer;