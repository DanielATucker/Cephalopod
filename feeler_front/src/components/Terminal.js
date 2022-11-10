import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { ScrollView, Text, StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react';
import { fontSize } from "@mui/system";
import { formControlLabelClasses } from "@mui/material";


export default class Terminal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "messages": [],
            "scrollviewMessages": []
        };

        console.log(props);
    };
    
    componentDidMount() {
        this.setState({
            "scrollviewMessages": this.props.messages
        });

    };

    componentDidUpdate(prevProps) {
        if (this.props.messages !== prevProps.messages) {                     
            console.log(this.props.messages);
            
            let messageDict = []
            messageDict = this.props.messages.map((message) => <li key={message.uuid}>{message}</li>);
            
            console.log(messageDict);

            this.setState({
                "scrollviewMessages": messageDict,
                "messages": messageDict
            });

        }
    };

    wrapMessage(message) {
        console.log(message);

        let wrapper =  <p> {message} </p>
        return wrapper;
    };

    render() {
        return (
            <>
            <Card variant="outlined">
                <p> Terminal</p>
            </Card>

            <input></input>
            <button> Send </button>
            </>
        );
    };
};