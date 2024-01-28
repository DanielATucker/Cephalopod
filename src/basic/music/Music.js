import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";
import axios from "axios";
import { ValueService } from "ag-grid-community";
import RevolutionTelevision from "./RevolutionTelevision";
import Playlists from "./Playlists";


export default class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "47c51e41d6b1efbed0461761dcf01747",
      playlist: {},
      song: { Name: "Loading", url: "Loading" }
    };

    this.getEndpoints();
  }

  getEndpoints = () => {
    let playlist = {};

    axios
      .get(`https://${process.env.host}/music/getEndpoints`, {
        withCredentials: true,
      }).then((data) => {
        console.log(`DATA: ${JSON.stringify(data.data, null, 2)}`);
        this.setState({ playlist: data.data });
        this.forceUpdate();
      });
  };

  returnSong = (song) => {
    this.setState({ song: song })
  }

  render() {
    return (
      <div class="row">
        <Card>
          <CardContent>
            <div className="page-header">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="!#" onClick={(event) => event.preventDefault()}>
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Leftism Through Music
                  </li>
                </ol>
              </nav>
            </div>

            <h3 className="page-title">Leftism Through Music</h3>

            <p>
              80+ leftist songs
            </p>

            <a href="https://open.spotify.com/playlist/0Of0TS1QSKmeb7G8DrR40x?si=276bb70e04c94dda" target="_blank">Click here for Spotify playlist!</a>
          </CardContent>
        </Card>

        <div class="col">
          <Playlists playlist={this.state.playlist} returnSong={this.returnSong} />
        </div>

        <div class="col">
          <RevolutionTelevision song={this.state.song} />
        </div>
      </div>
    );
  }
}
