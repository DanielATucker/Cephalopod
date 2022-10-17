import React, { Component } from "react";
import { Card } from '@mui/material';


class Main extends Component{

    constructor(props) {
        super(props);

        this.state = {
            name: "React"
        };
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
                </body>

                </div>
            </Card>
        );
    } 
}

export default Main;