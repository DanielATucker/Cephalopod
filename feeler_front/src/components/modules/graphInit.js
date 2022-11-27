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
        };

        this.doesExist = this.doesExist.bind(this);
    };
    
    async doesExist(){
        const response = await fetch('http://100.69.19.3:3001/system/doesExist');
        let systemStatus = await response.json();

        console.log(systemStatus);
        
        this.setState({
            "doesSystemExist": systemStatus.doesExist,
        });

        if (systemStatus.doesExist === "System found.") {
            this.setState({
                "initButton": false
            });
        }
        else if (systemStatus.doesExist ===  "No system found. Recommended, Init System") {
            this.setState({
                "inintButton": <Button 
                variant="outlined"
                onClick={this.initSystem}>    
                Init System
                </Button> 
            })
        };
    
        if (this.state) {
            console.log(this.state.initButton);
        }
    };

    async initSystem() {
        try {
            const response = await fetch('http://100.69.19.3:3001/system/systeminit');

            response.next((node) => {
                console.log(node);

                if (node.status === "success") {
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