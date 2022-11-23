import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";


export default class System extends React.Component {
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
    };

    render() {
        return (
            <>
            
            <h1> Test</h1>
            
            </>
        );
    };
};