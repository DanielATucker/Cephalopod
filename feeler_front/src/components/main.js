import React, { useEffect, useState} from "react";

import Card from '@mui/material/Card';

import Terminal from "./Terminal.js";
import SocketHandler from "./SocketHandler.js";

export default class Main extends React.Component {
    constructor() {
        super();

        let SocketHandler = new SocketHandler();

        this.state = {
            "username": "No user logged in",
            "socketHandler": SocketHandler,
        };

        let [messages, setMessages] = useState({});

        setMessages(this.state.socketHandler.state.data.messages)

        this.setState({
            "Terminal": new Terminal(messages), 
        })
    };
    
    render() {
        return (
            <>
            <Card variant="outlined">
                <head>
                    <title> Cephalopod </title>
                </head>
                
                <body>
                    <h1> Welcome to Cephalopod </h1>
                    
                    <p> Your username is </p>
                    <p> {this.state.username} </p>
                </body>
            </Card>
            
            {this.state.Terminal.state.TerminalState}
            </>
        );
    };
};