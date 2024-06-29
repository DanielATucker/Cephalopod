import React, { Component } from "react";

import { Button, Card, CardContent } from "@mui/material";
import ReactPlayer from 'react-player'

export default class RevolutionTelevision extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queue: null
    };
  }

  render() {
    if (this.props.song === null) {
      return (
        <div class="row">
          <Card>
            <CardContent>
              <h1> Revolution Television</h1>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      return (
        <div class="row">
          <Card>
            <CardContent>
              <h1> Revolution Television</h1>

              <h3>{this.props.song.name}</h3>
              <div class="row">
                <div class="col">
                  <ReactPlayer
                    url={`${process.env.broadcast}${this.props.song.url}`}
                    controls={true}
                    width="150px"
                    height="150px"
                    playing={true}
                    onEnded={() => {
                      this.props.NextSong();
                    }}
                    light={`${process.env.broadcast}${this.props.song.art}.jpeg`}
                  />
                  <Button
                    onClick={this.props.PrevSong}
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={this.props.NextSong}>
                    Next
                  </Button>
                </div>
                <div class="col">
                  <img
                    src={`${process.env.broadcast}${this.props.song.art}.jpeg`}
                    alt="Album Art"
                    style={{
                      height: 180,
                      width: 180,
                    }}
                  />
                </div>
              </div>


            </CardContent>
          </Card>
        </div>
      );
    }
  }
}
