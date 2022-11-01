import React, { useEffect, useState } from "react";

import io from "socket.io";


export default class SocketHandler extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            "messages": ["Test", "Test2"]
        };
    
        this.props.handleMessageChange(this.state.messages);
                
        try {

            let socket = io("http://100.69.19.3:3000");

            console.log(socket);
            
            useEffect(() => {
                this.socket.on("Private_message", (message) => {
                    this.setState({
                        "messages": this.state.messages.push(message)
                    })
                    
                    //this.state.data.messages["message"] = message;
                });
            }, [this.state.socket]);
        }
        catch(err) {
            console.log(err)
        }
        
           
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