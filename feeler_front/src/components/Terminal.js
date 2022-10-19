import React from "react";
import { useEffect, useState } from "react";
import { ScrollView } from 'react';

import Card from '@mui/material/Card';

export default class Terminal extends React.Component{
    constructor() {
        super();
        let Terminal = Terminal;
      };

    render() {
        
        return (
            <>
            <Card variant="outlined">
                
                <p> Terminal</p>
                            
                <Card>
                    <body>
                        <ScrollView></ScrollView> 
                    </body>
                </Card>

                <Card>
                    <input></input>
                </Card>
            </Card> 
            
            </>
        );
    };

};