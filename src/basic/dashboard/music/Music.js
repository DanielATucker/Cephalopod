import { Button, Card, CardContent } from "@mui/material";
import React, { Component } from "react";

import { Dropdown } from "react-bootstrap";

import ReactPlayer from "react-player/lazy";

import Library from "./Library/Library.json";

export default class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SongLibrary: [],
      urls: [],
      queue: [],
    };
  }

  getUrls(song) {
    return song.URL;
  }

  render() {
    let cards = Object.values(Library).map((song) => (
      <div class="col">
        <Card>
          <CardContent>
            <Card>
              <CardContent>
                <h5>{song.Title}</h5>

                <Button>Play</Button>
                <br />

                <Button
                  onClick={(song) => {
                    this.state.queue.push(song.Title);
                  }}
                >
                  Add to queue
                </Button>
                <br />

                <p> Song Info </p>
                <p> {song.Artist}</p>
                <p>Song Summary</p>
                <p>{song.Summary}</p>
                <p>
                  Lyrics:
                  <br />
                  Coming soon
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    ));

    return (
      <div class="container">
        <Card>
          <CardContent>
            <h1> Music </h1>

            <h4>Player</h4>
            <br />

            <ReactPlayer
              width="100%"
              height="10%"
              controls
              light
              url={`http://${process.env.host}/vidChunk?id=Fuck_the_Cistem`}
            />

            <div className="row">
              <Card>
                <CardContent>
                  <h4>Library</h4>

                  <Card>
                    <CardContent>
                      <div class="row">{cards}</div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
