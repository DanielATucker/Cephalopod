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

    componentDidUpdate(previousState) {
        if ((this.state.journalData !== previousState.journalData) && (this.state.journalData !== null)) {
            console.log(this.state.journalData)
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
            "journalData": JSON.stringify(data)
          });
        }}
        />

        </>
        );
    }
}