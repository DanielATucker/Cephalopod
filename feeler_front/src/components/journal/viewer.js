import React, { useEffect} from "react";

import Card from '@mui/material/Card';


export default function Viewer (props) {    
    return (
        <>
        
        <Card variant="outlined">
            <h3> Viewer </h3>

            <p> {JSON.stringify(props.foundJournal)} </p>
        </Card>

        </>
    );    
};
