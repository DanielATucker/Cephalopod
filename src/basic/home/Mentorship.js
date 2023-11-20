import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

export class Mentorship extends Component {
  render() {
    return (
      <>
        <Card>
          <CardContent>
            <div style={{ textAlign: "center" }}>
              <h4>Leftist Media Group for social media</h4>
            </div>

            <br />
            <div className="row-centered">
              <Card variant="outlined">
                <CardContent>
                  <p>
                    All users assigned randomized username. DO NOT SHARE
                    PERSONAL DETAILS assume everyone is a cop
                  </p>
                </CardContent>
              </Card>
            </div>
            <br />
            <Card>
              <CardContent>
                <div className="row-centered">
                  <h2>Community</h2>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <h4>Mentorship </h4>
                    <Card variant="outlined">
                      <CardContent>
                        <p>
                          Leftist mentors find connect with new Leftists and
                          share knowledge and experience.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="col">
                    <h4> Music </h4>
                    <Card variant="outlined">
                      <CardContent>
                        <p>
                          Create and share playlists of leftist music tailored
                          to your friends
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="col">
                    <h4> Education </h4>
                    <Card variant="outlined">
                      <CardContent>
                        <p>Intro to Leftistm guides.</p>
                        <p>Library of leftist texts.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="row-centered">
              <h2> Organization </h2>

              <br />

              <div className="row">
                <div className="row-centered">
                  <h4>local Praxis meets </h4>

                  <div className="row">
                    <div className="col">
                      <p>Choose public place in the city you live.</p>
                    </div>

                    <div className="col">
                      <p>
                        Choose a community praxis task (garbage cleanup,
                        protest, unhoused assistance, ect){" "}
                      </p>
                    </div>

                    <div className="col">
                      <p>
                        Others in your city rsvp to event and organize goals and
                        supplies
                      </p>
                    </div>

                    <div className="col">
                      <p>Task gets accomplished </p>
                    </div>
                  </div>

                  <div className="row-centered">
                    <p className="font-weight-bold">
                      Achievement unlocked, Praxis
                    </p>
                  </div>

                  <div className="row">
                    <div className="col">
                      <h2> Emergency Fund </h2>

                      <div className="row-centered">
                        <p>
                          Directly send money to those in need. <br />
                          Recipient posts a request for assistance, specifying
                          situation.
                        </p>
                      </div>

                      <div className="row">
                        <div className="col">
                          <p>LMG verifies recipient is real person.</p>
                        </div>
                        <div className="col">
                          <p>
                            Donor selects post, then is given preferred money
                            transfer details for recipient.{" "}
                          </p>
                        </div>
                        <div className="col">
                          Upon successful transaction, recipient may choose to
                          open a chat with the donor to thank them. <p />{" "}
                        </div>
                      </div>

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
                                  <li>
                                    Experience with front and backend
                                    development
                                  </li>
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default Mentorship;
