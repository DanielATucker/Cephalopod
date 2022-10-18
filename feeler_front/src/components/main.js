import React, { Component } from "react";

import Card from '@mui/material/Card';


class Main extends Component{
    constructor(props) {
        super(props);

        this.username = "No user logged in"

        this.username = this.get_username();
    };

    async get_username(){
        const response = fetch('http://100.69.19.3:3001/get_username');
        const username = response.json();
    
        return username;
    };

    render() {
        return (
            <Card variant="outlined">
                <head>
                    <title>Cephalopod</title>
                </head>
                
                <body>
                <h1>Welcome to Cephalopod</h1>

                <p> Your username is {this.username}</p>
                </body>
            </Card>
        );
    }; 
};

export default Main;