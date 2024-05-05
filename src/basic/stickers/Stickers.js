import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

export default class Stickers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sticker: "",
    };
  }

  componentDidMount() {
    let stickerName = this.props.sticker.replace("-sticker", "");

    let finalSticker = stickerName.replace("_", " ");

    this.setState({ sticker: finalSticker });
  }

  render() {
    return (
      <Card>
        <CardContent>
          <h1>{this.state.sticker}</h1>

        </CardContent>
      </Card>
    );
  }
}
