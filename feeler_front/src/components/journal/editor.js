import React from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            "editor": (
                <CKEditor
                    editor={ ClassicEditor }
                    data={this.props.data}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();

                        this.sendJournalData(data);

                        this.updateJournal();
                    }}
                />
            )
        });
    };

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

    updateJournal = () =>{
        this.setState({
            editor: (
                <CKEditor
                    editor={ ClassicEditor }
                    data={this.props.data}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();

                        this.sendJournalData(data);

                        this.updateJournal()
                    }}
                />
            )
        });
    };

    render() {
        return (
        <>
        
        <h3> Editor </h3>

        {this.state.editor}

        </>
        );
    }
}