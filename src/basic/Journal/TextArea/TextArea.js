import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

export default class TextArea extends Component {
  constructor(props) {
    super(props);

    this.state = {code: "test"};
  }

  render() {
    return (
      <>
        <h1>Entries:</h1>

        <Editor
                value={this.state.code}
                onValueChange={code => this.setState({ code })}
                highlight={code => highlight(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />

      </>
    );
  }
}
