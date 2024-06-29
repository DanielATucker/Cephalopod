import React, { Component } from "react";

import { Button, Card, CardContent, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import axios from "axios";
import { Collapse } from "react-bootstrap";

export default class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Vault1: {},
      songs: {},
      isActive: null,
      isActiveSongs: null,
      Vault1CollapseAll: false,
    };
  }

  GetMusic() {
    axios
      .get(`https://${process.env.host}/music/get_all`, { withCredentials: true })
      .then((result) => {
        this.props.returnVault1(result.data);

        return (result.data)
      }).then((result) => {
        result.children.forEach((folder) => {
          new Promise((resolve, reject) => {
            for (let i = 0; i < Object.keys(folder.children).length; i++) {
              let childNameMp3 = folder.children[i].name.split(".mp3");
              let childNameArray = childNameMp3[0].split(" - ");
              let childName = childNameArray[1];

              let path = folder.children[i].path;

              let songPath = path.split("Vault-1")[1];
              let art = songPath.replace("Music", "AlbumArt");

              let songs = this.state.songs;

              songs[childName] = {
                name: childName,
                path: path,
                art: art
              }

              this.setState({ songs: songs })
            }
            resolve();
          }).then(() => {
            this.GetActiveMusic(this.state.songs);
          })
        })
      })
  }

  GetActiveMusic = (songs) => {
    axios
      .put(`https://${process.env.host}/Music/is_active`, { songs: songs }, { withCredentials: true })
      .then((result) => {
        this.setState({ isActive: result.data })
      });
  }

  setActive = (song, status) => {
    axios
      .put(`https://${process.env.host}/Music/set_active`, {
        song: song,
        status: status,
      }, { withCredentials: true })
      .then((result) => {
        this.setState({ isActive: result.data })
      });
  }

  componentDidMount() {
    this.GetMusic();
  }

  render() {
    let Songs = Object.keys(this.state.songs).map((song) => {

      console.log(`Song ${JSON.stringify(song, null, 2)}`)

      if (this.state.isActive !== null) {
        return (
          <tr>
            <td style={{ maxWidth: 300 }}>
              <br />
              <div class="row">
                <div class="col" style={{ maxWidth: 82 }}>
                  <img
                    src={`${process.env.broadcast}${this.state.songs[song].art}.jpeg`}
                    alt="Album Art"
                    style={{
                      height: 80,
                      width: 80,
                    }}
                  />
                </div>
                <div class="col">
                  {this.state.songs[song].name}
                </div>
              </div>
            </td>
            <td>
              <FormGroup>
                <FormControlLabel control={
                  <Checkbox
                    size="small"
                    checked={this.state.isActive[song].is_active}
                    onChange={(event) => {
                      let status = event.target.checked
                      this.setActive(song, status)
                    }}
                  />
                } />
              </FormGroup>
            </td>
          </tr>

        )
      } else {
        return (
          <tr>

            <td>
              {this.state.songs[song].name}
            </td>
            <td>
              Loading...
            </td>
          </tr>
        )
      }

    })

    return (
      <Card>
        <CardContent>
          <h1>Music</h1>

          <div class="table-responsive">
            <h1> Vault 1 </h1>

            <Button variant="contained" onClick={() => {
              this.setState({ Vault1CollapseAll: !this.state.Vault1CollapseAll })
            }}>
              Show Full Vault
            </Button>
            <br />
            <br />

            <Collapse in={this.state.Vault1CollapseAll}>
              <table class="table" border="1px">
                <th> Song Name</th>
                <th> Is Active </th>

                {Songs}
              </table>
            </Collapse>
          </div>

        </CardContent>
      </Card >
    );
  }
}
