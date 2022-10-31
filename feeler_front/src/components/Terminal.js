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
        
        <View>
            <ScrollView>
                <Text> hi</Text>
            </ScrollView>
        </View>
        
        
        <input></input>
        <button > Send </button>
        </>
    );
};