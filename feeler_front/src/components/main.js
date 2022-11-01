import React, { useEffect, useState} from "react";

import Card from '@mui/material/Card';

import Terminal from "./Terminal.js";
import SocketHandler from "./SocketHandler.js";

export default class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            "username": "No user logged in",
            "messages": {}
        };

        function handleMessageChange(messages) {
            this.setState({
                "messages": messages
            })
        };

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
            
            <SocketHandler
            handleMessageChange={this.handleMessageChanged}
            > 
            
            </SocketHandler>

            <Terminal
            messages={this.state.messages}
            > 

            </Terminal>
            </>
        );
    };
};