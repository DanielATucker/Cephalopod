import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";
import { Stream } from "@cloudflare/stream-react";


export default class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "47c51e41d6b1efbed0461761dcf01747"
    };
  }

  render() {
    return (
      <>
        <Card>
          <CardContent>
            <h1>Music</h1>

            <>
              <Card>
                <CardContent>
                  <div style={{ textAlign: "center" }}>
                    <h4>Leftism Through Music</h4>
                  </div>
                  <Card variant="outlined">
                    <CardContent>
                      <div className="row">
                        <div className="col">
                          <p>
                            This course will provide listeners with a playlist
                            of 80+ downloadable leftist songs to listen to and
                            reflect on centered around leftist topics.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <a href="https://open.spotify.com/playlist/0Of0TS1QSKmeb7G8DrR40x?si=276bb70e04c94dda" target="_blank">Click here for playlist!</a>
                </CardContent>
              </Card>
            </>

            <Card>
              <CardContent>
              <div>
              <Stream controls src={this.state.token} />
            </div>
              </CardContent>
            </Card>
           
          </CardContent>
        </Card>
      </>
    );
  }
}
