import React, { useEffect, useState} from "react";

import Card from '@mui/material/Card';

import Terminal from "./Terminal.js";
import SocketHandler from "./SocketHandler.js";

export default class Main extends React.Component {
    constructor() {
        super();

        this.state = {};
        
        //setTerminal(Terminal)

        /*
        let [socketHandler, setSocketHandler] = useState({});
        
        let [messages, setMessages] = useState({});    
        
        
        setSocketHandler(new SocketHandler());
        
        setMessages(this.state.socketHandler.state.data.messages)  
        
        setTerminal(new Terminal(messages, socketHandler));
        */
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
            
            <Terminal> </Terminal>
            </>
        );
    };
};