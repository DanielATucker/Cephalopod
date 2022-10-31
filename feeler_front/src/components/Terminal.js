import React, { useEffect, useState } from "react";
import { ScrollView } from 'react';

import Card from '@mui/material/Card';

import SocketHandler from "./SocketHandler";

export default class Terminal extends React.Component{
    constructor(props) {
        super(props);

        //let messages = props.messages;
        
        //let socketHandler = props.socketHandler;

        this.state = {
            "messages": {
                "test": "Test"
            }
        };

        //let sendMessage = socketHandler.sendMessage();
    };

    render() {
        return (
            <>
            <Card variant="outlined">
                <p> Terminal</p>
                            
                <Card>
                    <body>
                        <ScrollView>
                            {this.state.messages}
                        </ScrollView>
                    </body>
                </Card>
    
                <Card>
                    <input></input>
                    <button > Send </button>
                </Card>
            </Card> 
            </>
        );
    }
};