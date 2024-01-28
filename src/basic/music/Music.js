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
      <>
        <Card>
          <CardContent>
            <h4>Leftism Through Music</h4>

            <p>
              80+ leftist songs
            </p>

            <a href="https://open.spotify.com/playlist/0Of0TS1QSKmeb7G8DrR40x?si=276bb70e04c94dda" target="_blank">Click here for Spotify playlist!</a>
          </CardContent>
        </Card>

        <div class="row" style={{ display: block }}>
          <div class="col-sm">
            <Playlists playlist={this.state.playlist} returnSong={this.returnSong} />
          </div>
          <div class="col-sm">
            <RevolutionTelevision song={this.state.song} />
          </div>
        </div>

      </>
    );
  }
}
