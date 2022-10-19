import React from "react";
import { ScrollView } from 'react';

import Card from '@mui/material/Card';

export default function Terminal() {
    return (
        <>
        <Card variant="outlined">
            
            <p> Terminal</p>
                        
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