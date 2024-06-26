import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";
import Music from "./Music/Music";

export default class Wade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Vault1: null,
      Songs: null,
    };
  }

  returnVault1 = (data) => {
    this.setState({
      Vault1: data
    })
  }

  returnSongs = (data) => {
    this.setState({
      Songs: data
    })
  }


  render() {
    return (
      <Card>
        <CardContent>
          <h1>Wade</h1>

          <Music
            returnVault1={this.returnVault1}
            Vault1={this.state.Vault1}
            returnSongs={this.returnSongs}
            Songs={this.state.Songs}
          />
        </CardContent>
      </Card>
    );
  }
}
