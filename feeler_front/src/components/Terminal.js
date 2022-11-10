import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { ScrollView, Text, StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react';
import { fontSize } from "@mui/system";

import { ScrollView } from "@cantonjs/react-scroll-view";


export default class Terminal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "messages": [],
            "scrollviewMessages": []
        };
    };
    
    componentDidMount() {
        this.setState({
            "scrollviewMessages": this.props.messages
        });
    };

    componentDidUpdate(prevProps) {
        if (this.props.messages !== prevProps.messages) {            
            let messageDict = []
            messageDict = this.props.messages.map((message) => <li key={message.uuid}>{message}</li>);
            
            this.setState({
                "scrollviewMessages": messageDict,
                "messages": messageDict
            });

        }
    };

    wrapMessage(message) {
        let wrapper =  <p> {message} </p>
        return wrapper;
    };

    render() {
        return (
            <>
            <Card variant="outlined">
                <p> Terminal</p>
            </Card>

            <ScrollView  style={{ height: '100vh' }}>
                {this.state.scrollviewMessages}
            </ScrollView>

            <input></input>
            <button> Send </button>
            </>
        );
    };
};