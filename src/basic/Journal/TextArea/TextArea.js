import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
// ES modules
import { io } from "socket.io-client";
import strftime from "strftime";


export default class TextArea extends Component {
  constructor(props) {
    super(props);

    this.socket = io(`https://${process.env.host}`, {
      withCredentials: true
    })

    this.socket.on("connect", () => {
      this.socket.emit("TextArea_Connection", strftime("%y%m%d", this.props.day));
    });

    this.socket.on("TextArea_Entry", (entry) => {
      this.props.updateEntry(entry, this.socket);
    })

  }

  componentDidMount() {
    this.socket.emit("TextArea_Connection", strftime("%y%m%d", this.props.day));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.day !== this.props.day) {
      this.socket.emit("TextArea_Connection", strftime("%y%m%d", this.props.day));
    }
  }


  render() {
    return (
      <Card variant="outlined">
        <CardContent>
          <h1>Entry:</h1>

          <Editor
            value={this.props.entry}
            onValueChange={(newEntry) => {
              this.props.updateEntry(newEntry, this.socket);
            }}
            highlight={newEntry => highlight(newEntry, languages.js)}
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
