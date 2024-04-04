import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

export default class PMSDiscord extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="col">
        <Card>
          <CardContent>
            <h1>PMS - DiscorclassNamed </h1>
            <Card>
              <CardContent>
                <div className="table-responsive">
                  <table border="1px">
                    <tr>
                      <th className="tro">
                        Handle
                      </th>

                      <th className="tro">
                        Last contacted
                      </th>

                      <th className="tro">
                        Welcomed
                      </th>

                      <th className="tro">
                        Projects joined

                        <div className="table-responsive">
                          <table border="1px">

                            <th className="tro">
                              Admin
                            </th>

                            <th className="tro">
                              Buddy System
                            </th>

                            <th className="tro">
                              Support Team
                            </th>

                            <th className="tro">
                              Emergency Support Team
                            </th>

                            <th className="tro">
                              Social Media Manager
                            </th>

                            <th className="tro">
                              Programmer
                            </th>

                            <th className="tro">
                              Mentorship

                              <div className="row">
                                <th className="tro">
                                  Mentor
                                </th>

                                <th className="tro">
                                  Mentee
                                </th>
                              </div>
                            </th>

                            <th className="tro">
                              Mutual Aid Contacting
                            </th>

                            <th className="tro">
                              Leftism Through Music
                            </th>

                            <th className="tro">
                              Leftist Education
                            </th>


                          </table>
                        </div>
                      </th>

                      <th className="tro">
                        Overloaded
                      </th>

                      <th className="tro">
                        Last Social
                      </th>

                      <th className="tro">
                        Country - State
                      </th>
                    </tr>
                  </table>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  }
}