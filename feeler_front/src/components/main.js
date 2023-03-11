import React, { useEffect, useState} from "react";

import Card from '@mui/material/Card';

import Terminal from "./terminal";
import SocketHandler from "./socketHandler";
import Stats from "./stats";
import Journal from "./journal/journal";
import System from "./system";
import Calendar from "./calendar/calendar.js";


export default class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            "isLoggedIn": false,
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

    handleLogin = (data) =>{
        this.setState({
            "isLoggedIn": data
        });
    };

    render() {
        return (
            <>

            <Card variant="outlined">
                <title> Cephalopod </title>
                
                <h1> Welcome to Cephalopod </h1>
            </Card>

            <System handleLogin = {this.handleLogin}>
            </System>

            <Stats stats={this.state.stats}>
            </Stats>
            
            <Journal isLoggedIn = {this.state.isLoggedIn}>
            </Journal>

            <Calendar>
            </Calendar>

            <Terminal
            messages={this.state.messages}>
            </Terminal>
            
            <SocketHandler handleMessageChange={this.handleMessageChange} handleStatsChange = {this.handleStatsChange}>
            </SocketHandler>

            </>
        );
    };
};
