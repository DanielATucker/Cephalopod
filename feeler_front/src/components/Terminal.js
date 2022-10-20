import React, { useEffect, useState } from "react";
import { ScrollView } from 'react';

import Card from '@mui/material/Card';

import SocketHandler from "./SocketHandler.js";


export default class Terminal extends React.Component{
    constructor() {
        super();

        this.state = {
            "messages": SocketHandler.state.data.messages
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