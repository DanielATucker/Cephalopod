import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { Text, StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react';
import { fontSize } from "@mui/system";

import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';


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
            }
        });

        return (
            <>
            <Card variant="outlined">
                <p> Terminal</p>
            </Card>

            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <t> Test </t>
                </ScrollView>
            </SafeAreaView>


            <input></input>
            <button> Send </button>
            </>
        );
    };
};