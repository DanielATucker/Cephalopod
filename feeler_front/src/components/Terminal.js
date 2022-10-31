import React, { useEffect, useState } from "react";
import { ScrollView, Text,  StyleSheet } from 'react';

import Card from '@mui/material/Card';

import SocketHandler from "./SocketHandler";

export default function Terminal() {

    const styles = StyleSheet.create({
        paragraph: {
          margin: 24,
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        scrollView: {
          height: '20%',
          width: '80%',
          margin: 20,
          alignSelf: 'center',
          padding: 20,
          borderWidth: 5,
          borderRadius: 5,
          borderColor: 'black',
          backgroundColor: 'lightblue'
        }
    });

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