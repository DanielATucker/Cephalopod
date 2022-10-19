import React from "react";

import Card from '@mui/material/Card';

import Terminal from "./Terminal.js";

export default class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            "username": "No user logged in",
            "Terminal": new Terminal()
        };
        
        this.StateArray = [
            this.state.Terminal
        ]

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
            {this.StateArray}
            </>
        );
    };
};