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
            "username": "Pending",
            "usernameInput": "",
            "passwordInput": "",
            "password2Input": "",
            "usernameInitFormStatus": false,
            "loginFormStatus": false
        };

        this.doesExist = this.doesExist.bind(this);
        this.get_username = this.get_username.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleInitUserFormSubmit = this.handleInitUserFormSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
    };

    async get_username(){

        let response = fetch('http://100.69.19.3:3001/get_username', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": this.state.usernameInput,
                "password": this.state.passwordInput
            })
        });

        response.next((node) => {
            console.log(JSON.stringify(node));
            
            let username = node.USERNAME;

            this.setState({
                "username": username
            });
    
            if ((this.state.loginFormStatus === false) && (this.state.initButton === false)) {
                this.setState({
                    "usernameInitFormStatus": true
                })
            };
        });

        
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
                "initButton": true
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

    async handleInitUserFormSubmit(event) {
        event.preventDefault();
        
        if (this.state.passwordInput === this.state.password2Input) {
            console.log("Passwords are good");

            fetch('http://100.69.19.3:3001/system/newUser', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": this.state.usernameInput,
                    "password": this.state.passwordInput
                })
            });
        }
        else {
            console.log("Passwords Didn't match, Try again");
        }
    };

    async handleLoginFormSubmit(event) {
        event.preventDefault();

        fetch('http://100.69.19.3:3001/system/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": this.state.usernameLogin,
                "password": this.state.usernamePassword
            })
        });
    };

    componentDidMount() {
        this.doesExist();

        setInterval(this.doesExist, 10000);
    };

    componentDidUpdate(prevState) {
        if ((this.state.usernameInput != prevState.usernameInput) && (this.state.passwordInput != prevState.passwordInput)) {
            this.get_username();
       
            setInterval(this.get_username, 10000);
        };
    }
    
    render() {
        return (
            <>           
            
            <Card>
                <p> Does Exist: {this.state.doesSystemExist} </p>
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
                    value={this.state.passwordInput}
                    onChange={this.handlePasswordChange} />
                    
                    <p> Confirm new password </p>

                    <input
                    name="password2" 
                    type="password"
                    value={this.state.password2Input}
                    onChange={this.handlePassword2Change} />
                    
                    </label>
                    <br></br>
                    
                    <input type="submit" value="Submit" />
                </form>
                }

                {this.state.loginFormStatus &&
                    <form onSubmit={this.handleloginFormStatus}>
                    <label>

                    <h3> Login </h3>

                    <p>username </p>

                    <input
                    name="username"
                    value={this.state.usernameInput} 
                    onChange={this.handleUsernameChange} />
                    
                    <p> password </p>

                    <input
                    name="password"
                    type="password" 
                    value={this.state.passwordInput}
                    onChange={this.handlePasswordChange} />
                    
                    <p> Confirm new password </p>
                    
                    </label>
                    <br></br>
                    
                    <input type="submit" value="Submit" />
                </form>

                }
            </Card>

            </>
        );
    };
};
