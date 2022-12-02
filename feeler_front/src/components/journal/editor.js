import React from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <>
        
        <h3> Editor </h3>

        <CKEditor
        editor={ ClassicEditor }
        data={
        <>
        
        <p> Journal Title: </p>
        <br></br>
        <p> Journal Body: </p>

        </>
        }
        
        onChange={ ( event, editor ) => {
          const data = editor.getData();
          console.log( { event, editor, data } );
        } }
        />

        </>
    );
  }
}

