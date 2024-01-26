import React, { Component } from "react";

import { Button, Card, CardContent } from "@mui/material";

export default class Playlists extends Component {
  constructor(props) {
    super(props);

    this.state = {};


  }

  renderSongs = () => {
    Object.values(this.props.playlist).map((song) => {
      return (
        <div class="row ">
          <Button
            onClick={() => {
              if (this.state) {
                this.props.returnSong(song);
              }
            }}
          >
            {JSON.stringify(song.Name)}
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
            <h1>Playlist</h1>

            <Card>
              <CardContent>
                <p>
                  {this.renderSongs()}
                </p>

                <p>
                  {JSON.stringify(this.props.playlist, null, 2)}
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </>
    );
  }
}
