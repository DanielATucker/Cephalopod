import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";

import Button from '@mui/material/Button';

const GUN = require('gun');


export default class Database extends React.Component {
    constructor(props) {
        super(props)

        if (!window.gunDb) {
            // You should use your own relay peers here
            console.log("> Gun constructor!");
            window.gunDb = new GUN("localhost:8765");
        };
    };
    
    componentDidMount() {
        setTimeout(this.startDatabase(), 2000);
    };

    startDatabase() {
        let alice = window.gunDb.get('alice');
    
        alice.on(function(node){
          console.log('Subscribed to Alice!', node);
        });
    };

    alice() {
        let alice = window.gunDb.get('alice');
    
        alice.on(function(node){
          console.log('Subscribed to Alice!', node);
        });
        
        window.gunDb.get('alice').put({name: 'alice', age: 22});

        console.log(`Clicked`);
    };
    render() {
        return (
            <>
            
            <h1> Test</h1>

            <Button
            onClick={this.alice}
            >
                Click me
            </Button>
            
            </>
        );
    };
};
