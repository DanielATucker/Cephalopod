import React, { Component } from "react";

import { Button, Card, CardContent } from "@mui/material";

export default class Playlists extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    const songsList = Object.values(this.props.playlist).map((song) => <li key={song.Name}>
      <Button
        onClick={() => {
          if (this.state) {
            this.props.returnSong(song);
          }
        }}
      >
        {song.Name}
        <iframe
          src={`https://customer-8dwfpc3bffzxtifb.cloudflarestream.com/${song.url}/thumbnails/thumbnail.jpg?time=1s&height=270`}
          style={{ border: none, position: absolute, top: 0, left: 0, height: 100, width: 100 }}
        ></iframe>

      </Button>
    </li>);


    return (
      <>
        <Card>
          <CardContent>
            <h1>Playlist</h1>

            <Card>
              <CardContent>
                <p>
                  {songsList}
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </>
    );
  }
}
