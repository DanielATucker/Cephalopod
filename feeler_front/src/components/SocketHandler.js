import React, { useEffect, useState } from "react";

import { v4 as uuidv4 } from 'uuid';


import { Manager } from "socket.io-client";


export default class SocketHandler extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    };

    componentDidMount() {
        this.setState({
            "messages": {
                "Message": {
                    "body": "Test",
                    "datetime": new Date(),
                    "uuid": 1
                },
                
                "Message": {
                    "body": "Test2",
                    "datetime": new Date(),
                    "uuid": 2
                }
            },
        });

        let manager = new Manager("http://100.69.19.3:3000");

        console.log(manager);

        const socket = manager.socket("/")

        console.log(socket);

        this.props.handleMessageChange(this.state.messages);

        socket.on("connect", () => {
            let messageOut = this.state.messages.concat("Connected")
            
            console.log(messageOut);

            this.props.handleMessageChange(messageOut);

            console.log("Connected!")
        });

        socket.on("Private_message", (privateMessage) => {
            this.props.handleMessageChange(this.state.messages.concat(privateMessage));
        });

        socket.on("message", (message) => {
            this.props.handleMessageChange(this.state.messages.concat(message));
        });
           

    };

    /*
    sendMessage = (message) => {
        this.state.socket.emit("username", { message });
    };
    */

    render() {
        return(
            <>
            </>
        )
    };
};
