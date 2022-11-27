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
            "passwordInput": "",
            "password2Input": "",
            "usernameFormStatus": false,
            "usernameForm": false
        };

        this.doesExist = this.doesExist.bind(this);
        this.get_username = this.get_username.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
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

    handlepasswordChange(event) {
        this.setState({
            "passwordInput": event.target.value
        });
    };

    handlepassword2Change(event) {
        this.setState({
            "password2Input": event.target.value
        });
    };

    handleFormSubmit(event) {
        event.preventDefault();
        
        console.log(this.state.usernameInput);
        console.log(this.state.passwordInput);
        console.log(this.state.password2Input);
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

                <p> Your username is: {this.state.username} </p>

                {this.state.usernameFormStatus && 
                
                <>

                <p> New username? </p>

                <form onSubmit={this.handleFormSubmit}>
                    <label>

                    <textarea 
                    name="username"
                    value={this.state.usernameInput} 
                    onChange={this.handleUsernameChange} />
                    
                    <textarea
                    name="password"
                    type="password" 
                    value={this.state.passwordInput}
                    onChange={this.handlePasswordChange} />
                    
                    <textarea
                    name="password2" 
                    type="password"
                    value={this.state.password2Input}
                    onchange={this.handlePassword2Change} />
                    
                    </label>
                    <br></br>
                    
                    <input type="submit" value="Submit" />
                </form>

                </>
                }
            </Card>

            </>
        );
    };
};