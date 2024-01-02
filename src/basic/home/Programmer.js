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
          LeftistMediaGroup.org and other LMG projects like Wade, Spphia ect.

          No programming experience required. Will train.
          <br />
        </div>

        <div style={{ textAlign: "left" }}>
          <br />

          Preferred skills:
          <ul>
            <li>Experience with front and backend development</li>
            <li>Node JS</li>
            <li>React</li>
            <li>HTML</li>
            <li>Linux</li>
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