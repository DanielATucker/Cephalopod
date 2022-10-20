import React, { useEffect, useState } from "react";
import { ScrollView } from 'react';

import Card from '@mui/material/Card';


export default class Terminal extends React.Component{
    constructor(props) {
        super(props);
        
        let socketHandler = props;

        let messages = socketHandler.messages;

        this.state = {
            "messages": {
                messages
            }
        };

        let sendMessage = SocketHandler.sendMessage();
        
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