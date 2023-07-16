import { Button } from "@mui/material";
import React, { Component } from "react";

import { Dropdown } from "react-bootstrap";

import ReactPlayer from "react-player/lazy";

import Library from "./Library/Library.json";

export class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Library: [],
      urls: [],
      queue: [],
    };
  }  

  getUrls(song) {
    return song.URL;
  }

  songCard(song, SongLibrary) {
    SongLibrary.push(
      <div className="col-md grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="col-md grid-margin stretch-card">
              <div className="card">
                <div className="card-body"></div>
                <h4 className="card-title">Player</h4>

                <ReactPlayer url={this.state.urls} />
              </div>
            </div>
            <h4 className="card-title">{song.Title}</h4>
            Buttons Don't work yet
            <Button>Play {song.Title} Now</Button>
            <Button
              onClick={(song) => {
                this.state.queue.push(song.Title);
              }}
            >
              Add {song.Title} to queue
            </Button>
            <Dropdown>
              <Dropdown.Toggle
                variant="btn btn-primary"
                id="dropdownMenuButton1"
              >
                Song Info
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>{song.Title}</Dropdown.Header>

                <Dropdown.Item>
                  Song Summary: <br />
                  {song.Summary}
                </Dropdown.Item>

                <Dropdown.Item>
                  {" "}
                  Lyrics: <br />
                  Coming soon
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-md grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Music</h4>

              <div className="row">
                <div className="col-md grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Library</h4>

                      {this.state.SongLibrary}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Music;
