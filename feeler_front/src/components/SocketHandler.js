import React, { useEffect, useState } from "react";
import { Socket } from "socket.io";

import uuid from 'react-uuid';


import { Manager } from "socket.io-client";


export default class SocketHandler extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
            "messages": [
                {
                    "Message": {
                        "body": "Test",
                        "datetime": new Date(),
                        "uuid": uuid()
                    },
                    
                    "Message": {
                        "body": "Test2",
                        "datetime": new Date(),
                        "uuid": uuid()
                    },
                }
            ]
        };
        
    
        this.props.handleMessageChange(this.state.messages);


        const manager = new Manager("http://100.69.19.3:3000");

        let socket = manager.socket("/");
        
        /*
        this.setState({
            "socket": socket
        });
        */

        socket.on("connect", () => {
            this.props.handleMessageChange(this.state.messages.concat("Connected"));

            console.log("Connected!")
        });

        socket.on("Private_message", (privateMessage) => {
            this.props.handleMessageChange(privateMessage);
        });

        socket.on("message", (message) => {
            this.props.handleMessageChange(message);
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