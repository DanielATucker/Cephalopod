import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";

import GUN from "gun";


export default class Database extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "test": 1
        };
    };
    
    componentDidMount() {
        this.setState({
            "test": 2
        });

        this.startDatabase();
    };

    startDatabase() {
        var ws = new WebSocket('wss://100.108.10.15:3006');
        
        ws.onopen = function(o) { 
            console.log('open', o)
        };

        ws.onclose = function(c) { 
            console.log('close', c)
        };

        ws.onmessage = function(m) {
            console.log('message', m.data)
        };

        ws.onerror = function(e) {console.log('error', e)};
    };


    render() {
        return (
            <>
            
            <h1> Test</h1>


            
            </>
        );
    };
};
