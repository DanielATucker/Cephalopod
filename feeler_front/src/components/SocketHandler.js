import React, { useEffect, useState } from "react";

import { Manager } from "socket.io-client";


export default class SocketHandler extends React.Component{
    constructor(props) {
        super(props);

        let [messages, setMessages] = this.setState([]);

        /*
        this.state = {
            "messages": ["Test", "Test2"]
        };
        */
    
        this.props.handleMessageChange(this.state.messages);
                
        try {

            const manager = new Manager("http://100.69.19.3:3000");

            const socket = manager.socket("/");

            console.log(socket);
            
            /*
            this.setState({
                "messages": this.state.messages.push("Test3")
            });
            */

            socket.on("connect", () => {

                console.log(this.state.messages)
                
                let messageOut = this.state.messages;

                messageOut.push("Connected")

                console.log(messageOut);

                this.setState({
                    "messages": messageOut
                });
                
                console.log("Connected!");
            });

            /*
            useEffect(() => {
                this.socket.on("Private_message", (message) => {
                    
                    
                    //this.state.data.messages["message"] = message;
                });
            }, [this.state.socket]);
            */
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