import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react';


export default function Terminal() {

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          paddingTop: StatusBar.currentHeight,
        },
        scrollView: {
          backgroundColor: 'pink',
          marginHorizontal: 20,
        },
        text: {
          fontSize: 42,
        },
    });

    return (
        <>
        <Card variant="outlined">
            <p> Terminal</p>
        </Card>

        <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>
            </Text>
        </ScrollView>

        <input></input>
        <button > Send </button>
        </>
    );
};