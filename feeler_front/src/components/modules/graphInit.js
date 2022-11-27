import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";
import { Button } from '@mui/material';


export default class GraphInit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "doesSystemExist": "Pending",
            "initButton": false,
            "recommendInit": false
        };

        this.doesExist = this.doesExist.bind(this);
    };
    
    async doesExist(){
        const response = await fetch('http://100.69.19.3:3001/system/doesExist');
        let systemStatus = await response.json();

        if ((systemStatus.doesExist == false) && (this.state.initButton == false)) {
            this.setState({
                "initButton": true
            });
        }
        else if (systemStatus.doesExist == true) {
            this.setState({
                "doesSystemExist": systemStatus.doesExist,
            });
        };
    };

    async initSystem() {
        try {
            const response = await fetch('http://100.69.19.3:3001/system/systeminit');
            
            response.next((node) => {
                if (node.status == "success") {
                    this.setState({
                        "initButton": false
                    });
                };
            });
        }
        catch (err) {
            console.log(err);
        }
    };

    componentDidMount() {
        this.doesExist();

        setInterval(() => {
            this.doesExist();
        }, 10000);
    };

    componentDidUpdate(prevState) {
        if (prevState.initButton !== this.state.initButton) {
            if (this.state.initButton == true){
                this.setState({
                    "initButton": <Button 
                    variant="outlined"
                    onClick={this.initSystem}>    
                    Init System
                    </Button>
                });
            };
        };
    };

    render() {
        return (
            <>           
            
            <Card>
                <p> Does Exist: {this.state.doesSystemExist} </p>
                
                {this.state.initButton}
            </Card>

            </>
        );
    };
};