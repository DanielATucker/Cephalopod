import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

export class Sophia extends Component {
  render() {
    return (
      <>
        <Card>
          <CardContent>
            <div style={{ textAlign: "center" }}>
              <h4>Sophia</h4>
            </div>

            <div style={{ textAlign: "center" }}>
              Ask Leftist questions to be answered, discussed, or debated.
            </div>

            <br />
            <Card variant="outlined">
              <CardContent>
                <div className="row">
                  <div className="col">
                    <Card>
                      <CardContent>
                        <div style={{ textAlign: "left" }}>
                          <ul>
                            <li>Premises can be answered or escalated into a formal debate with
                              Debate Blocks.{" "}
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="col">
                    <Card>
                      <CardContent>
                        <div style={{ textAlign: "left" }}>
                          <ul>
                            <li>
                              Within traditional debate, you have a thesis or main point, and
                              that's made up of premises or single arguments. <br /> <br />
                              Within Sophia, things are the same, but a bit different, Sophia
                              uses rectangular blocks to visualize argumentation.{" "}
                            </li>
                          </ul>

                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="col">
                    <Card>
                      <CardContent>
                        <div style={{ textAlign: "left" }}>
                          <ul>
                            <li>
                              Each block is a 2D rectangle covered in text. <br /> <br />
                              Blocks are divided into a thesis (purple), supporting (green),
                              neutral (grey), or opposing (red). <br /> <br />
                              Multiple premises can connected to a thesis.
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="col">
                    <Card>
                      <CardContent>
                        <div style={{ textAlign: "left" }}>
                          <ul>
                            <li>
                              If someone has thoughts on your premise, they can post a
                              thought, or add a premise to your premise that either supports,
                              opposes or is neutral to your premise.
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="row-centered">
                  <br />
                  Sophia will generate meaningful, thought progressing ideas and
                  Praxis.
                </div>
                <br />
              </CardContent>
            </Card>

            <br />
            <br />

          </CardContent>
        </Card>
      </>
    );
  }
}

export default Sophia;
