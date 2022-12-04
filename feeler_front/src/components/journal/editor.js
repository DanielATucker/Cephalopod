import React from 'react';

import { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            "journalData": null
        });
    };

    sendJournalData = (data) => {
        fetch('https://100.69.19.3:3001/journal', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "journalData": data
            }),
        });
    };

    componentDidUpdate(previousState) {
        if ((this.state.journalData !== previousState.journalData) && (this.state.journalData !== null)) {
            sendJournalData(this.state.journalData)
        };
    };

    render() {
        return (
        <>
        
        <h3> Editor </h3>

        <CKEditor
        editor={ ClassicEditor }        
        onChange={ ( event, editor ) => {
          const data = editor.getData();
          this.setState({
            "journalData": data
          });
        }}
        />

        </>
        );
    }
}
