import React from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';


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
        data="<p>Hello from CKEditor 5!</p>"
        onReady={ ( editor ) => {
          console.log( "CKEditor5 React Component is ready to use!", editor );
        } }
        onChange={ ( event, editor ) => {
          const data = editor.getData();
          console.log( { event, editor, data } );
        } }
        />

        </>
    );
  }
}

