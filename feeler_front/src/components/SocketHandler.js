import React, { useEffect, useState } from "react";
import { Socket } from "socket.io";

import { Manager } from "socket.io-client";


export default class SocketHandler extends React.Component{
    constructor(props) {
        super(props);

        
        this.state = {
            "messages": ["Test", "Test2"]
        };
        
    
        this.props.handleMessageChange(this.state.messages);

        
        const manager = new Manager("http://100.69.19.3:3000");

        const socket = manager.socket("/");

        this.setState({
            "socket": socket
        });

        this.state.socket.on("connect", () => {                
            this.setState({
                "messages": this.state.messages.push("Connected")
            });

            console.log(this.state.socket);
        });

        this.state.socket.on("Private_message", (message) => {
            this.setState({
                "messages": this.state.messages.push(message)
            });                
        });

        this.state.socket.on("message", (message) => {
            this.setState({
                "messages": this.state.messages.push(message)
            });                
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