import React, { useEffect} from "react";

import Card from '@mui/material/Card';


export default function Viewer () {
    this.state = {
        foundJournal: this.props.foundJournal
    };
    
    this.foundJournalWatcher();

    foundJournalWatcher = () => {
        useEffect(() => {
            console.log(`Viewer State ${this.state.foundJournal}`);

            this.setState({
                "foundJournal": this.props.foundJournal
            });
    
        }, [this.props.foundJournal]);
    };
    
    return (
        <>
        
        <Card variant="outlined">
            <h3> Viewer </h3>

            <p> {this.state.foundJournal} </p>
        </Card>

        </>
    );    
};
