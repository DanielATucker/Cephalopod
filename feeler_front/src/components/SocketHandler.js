import React, { useEffect, useState } from "react";

import io from "socket.io";


export default class SocketHandler extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            "messages": "Test"
        };
    
        this.props.handleMessageChange(this.state.messages);
        this.props.handleMessageChange("Test2");
        
        /*
        setMessages("test")

        
        try {
            this.setState(
                {
                    socket: io("http://100.69.19.3:3000")
                }
            );
            
            useEffect(() => {
                this.socket.on("Private_message", (message) => {
                    this.state.data.messages["message"] = message;
                });
            }, [this.state.socket]);
        }
        catch(err) {
            console.log(err)
        }
        */
           
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