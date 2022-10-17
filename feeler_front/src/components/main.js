import React, { Component } from "react";
import { Card } from '@mui/material';


class Main extends Component{

    constructor(props) {
        super(props);

        this.state = {
            name: "React"
        };

        async function get_username(){
            const response = await fetch('http://localhost:5000/get_usernamea');
            const username = await response.json();
      
            return username;
        };
      
        this.username = get_username();
    }
    
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
    } 
}

export default Main;