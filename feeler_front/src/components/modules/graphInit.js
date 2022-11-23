import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";


export class GraphInit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "doesSystemExist": true
        };
    };
    
    async doesExist(){
        const response = await fetch('http://100.69.19.3:3001/doesExist');
        let doesSystemExist = await response.json();

        this.setState({
            "doesSystemExist": doesSystemExist
        });
    };

    componentDidMount() {
        this.doesExist();
    };

    render() {
        return (
            <>           
            <p> ${this.state.doesSystemExist}</p>
            </>
        );
    };
};
