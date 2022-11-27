import React, { useEffect, useState} from "react";

import Card from '@mui/material/Card';

import Terminal from "./terminal";
import SocketHandler from "./socketHandler";
import Stats from "./stats";
import Journal from "./journal"
import System from "./system"


export default class Main extends React.Component {
    constructor() {
        super();

        this.state = {
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
            "stats": statsIn
        });
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
                </body>
            </Card>

            <System>
            </System>

            <Stats stats={this.state.stats}>
            </Stats>
            
            <Journal>
            </Journal>

            <Terminal
            messages={this.state.messages}>
            </Terminal>
            
            <SocketHandler handleMessageChange={this.handleMessageChange} handleStatsChange = {this.handleStatsChange}>
            </SocketHandler>

            </>
        );
    };
};
