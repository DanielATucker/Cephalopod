import React, { Component } from "react";

import { Button, Card, CardContent } from "@mui/material";

export default class Playlists extends Component {
  constructor(props) {
    super(props);

    this.state = {};


  }


  render() {
    const songsList = Object.values(this.props.playlist).map((song) => <li key={song.Name}>      <div class="row">
      <Button
        onClick={() => {
          if (this.state) {
            this.props.returnSong(song);
          }
        }}
      >
        {JSON.stringify(song.Name)}
      </Button>
    </div></li>);


    return (
      <>
        <Card>
          <CardContent>
            <h1>Playlist</h1>

            <Card>
              <CardContent>
                <p>
                  {songsListy}
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </>
    );
  }
}
