import React, { useEffect, useState} from "react";

import Card from '@mui/material/Card';


export default class Viewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            foundJournal: this.props.foundJournal
        };
    };

    componentDidMount() {
        this.foundJournalWatcher();
    };

    foundJournalWatcher = () => {
        useEffect(() => {
            console.log(`Viewer State ${this.state.foundJournal}`);

            this.setState({
                "foundJournal": this.props.foundJournal
            });
    
        }, [this.props.foundJournal]);
    };
    

    render() {
        return (
            <>

            <Card variant="outlined">
                <h3> Viewer </h3>

                <p> {this.state.foundJournal} </p>
            </Card>

            </>
        );
    };
};