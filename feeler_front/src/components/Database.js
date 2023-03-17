import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";

const GUN = require('gun');


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
        let gun = GUN();

        let alice = gun.get('alice');
    
        alice.on(function(node){
          console.log('Subscribed to Alice!', node);
        });
    };


    render() {
        return (
            <>
            
            <h1> Test</h1>


            
            </>
        );
    };
};
