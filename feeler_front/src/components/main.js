import React from "react";
import { useEffect, useState } from "react";

import Card from '@mui/material/Card';

import Terminal from "./Terminal.js";

export default function Main () {
    const [username, setUsername] = useState("No user logged in");

    fetch('http://100.69.19.3:3001/get_username')
        .then((response) => response.json())
        .then((responseJSON) => {
        setUsername(responseJSON["USERNAME"]);
    });
    
    useEffect(() => {
        setUsername(username);
    });


    return (
        <>
        <Card variant="outlined">
            <head>
                <title> Cephalopod </title>
            </head>
            
            <body>
                <h1> Welcome to Cephalopod </h1>
                
                <p> Your username is </p>
                <p> {username} </p>
            </body>
        </Card>

        <Card>
            <Terminal> </Terminal>
        </Card>
        
        </>
    );
};