import { Card, CardContent } from "@mui/material";
import React, { Component } from "react";

export class Revolution extends Component {
  render() {
    return (
      <Card variant="outlined">
        <CardContent>
          <h1>Revolution</h1>

          <div className="row-centered">
            <h4>What is Revolution?</h4>

            <p>
              Revolution is the process of going from our current Capitalist
              system
              <br />
              to a new Anarcho-Syndicalist society.
            </p>
          </div>

          <Card>
            <CardContent>
              <div className="row-centered">
                <div className="col">
                  <Card>
                    <CardContent>
                      <h4> Capitalism - Where we are now</h4>

                      <p>Leading towards next Global Extinction (GE) event.</p>

                      <Card>
                        <CardContent>
                          <div className="row">
                            <div className="col">
                              <p>Prevent next GE event</p>
                            </div>

                            <div className="col">
                              <p>Educate the masses</p>
                            </div>

                            <div className="col">
                              <p>Recruit</p>
                            </div>

                            <div className="row-centered">
                              <p> Organize Locally</p>
                              <div className="row">
                                <div className="col">
                                  <p>Organize local Praxis meets</p>
                                </div>
                                <div className="col">
                                  <p>Organize local climate groups</p>
                                </div>

                                <div className="col">
                                  <p>Start local LMG Chapter</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="row-centered">
                <h4> Socialism - Transitionary stage</h4>

                <Card>
                  <CardContent>
                    <div className="row">
                      <div className="col">
                        <p>Government funded social programs</p>
                      </div>

                      <div className="col">
                        <p>Self dissolving Government</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="row-centered">
                <div className="col">
                  <h4>Anarcho Syndicalism - World peace and prosperity</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  }
}

export default Revolution;
