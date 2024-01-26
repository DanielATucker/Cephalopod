import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

export default class Playlists extends Component {
  constructor(props) {
    super(props);

    this.state = {};


  }

  renderSongs = () => {
    Object.values(this.props.playlist).forEach((song) => {
      return (
        <div class="row ">
          <Button
            onClick={() => {
              if (this.state) {
                this.props.returnSong(song);
              }
            }}
          >
            {song.Name()}
          </Button>
        </div>
      )
    })
  }


  render() {
    return (
      <>
        <Card>
          <CardContent>
            <h1>Playlists</h1>

            <Card>
              <CardContent>
                <p>
                  {this.renderSongs()}
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </>
    );
  }
}
