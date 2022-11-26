import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";


export default class GraphInit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "doesSystemExist": "Pending",
            "isDatbaseOnline": "Pending"
        };
    };
    
    async doesExist(){
        const response = await fetch('http://100.69.19.3:3001/system/doesExist');
        let doesSystemExist = await response.json();

        this.setState({
            "doesSystemExist": doesSystemExist
        });
    };

    async isDatbaseOnline(){
        const response = await fetch('http://100.69.19.3:3001/system/isDatabaseOnline');
        let isDatabaseOnline = await response.json();

        this.setState({
            "doesSystemExist": isDatabaseOnline
        });
    };

    componentDidMount() {
        this.doesExist();
    };

    componentDidUpdate() {
        setTimeout(this.doesExist, 10000);

        setTimeout(this.isDatbaseOnline, 10000);
    }

    render() {
        return (
            <>           

            <p> Does Exist: {this.state.doesSystemExist.doesExist} </p>
            
            <p> Database: {this.state.doesSystemExist.isDatbaseOnline} </p>

            </>
        );
    };
};