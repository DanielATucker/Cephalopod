import React, { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';

import Card from '@mui/material/Card';

import SocketHandler from "./SocketHandler";

export default function Terminal() {
    return (
        <>
        <Card variant="outlined">
            <p> Terminal</p>
        </Card> 
        
        <ScrollView>
            <Text> hi</Text>
        </ScrollView>
        
        <input></input>
        <button > Send </button>
        </>
    );
};