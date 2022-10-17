import React, { Component } from "react";
import fetch from 'node-fetch';

import Card from '@mui/material/Card';


class Main extends Component{
    constructor(props) {
        super(props);

        this.username = "No user logged in"

        this.get_username();
    }

    async get_username(){
        const response = await fetch('localhost:3001/get_username');
        const username = await response.json();
      
        this.username = username;
    };

    render() {
        return (
            <Card variant="outlined">
                <div id = "Main">
                <head>
                    <title>Cephalopod</title>
                </head>
                
                <body>
                <h1>Welcome to Cephalopod</h1>

                <p> Your username is {this.username}</p>
                </body>

                </div>
            </Card>
        );
    }; 
};

export default Main;