import React, { Component } from "react";
import { useEffect, useState } from "react";

import Card from '@mui/material/Card';


function Main () {
    const [username, setUsername] = useState("No user logged in");

    //setUsername("No user logged in");

    username = fetch('http://100.69.19.3:3001/get_username')
        .then((response) => response.json())
        .then((responseJSON) => {
        console.log(responseJSON);
    });

    useEffect(() => {
        setUsername(username);
    });

    
    /*async get_username(){
        const response = fetch('http://100.69.19.3:3001/get_username');
        const username = response.json;
    
        return username;
    };
    */

    return (
        <Card variant="outlined">
            <head>
                <title>Cephalopod</title>
            </head>
            
            <body>
            <h1>Welcome to Cephalopod</h1>

            <p> Your username is {username}</p>
            </body>
        </Card>
    );
};

export default Main;