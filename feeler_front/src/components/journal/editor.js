import React from 'react';


export default function Editor (props) {
    sendJournalData = (data) => {
        fetch('https://100.69.19.3:3001/journal/post_journal', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "journalData": data
            }),
            credentials: "include"
        });
    };


    return (
    <>
        
    <h3> Editor </h3>

    {this.props.editor}

    </>
    );
}