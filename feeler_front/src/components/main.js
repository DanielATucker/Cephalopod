import React, { useEffect, useState} from "react";

import Card from '@mui/material/Card';

import Terminal from "./Terminal.js";
import SocketHandler from "./SocketHandler.js";
import Stats from "./stats.js";
import Journal from "./Journal.js"
export default class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            "username": "No user logged in",
            "messages": [],
            "stats": []
        };  
    };

    componentDidMount(){
        this.get_username();
    }

    componentDidUpdate(){
        this.get_username();
    }
    
    async get_username(){
        const response = await fetch('http://100.69.19.3:3001/get_username');
        let username = await response.json();

        username = username.USERNAME;

        this.setState({
            "username": username
        });
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
                    
                    <p> Your username is </p>
                    <p> {this.state.username} </p>
                </body>
            </Card>

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
