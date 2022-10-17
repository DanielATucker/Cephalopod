import React, { Component } from "react";
import Card from '@mui/material';


class Main extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: "React"
        };

        this.username = this.get_username();
    };

    async get_username(){
        const response = await fetch('http://localhost:3001/get_username');
        const username = await response.json();
      
        return username;
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