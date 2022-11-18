import React, { useEffect, useState} from "react";

import Card from '@mui/material/Card';

import Terminal from "./Terminal.js";
import SocketHandler from "./SocketHandler.js";
import Stats from "./stats.js";

export default class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            "username": "No user logged in",
            "messages": [],
            "stats": []
        };        
    };

    handleMessageChange = (messagesIn) => {        
        this.setState({
            "messages": messagesIn
        })

        console.log(this.state.messages);
    };

    handleStatsChange = (statsIn) => {
        this.setState({
            "stats": this.state.stats.concat(statsIn)
        });

        console.log(this.state.stats);
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

            <Stats stats={this.state.stats}>
            </Stats>
            
            <Terminal
            messages={this.state.messages}>
            </Terminal>
            
            <SocketHandler handleMessageChange={this.handleMessageChange} handleStatsChange = {this.handleStatsChange}>
            </SocketHandler>

            </>
        );
    };
};