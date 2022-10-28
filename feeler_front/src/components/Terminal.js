import React, { useEffect, useState } from "react";
import { ScrollView } from 'react';

import Card from '@mui/material/Card';

import SocketHandler from "./SocketHandler";

export default class Terminal extends React.Component{
    constructor(props) {
        super(props);

        let messages = props.messages;

        this.state = {
            "messages": {
                messages
            }
        };

        //let sendMessage = socketHandler.sendMessage();
        let sendMessage = null;
        
        this.state.TerminalState = (
            <>
            <Card variant="outlined">
                <p> Terminal</p>
                            
                <Card>
                    <body>
                        <ScrollView>
                            
                        </ScrollView>
                    </body>
                </Card>
    
                <Card>
                    <input></input>
                    <button onClick={sendMessage}> Send </button>
                </Card>
            </Card> 
            </>
        );
    };
};