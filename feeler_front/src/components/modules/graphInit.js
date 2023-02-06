import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";
import { Button } from '@mui/material';


export default class GraphInit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "test": 1,
            "doesSystemExist": "Pending",
            "doesUserExist": "Pending",
            "initButton": false,
            "username": "Pending",
            "usernameInput": "",
            "passwordInput": "",
            "password2Input": "",
            "usernameInitFormStatus": false,
            "loginFormStatus": false
        };

        this.doesExist = this.doesExist.bind(this);
        this.doesUserExist = this.doesUserExist.bind(this);
        this.get_username = this.get_username.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleInitUserFormSubmit = this.handleInitUserFormSubmit.bind(this);
        this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
    };

    async get_username(){
        let userResponse = await fetch('https://100.108.10.15:3001/system/getUsername', {
            method: 'GET',
            credentials: "include"
        });
        
        let user = await userResponse.json();

        this.setState({
            "username": user.username
        });
    };

    async doesExist(){
        const response = await fetch('https://100.108.10.15:3001/system/doesExist', {
            method: 'GET',
        });

        let systemStatus = await response.json();

        this.setState({
            "doesSystemExist": systemStatus.doesExist,
        });

        if ((systemStatus.doesExist === "System found.") && (this.state.doesUserExist === "No user found")) {
            this.setState({
                "initButton": false,
                "usernameInitFormStatus": true
            });
        }
        else if (systemStatus.doesExist ===  "No system found. Recommended, Init System") {
            this.setState({
                "initButton": true
            })
        };       
    };

    async doesUserExist() {
        let userResponse = await fetch('https://100.108.10.15:3001/system/doesUserExist', {
            method: 'GET',
        });
        
        let userSystemStatus = await userResponse.json();

        this.setState({
            "doesUserExist": userSystemStatus.doesExist,
        });

        if (userSystemStatus.doesExist === "No system found.") {
            this.setState({
                "usernameInitFormStatus": true
            });
        };
        
        if (this.state.doesUserExist === "User found") {
            this.setState({
                "usernameInitFormStatus": false,
                "loginFormStatus": true
            });
        };
        
    };

    async initSystem() {
        try {
            const response = await fetch('https://100.108.10.15:3001/system/systeminit', {
                method: 'GET',
            });

            response.then((node) => {
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

    handlePasswordChange(event) {
        this.setState({
            "passwordInput": event.target.value
        });
    };

    handlePassword2Change(event) {
        this.setState({
            "password2Input": event.target.value
        });
    };

    handleInitUserFormSubmit(event) {
        event.preventDefault();
        
        if (this.state.passwordInput === this.state.password2Input) {
            console.log("Passwords are good");

            fetch('https://100.108.10.15:3001/system/newUser', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": this.state.usernameInput,
                    "password": this.state.passwordInput
                }),
            });
        }
        else {
            console.log("Passwords Didn't match, Try again");
        }
    };

    handleLoginFormSubmit(event) {
        event.preventDefault();

        fetch('https://100.108.10.15:3001/system/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
                "username": this.state.usernameInput,
                "password": this.state.passwordInput
            }),
            credentials: "include"
        })
    };

    componentDidMount() {
        this.doesExist();

        this.doesUserExist();

        this.get_username();

        setInterval(this.doesExist, 10000);

        setInterval(this.doesUserExist, 10000);

        setInterval(this.get_username, 10000);


        this.setState({
            "test": 2 
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state !== prevState) {
            
            if ((this.state.doesUserExist !== prevState.doesUserExist) && (this.state.doesUserExist === "No user found") && (this.state.doesExist === "System found.")) {
                this.setState({
                    "usernameInitFormStatus": true
                });
                console.log(1);
            };
    
            if ((this.state.username !== prevState.username) && (this.state.username !== "Pending")) {
                this.props.handleLogin(true);
            };
        };
    };
    
    render() {
        return (
            <>           
            
            <Card>
                <p> Does Exist: {this.state.doesSystemExist} </p>

                <p> Does User Exist: {this.state.doesUserExist} </p>

                <p>{this.state.initButton &&

                    <Button 
                    variant="outlined"
                    onClick={this.initSystem}>    
                    Init System
                    </Button>
                } </p>

                <p> Your username is: {this.state.username} </p>

                {this.state.usernameInitFormStatus && 
                <form onSubmit={this.handleInitUserFormSubmit}>
                    <label>

                    <p> New username </p>

                    <input
                    name="username"
                    value={this.state.usernameInput} 
                    onChange={this.handleUsernameChange} />
                    
                    <p> New password </p>

                    <input
                    name="password"
                    type="password" 
                    autocomplete="current-password"
                    value={this.state.passwordInput}
                    onChange={this.handlePasswordChange} />
                    
                    <p> Confirm new password </p>

                    <input
                    name="password2" 
                    type="password"
                    autocomplete="current-password"
                    value={this.state.password2Input}
                    onChange={this.handlePassword2Change} />
                    
                    </label>
                    <br></br>
                    
                    <input type="submit" value="Submit" />
                </form>
                }

                {this.state.loginFormStatus &&
                    <form onSubmit={this.handleLoginFormSubmit}>
                    <label>

                    <h3> Login </h3>

                    <p>username </p>

                    <input
                    name="usernameLogin"
                    value={this.state.usernameInput} 
                    onChange={this.handleUsernameChange} />
                    
                    <p> password </p>

                    <input
                    name="passwordLogin"
                    type="password" 
                    value={this.state.passwordInput}
                    onChange={this.handlePasswordChange} />

                    </label>
                    <br></br>
                    
                    <input type="submit" value="Log-in" />
                </form>

                }
            </Card>

            </>
        );
    };
};
