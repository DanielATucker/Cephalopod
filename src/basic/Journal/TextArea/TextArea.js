import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
// ES modules
import { io } from "socket.io-client";


export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "No Value",
    };

    this.socket = io("wss://home.tail5cd89.ts.net:5001", {
      withCredentials: true
    })

    this.socket.on("connect", () => {
      this.socket.emit("TextArea_Connection");
    });

    this.socket.on("TextArea_DailyEntry", (data) => {

      let entry = data.entry;
      let date = data.date

      console.log((`Entry: ${JSON.stringify(entry, null, 2)}`))
      console.log(`Data: ${data}`)
      console.log(`Date: ${date}`)

      this.setState({ code: entry })
    });

    this.socket.on("TextArea_dailyEntryUpdate", (entry) => {
      this.setState({ code: entry });
    })

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.code !== this.state.code) {
      this.props.updateDailyEntry(this.state.code, this.socket);
    }
  }

  render() {
    return (
      <Card variant="outlined">
        <CardContent>
          <h1>Entry:</h1>

          <Editor
            value={this.state.code}
            onValueChange={code => {
              this.setState({ code })
              this.props.updateDailyEntry(code);
            }}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </CardContent>
      </Card>
    );
  }
}
