import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { ScrollView } from "@cantonjs/react-scroll-view";


export default function Terminal() {

    return (
        <>
        <Card variant="outlined">
            <p> Terminal</p>
        </Card>

        <ScrollView style={{ height: '100vh' }}>
            <h1>React Scroll View</h1>
            <p>Awseome</p>
        </ScrollView>

        <input></input>
        <button > Send </button>
        </>
    );
};