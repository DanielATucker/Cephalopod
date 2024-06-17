import React, { Component } from "react";

import { Button, Card, CardContent } from "@mui/material";
import ReactPlayer from 'react-player'

import SundaySocialChat from "./SundaySocialChat";
import { io } from "socket.io-client";



export default class SundaySocialAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTelevision: false,
      TelevisionURL: "",
      conversations: [],
      activeChat: null,
      showChat: true,
    };

    this.InitSocketIO = this.InitSocketIO.bind(this)
  };

  InitSocketIO = () => {

    this.socket = io(`https://${process.env.host}`, {
      withCredentials: true
    }, { resource: 'nodejs' });

    this.socket.on("Start_SS_VideoChatURL", (URL) => {
      console.log(`URK: ${URL}`)
      this.setState({ TelevisionURL: URL })
      this.setState({ showTelevision: true });
    });

  }

  StartBroadcast = () => {

    this.socket.emit("Start_SS_VideoChat");
  };

  componentDidMount() {
    this.InitSocketIO();
  }

  render() {
    return (
      <div class="row ">
        <Card>
          <CardContent>
            <h1>Sunday Social Admin</h1>

            <h3>Revolution Television</h3>

            <Button
              onClick={() => {
                this.StartBroadcast();
              }}
            >
              Start Broadcast
            </Button>

            <Card>
              <CardContent>
                <div class="table-responsive">

                  <h3>Weekly Meetings</h3>

                  <br />

                  <table class="table" border="1px">
                    <th>
                      Date
                    </th>

                    <th>
                      Chats
                    </th>

                    <th>
                      Files
                    </th>
                  </table>
                </div>

                <Card variant="outlined">
                  <CardContent>
                    <div class="row">
                      <div class="row">
                        Date Selected
                      </div>

                      <br />

                      <div class="row">
                        <SundaySocialChat />
                      </div>

                      <div class="row">
                        Files
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {this.state.showTelevision && (

              <iframe
                allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay"
                src={this.state.TelevisionURL}

                style={{ height: 720, width: 576, border: 0 }}
              ></iframe>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}
