import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { ScrollView } from "@cantonjs/react-scroll-view";


export default class Terminal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "messages": {},
            "scrollviewMessages": []
        };

        let messages = this.props.messages;

        console.log(this.props.messages);

        this.setState({
            "messages": messages
        });

        let messageDict = []
        
        console.log(`Terminal state messages: ${messages}`);
        
        for (let item in this.state.messages) {
            messageDict.push(item)
        };

        console.log(`Terminal messageDict: ${messageDict}`);
        console.log(`Terminal state messages: ${messages}`);



        this.setState({
            "scrollviewMessages": messageDict
        });
    };
    
    componentDidUpdate(prevProps) {
        if (this.props.messages !== prevProps.messages) {
            let messageDict = []
            
            for (let item in this.state.messages) {
                messageDict.push(item)
            };

            this.setState({
                "scrollviewMessages": messageDict
            })
            
            console.log(this.state.messages);
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