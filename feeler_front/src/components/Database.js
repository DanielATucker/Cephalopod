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
        const gun = GUN();

        console.log(`GUN: ${JSON.stringify(gun, null, 2)}`);
    };


    render() {
        return (
            <>
            
            <h1> Test</h1>


            
            </>
        );
    };
};
