import React, { useEffect, useState } from "react";

import uuid from 'react-uuid';


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
                    "uuid": uuid()
                },
                
                "Message": {
                    "body": "Test2",
                    "datetime": new Date(),
                    "uuid": uuid()
                }
            },
        });

        let manager = new Manager("http://100.69.19.3:3000");

        console.log(manager);
        
        this.setState({"socket": manager.socket("/")})

        this.props.handleMessageChange(this.state.messages);

        console.log(this.state.socket);

        this.state.socket.on("connect", () => {
            let messageOut = this.state.messages.concat("Connected")
            
            console.log(messageOut);

            this.props.handleMessageChange(messageOut);

            console.log("Connected!")
        });

        this.state.socket.socket.on("Private_message", (privateMessage) => {
            this.props.handleMessageChange(this.state.messages.concat(privateMessage));
        });

        this.state.socket.on("message", (message) => {
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
