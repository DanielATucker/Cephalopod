import React, { useEffect, useState } from "react";
import { ScrollView } from 'react';

import Card from '@mui/material/Card';

import SocketHandler from "./SocketHandler";

export default class Terminal extends React.Component{

    render() {
        return (
            <>
            <Card variant="outlined">
                <p> Terminal</p>
                            
                <Card>
                    <body>
                        <ScrollView>
                            hi
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