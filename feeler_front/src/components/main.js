import React from "react";

import Card from '@mui/material/Card';

import Terminal from "./Terminal.js";
import SocketHandler from "./SocketHandler1.js";

export default class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            "username": "No user logged in",
            "Terminal": new Terminal()
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
            
            {this.state.Terminal.state.TerminalState}
            </>
        );
        
    };
};