import React, { Component, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";

import { Card, CardContent } from "@mui/material";
import axios from "axios";

var encoding = require("encoding");

export class Sync extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [
        ["a"],
        ["a", "b"],
        ["a", "b", "c"],
        ["a", "b", "d"],
        ["e"],
        ["e", "f"],
        ["e", "f", "g"],
      ],
    };
  }

  isFileOrFolder = (fileOrFolder) => {
    console.log(`FileOrFolder: ${JSON.stringify(fileOrFolder, null, 2)}`);

    let tree = {};
    fileOrFolder.forEach(function (item) {
      item.reduce(function (node, chr) {
        return node[chr] || (node[chr] = {});
      }, tree);
    });

    console.log(`Tree: ${JSON.stringify(tree, null, 2)}`);

    return (
      <>
        <Card variant="outlined">
          <CardContent>
            <p>{fileOrFolder.name}</p>

            <div
              style={{
                backgroundColor: "#FF0000",
              }}
            >
              <Dropzone
                onDrop={(acceptedFiles) => {
                  this.state.fileList = [];

                  
                  acceptedFiles.forEach((file) => {
                    const reader = new FileReader();
                    reader.readAsText(file);

                    reader.onabort = () =>
                      console.log("file reading was aborted");
                    reader.onerror = () =>
                      console.log("file reading has failed");
                    reader.onload = () => {
                      let data = {
                        fileName: file.path,
                        fileContents: reader.result,
                      };

                      this.state.fileList.push(data);

                      console.log(`FileList: ${JSON.stringify(this.state.fileList, null, 2)}`)
                    };
                  });

                  
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />

                      <p>
                        [Drag 'n' drop some files] <br />
                      </p>

                      <p>[Click Here To Add Files]</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  GetFiles = () => {
    return this.isFileOrFolder(this.state.files);
  };

  SyncChange = (fileList) => {
    console.log(`Changes: ${JSON.stringify(fileList)}`);

    axios.post(`https://${process.env.host}/sync_in/syncIn`, { fileList: fileList });
  };

  render() {
    return (
      <div className="row">
        <Card>
          <CardContent>
            <Card>
              <CardContent>
                <h5> Files</h5>
                {this.GetFiles()}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Sync;
