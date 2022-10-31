import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from 'react';

import Card from '@mui/material/Card';

import SocketHandler from "./SocketHandler";

export default function Terminal() {
    return (
        <>
        <Card variant="outlined">
            <p> Terminal</p>
        </Card> 
         
        <ScrollView style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}>
            <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
        </ScrollView>
        
        <input></input>
        <button > Send </button>
        </>
    );
};