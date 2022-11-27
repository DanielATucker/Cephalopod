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
            "username": "No user logged in",
            "usernameInput": "",
            "usernameFormStatus": false,
            "usernameForm": false
        };

        this.doesExist = this.doesExist.bind(this);
        this.get_username = this.get_username.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
    };

    async get_username(){
        const response = await fetch('http://100.69.19.3:3001/get_username');
        let username = await response.json();

        username = username.USERNAME;

        this.setState({
            "username": username
        });

        if (username === "No User Found in database") {
            this.setState({
                "usernameFormStatus": true
            })
        };
    };

    async doesExist(){
        const response = await fetch('http://100.69.19.3:3001/system/doesExist');
        let systemStatus = await response.json();

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
                "initButtonStatus": <Button 
                variant="outlined"
                onClick={this.initSystem}>    
                Init System
                </Button> 
            })
        };
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
    
    handleUsernameChange(event) {
        this.setState({
            "usernameInput": event.target.value
        });
    };

    handleUsernameSubmit(event) {
        event.preventDefault();

        console.log(event)
        
        console.log(this.state.usernameInput);
    };

    componentDidMount() {
        this.doesExist();

        this.get_username();
       
        setInterval(this.get_username, 10000);

        setInterval(this.doesExist, 10000);
    };

    render() {
        return (
            <>           
            
            <Card>
                <p> Does Exist: {this.state.doesSystemExist} </p>
                <p>{this.state.initButton} </p>

                <p> Your username is </p>
                <p> {this.state.username} </p>

                {this.state.usernameFormStatus && 
                
                <form onSubmit={this.handleUsernameSubmit}>
                    <label>
                    Enter Username 
                    <textarea 
                    value={this.state.usernameInput} 
                    onChange={this.handleUsernameChange} />
                    </label>
            
                    <input type="submit" value="Submit" />
                </form>}
            </Card>

            </>
        );
    };
};