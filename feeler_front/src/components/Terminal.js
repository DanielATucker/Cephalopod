import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { ScrollView } from "@cantonjs/react-scroll-view";


export default class Terminal extends React.Component {
    constructor(props) {
        super(props)

        let messages = pops.messages;

        this.state = {
            "messages": messages
        }
    };
    
    render() {
        return (
            <>
            <Card variant="outlined">
                <p> Terminal</p>
            </Card>

            <ScrollView>
                {this.state.messages}
            </ScrollView>

            <input></input>
            <button > Send </button>
            </>
        );
    };
};