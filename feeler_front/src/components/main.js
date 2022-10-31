import React, { useEffect, useState} from "react";

import Card from '@mui/material/Card';

import Terminal from "./Terminal.js";
import SocketHandler from "./SocketHandler.js";

export default class Main extends React.Component {
    constructor() {
        super();

        this.setState({
            "username": "No user logged in",
            "socketHandler": {}
        });


        let [messages, setMessages] = useState({});
        
        let [socketHandler, setSocketHandler] = useState({});


        setMessages(this.state.socketHandler.state.data.messages)

        setSocketHandler(new SocketHandler);


        this.setState({
            "Terminal": new Terminal(messages, socketHandler), 
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