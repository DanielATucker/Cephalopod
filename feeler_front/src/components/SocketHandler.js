import React, { useEffect, useState, } from "react";

import io from "socket.io";


export default class SocketHandler extends React.Component{
    constructor() {
        super();

        this.state = {
            "data": {
                "messages": {}
            }
        };

        this.setState(
            {
                socket: io.connect("http://100.69.19.3:3000")
            }
        );
        
        useEffect(() => {
            this.socket.on("Private_message", (message) => {
                
                this.state.data.messages["message"] = message;
            });
        }, [this.state.socket]);
    };

    sendMessage = (message) => {
        this.state.socket.emit("username", { message });
    };
};