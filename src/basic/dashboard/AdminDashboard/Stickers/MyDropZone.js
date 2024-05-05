import React, { useCallback } from 'react'
import Dropzone from 'react-dropzone';


export default class MyDropZone extends React.Component {
    constructor() {
        super();
        this.onDrop = (files) => {
            this.setState({ files })
        };
        this.state = {
            files: []
        };
    }

    render() {
        const files = this.state.files.map(file => {
            console.log(`File: ${JSON.stringify(file, null, 2)}`)

            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(`Binary: ${binaryStr}`)
                this.props.UploadSticker(binaryStr)
            }
            reader.readAsArrayBuffer(file)

            return (
                <li key={file.name}>
                    {file.name} - {file.size} bytes
                    <h1>{file.data}</h1>
                </li>
            )
        });

        return (
            <Dropzone onDrop={this.onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section className="container">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside>
                            <h4>Files</h4>
                            <ul>{files}</ul>
                        </aside>
                    </section>
                )}
            </Dropzone>
        );
    }
}