import React, { useEffect, useState, Text } from "react";
import Card from '@mui/material/Card';
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
            
            console.log(this.props.messages);

            messageDict = this.props.messages.map(message => 
                <>
                <li key={message.date = new Date(message)}></li>
                <p> {message} </p>
                <p> {message.date}</p>
                </>
            );

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

            <ScrollView>
                {this.state.scrollviewMessages}
            </ScrollView>

            <input></input>
            <button> Send </button>
            </>
        );
    };
};