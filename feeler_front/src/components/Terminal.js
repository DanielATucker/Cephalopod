import React from "react";
import { ScrollView } from 'react';

import Card from '@mui/material/Card';

export default class Terminal extends React.Component{
    constructor() {
        super();

        this.state = {};

        this.state.TerminalState = (
            <>
            <Card variant="outlined">
                <p> Terminal</p>
                            
                <Card>
                    <body>
                        {ScrollView}
                    </body>
                </Card>
    
                <Card>
                    <input></input>
                    <button> Send </button>
                </Card>
            </Card> 
            </>
        );
    };
};