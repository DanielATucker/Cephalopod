import React, { useEffect} from "react";

import Card from '@mui/material/Card';


export default function Viewer (props) {
    foundJournalWatcher(props);

    let foundJournalWatcher = (props) => {
        useEffect(() => {
            console.log(`Viewer props: ${props.foundJournal}`);
    
        }, [props.foundJournal]);
    };
    
    return (
        <>
        
        <Card variant="outlined">
            <h3> Viewer </h3>

            <p> {props.foundJournal} </p>
        </Card>

        </>
    );    
};
