import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";
import ReactPlayer from 'react-player'
import axios from "axios";

export default class SundaySocial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SS: "",
      show_SS: "false"
    };
  }
  Get_SS = () => {
    axios
      .get(`https://${process.env.host}/SundaySocial/get_SS`)
      .then((result) => {
        console.log(`SS update: ${JSON.stringify(result, null, 2)}`);

        this.setState({
          SS: result.data,
          show_SS: true
        });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
  }

  componentDidMount() {
    this.Get_SS();
  }


  render() {
    return (
      <div class="row">
        <Card>
          <CardContent>
            <h1>Sunday Social</h1>

            <h3>Revolution Television</h3>

            {this.state.show_SS && (

              <iframe
                allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay"
                src={this.state.SS}
                style={{ height: 720, width: 576, border: 0 }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}
