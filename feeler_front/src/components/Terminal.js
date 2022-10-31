import React, { useEffect, useState } from "react";
import { ScrollView } from 'react';

import Card from '@mui/material/Card';

import SocketHandler from "./SocketHandler";

export default function Terminal() {
    return (
        <>
        <Card variant="outlined">
            <p> Terminal</p>
        </Card> 
        
        <ScrollView>
            <text> hi</text>
        </ScrollView>
        
        <input></input>
        <button > Send </button>
        </>
    );
};