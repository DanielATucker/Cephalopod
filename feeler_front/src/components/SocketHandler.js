import React, { useEffect, useState } from "react";

import { v4 as uuidv4 } from 'uuid';


import { Manager } from "socket.io-client";
import { formControlLabelClasses } from "@mui/material";


export default class SocketHandler extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            "messages": [
                {
                    "Message": {
                        "body": "Test",
                        "datetime": new Date(),
                        "uuid": uuidv4()
                    }
                },
                {
                    "Message": {
                        "body": "Test2",
                        "datetime": new Date(),
                        "uuid": uuidv4()
                    }
                }
            ]
        };
    };

    componentDidMount() {
        let manager = new Manager("http://100.69.19.3:3000");
        const socket = manager.socket("/")        

        this.props.handleMessageChange(this.state.messages);

        socket.on("connect", () => {
            let messageOut = this.state.messages.concat("connected");

            this.props.handleMessageChange(messageOut);

            console.log("Connected!");
            socket.emit("username", "Daniel");

        });

        socket.on("Private_message", (privateMessage) => {
            this.props.handleMessageChange(this.state.messages.concat(privateMessage));
        });

        socket.on("message", (message) => {
            this.props.handleMessageChange(this.state.messages.concat(message));
        });

        socket.on("stats", (dataIn) => {            
            this.props.handleStatsChange(dataIn);
        });
           

    };

    render() {
        return(
            <>
            </>
        )
    };
};
