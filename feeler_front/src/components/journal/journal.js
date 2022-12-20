import React from "react";
import { DataGrid } from '@mui/x-data-grid';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Editor from "./editor.js";
import Viewer from "./viewer.js";


export default class Journal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "journals": [], 
            "datagrid": {
                "columns": [
                    { field: 'id', headerName: 'ID'},
                    { field: 'name', headerName: 'Journal', width: 130}
                ], 
                "rows": [
                    { id: 0, name: "JOURNALNAME"}
                ]
            },
            "foundJournal": {
                "body": "No Journal Selected"
            },
            "editor": (
                <CKEditor
                    editor={ ClassicEditor }
                    data={this.props.data}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();

                        this.sendJournalData(data);
                    }}
                />
            )
        };
    };

    componentDidMount() {
        this.getJournalData();

        setInterval(this.getJournalData, 10000);
    };

    getJournalData = async () => {
        const response = await fetch('https://100.69.19.3:3001/journal/get_journal', {
            method: 'GET',
            credentials: "include"
        });

        let node = await response.json();

        this.journalsHandler(node);
    };

    journalsHandler = (node) => {
        let journals = JSON.parse(node);
                    
        let prevGrid = JSON.parse(JSON.stringify(this.state.datagrid));

        Object.entries(journals).forEach((journalObject, count) => {           
            let journal = journalObject[1];

            if (prevGrid.rows.some(found => found.name === journal.name)) {
                console.log(`FOUND JOURNAL NAME: ${journal.name}`);
            }
            else{
                count = count + 1;

                prevGrid.rows.push({ id: count, name: journal.name});

                count++;
            };

            if (!(this.state.journals.some(foundJournal => foundJournal.name === journal.name))) {
                this.setState({
                    "journals": this.state.journals.concat(journal)
                });
            };
        });

        if (this.state) {
            this.setState({
                "datagrid": prevGrid
            });
        };
    };

    journalClick = async (params) => {
        console.log(`"${params.row.name}" clicked`);
        console.log(`Journals: ${JSON.stringify(this.state.journals)}`);

        let foundJournal = this.state.journals.find(foundJournal => foundJournal.name === params.row.name);

        console.log(`Found Journal Final: ${JSON.stringify(foundJournal)}`);

        this.setState({
            "foundJournal": foundJournal
        }, () => {
            console.log(this.state.foundJournal);
        });

        this.updateJournal(this.state.foundJournal.body)
    };

    updateJournal = (data) => {
        this.setState({
            "editor": (
                <CKEditor
                    editor={ ClassicEditor }
                    data={data}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();

                        this.sendJournalData(data);
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

    render() {
        return (
            <>
            
            <h1> Journal</h1>

            <div style={{width: "100%", display: "flex"}}>
                
                <div style={{display: "inline-block", width: "20%", height: 700}}>
                    <DataGrid
                    rows={this.state.datagrid.rows}
                    columns={this.state.datagrid.columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onRowClick={this.journalClick}
                    >
                    </DataGrid>
                </div>

                <div style={{display: "inline-block"}}>
                    <Editor
                        editor = {this.state.editor}
                    ></Editor>
                </div>

                <div style={{display: "inline-block"}}>
                    <Viewer foundJournal = {this.state.foundJournal}></Viewer>
                </div>
            </div>

            </>
        );
    };
};