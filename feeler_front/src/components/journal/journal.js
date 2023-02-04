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
            "isLoggedIn": false,
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
            "editor": (
                <CKEditor
                    editor={ ClassicEditor }
                    data={"<p> No Journal Selected </P"}
                    disabled = {true}
                />
            )
        };
    };

    getJournalData = async () => {
        const response = await fetch('https://100.108.10.15:3001/journal/get_journal', {
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

    setJournalData = async (params) => {
        let journalName = params.row.name;

        console.log(`"${journalName}" clicked`);

        this.getJournalData();

        let journals = this.state.journals;

        Object.entries(journals).forEach((journalObject, count) => {           
            let journal = journalObject[1];

            if (journal.name === journalName) {
                console.log(`FOUND CLICKED JOURNAL NAME: ${journal.name}`);

                this.updateJournalState(journal.name, journal.body);
            };
        });         
    };

    updateJournalState = (journalName, journalData) => {
        this.setState({
            "editor": (
                <CKEditor
                    editor={ ClassicEditor }
                    data={journalData}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();

                        this.updateJournalState(journalName, data);

                        this.sendJournalData(journalName, data);
                    }}
                    disabled = {false}
                />
            )
        });
    };

    sendJournalData = async (journalName, data) => {
        let journalNameShort = journalName.replace(/\s+/g, '');
        
        fetch(`https://100.108.10.15:3001/journal/post_journal/${journalNameShort}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "journalData": data,
                "journalName": journalName
            }),
            credentials: "include"
        });

       await this.getJournalData();
    };

    componentDidUpdate(prevState){
        if ((this.state.isLoggedIn != prevState.isLoggedIn) && (this.state.isLoggedIn === true)){
            this.getJournalData();
        };
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
                    checkboxSelection = {false}
                    onRowClick={this.setJournalData}
                    >
                    </DataGrid>
                </div>

                <div style={{display: "inline-block"}}>
                    <Editor
                        editor = {this.state.editor}
                    ></Editor>
                </div>
            </div>

            </>
        );
    };
};
