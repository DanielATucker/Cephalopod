import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";


export default class GraphInit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "doesSystemExist": "Pending"
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

    componentDidUpdate() {
        setTimeout(this.doesExist, 10000);
    }

    render() {
        return (
            <>           
            <p> Does Exist: {JSON.stringify(this.state.doesSystemExist)} </p>
            </>
        );
    };
};
