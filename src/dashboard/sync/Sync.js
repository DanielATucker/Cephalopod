import React, { Component, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";

import FolderTree, { testData } from "react-folder-tree";
import "react-folder-tree/dist/style.css";
import styles from "./treeBrowser.module.css";

var encoding = require("encoding");

export class Sync extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeStat: {
                name: "root",
                isOpen: true, // this folder is opened, we can see it's children
                children: [
                    { name: "child 1" },
                    {
                        name: "child 2",
                        checked: 0.5,
                        isOpen: false,
                        children: [{ name: "child 2-1 " }, { name: "child 2-2 " }],
                    },
                ],
            },
        };
    };

    onTreeStateChange(state, event) {
        console.log(state, event);
    };

    SyncChange(fileList) {
        fileList =  encoding.convert(new Blob(fileList, {type: 'text/plain'}), "base64");
    

        console.log(`Changes: ${fileList}`);

        fetch(`https://${process.env.Wade_host}:${process.env.Wade_port}/syncIn`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'credentials': "include"
            },
            body: JSON.stringify({
                "data": fileList
            })
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Sync</h4>

                            <div className="row">
                                <div className="col grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5> Upload New File</h5>

                                            <div>
                                                <div className="row">
                                                    <div className="col-md grid-margin stretch-card">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className={styles.tree}>
                                                                    <Dropzone
                                                                        onDrop={
                                                                            (acceptedFiles) => {
                                                                                let fileList = [];
                                                                                
                                                                                acceptedFiles.forEach((file) => {
                                                                                    const reader = new FileReader()

                                                                                    reader.onabort = () => console.log('file reading was aborted')
                                                                                    reader.onerror = () => console.log('file reading has failed')
                                                                                    reader.onload = () => {
                                                                                        // Do whatever you want with the file contents
                                                                                        const binaryStr = reader.result                                                                                        
                                                                                        fileList.push(binaryStr)
                                                                                    }
                                                                                    
                                                                                    reader.readAsArrayBuffer(file);
                                                                                });

                                                                                this.SyncChange(fileList);
                                                                            }

                                                                        }

                                                                    >
                                                                        {({ getRootProps, getInputProps }) => (
                                                                            <section>
                                                                                <div {...getRootProps()}>
                                                                                    <input {...getInputProps()} />

                                                                                    <p>
                                                                                        [Drag 'n' drop some files] <br />
                                                                                    </p>

                                                                                    <p>
                                                                                        [Click Here To Add Files]
                                                                                    </p>
                                                                                </div>
                                                                            </section>
                                                                        )}
                                                                    </Dropzone>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5> Files</h5>
                                            <FolderTree
                                                data={this.state.treeStat}
                                                onChange={this.onTreeStateChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Sync;
