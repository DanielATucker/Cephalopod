import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";


export class LMG_memes extends Component {
  render() {
    return (
      <>
        <Card>
          <CardContent>
            <div style={{ textAlign: "center" }}>
              <h4>LMG - Memes</h4>
            </div>

            <div style={{ textAlign: "center" }}>
              A facebook page for sharing leftist propaganda
            </div>

            <br />

            <div style={{ textAlign: "center" }}>Positions</div>

            <div className="row">
              <div className="col">
                <Card variant="outlined">
                  <CardContent>
                    <div style={{ textAlign: "center" }}>
                      <h4>Meme Distributer</h4>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      Share Leftist Memes on a dedicated Facebook page <br />
                    </div>

                    <div style={{ textAlign: "left" }}>
                      <br />
                      Time Requirement: <br />
                      <ul>
                        <li>1 Hour a week</li>
                      </ul>
                      Position Requirements:
                      <ul>
                        <li>Experience with Facebook</li>
                        <li>Preferred - Experience with Facebook Pages</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default LMG_memes;
