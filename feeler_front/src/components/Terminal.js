import React from "react";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text } from 'react-native';

import Card from '@mui/material/Card';

export default function Main () {
    
    return (
        <>
        <Card variant="outlined">
            <head>
                <p> Terminal</p>
            </head>
            
            <Card>
                <body>
                    <ScrollView></ScrollView> 
                </body>
            </Card>

            <Card>
                <input></input>
            </Card>
        </Card> 
        
        </>
    );
};