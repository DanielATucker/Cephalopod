import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { ScrollView } from "@cantonjs/react-scroll-view";


export default class Terminal extends React.Component {
    constructor(props) {
        super(props)

        let messages = props.messages;
        
        this.state = {
            "messages": messages,
            "scrollviewMessages": []
        };
    };
    
    componentDidUpdate(prevProps) {
        if (this.props.messages !== prevProps.messages) {
            for (let item in this.state.messages) {
                this.state.scrollviewMessages.push(item)
            };
        }
    }

    render() {
        return (
            <>
            <Card variant="outlined">
                <p> Terminal</p>
            </Card>

            <ScrollView>
                {this.state.scrollviewMessages}
            </ScrollView>

            <input></input>
            <button> Send </button>
            </>
        );
    };
};