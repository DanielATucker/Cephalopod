import React from "react";
import { DataGrid } from '@mui/x-data-grid';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Editor from "./editor.js";
import Viewer from "./viewer.js";

var strftime = require('strftime');


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
                    { id: -1, name: strftime("%y%m%d")}
                ]
            },
            "foundJournal": {
                "body": "No Journal Selected"
            },
            "editor": (
                <CKEditor
                    editor={ ClassicEditor }
                    data={"<p> No journal Selected </p>"}
                    disabled = {true}
                />
            )
        };
    };

    componentDidMount() {
        this.getJournalData();

        setInterval(this.getJournalData, 10000);
    };

    getJournalData = async () => {
        const response = await fetch('https://100.108.10.15:3001/journal/get_journal', {
            method: 'GET',
            credentials: "include"
        });

        let node = await response.json();
        
        if ((node !== "No node found") && (node !== "undefined") ) {
            this.journalsHandler(node);
        }
    };

    journalsHandler = (node) => {
        console.log(`Found NODE ${JSON.stringify(node)}`);
        
        let journals = JSON.parse(node);

        let prevGrid = JSON.parse(JSON.stringify(this.state.datagrid));

        let singleJournal = null;

        if (journals.name == "undefined") {

            singleJournal = false;
        }
        else {
            singleJournal = true;
        };

        if (singleJournal == false) {
            journals.forEach((journal, count) => {
                if (!(journal in this.state.journals)) {
                    count++

                    prevGrid.rows.push({ id: count, name: journal.name});
                    
                    this.setState({
                        "journals": this.state.journals.concat(journal.name)
                    });
                };
            });            
        }
        else {
            if (this.state) {
                if (!(JSON.stringify(this.state.journals).includes(journals.name))) {
                console.log(`FOUND = false`);

                    prevGrid.rows.push({ id: 0, name: journals.name});

                    this.setState({
                        "journals": this.state.journals.concat(journals)
                    });
                };
            };
        };

        if (this.state) {
            this.setState({
                "datagrid": prevGrid
            });
        };
    };

    updateJournalData = async (params) => {
        let journalName = params.row.name;

        console.log(`"${journalName}" clicked`);

        this.getJournalData();

        if (this.state) {
            console.log(`Journals state ${JSON.stringify(this.state.journals)}`);

            let journals = this.state.journals;

            let singleJournal = null;

            if (journals.name == "undefined") {

                singleJournal = false;
            }
            else {
                singleJournal = true;
            };

            if (singleJournal == true){

            };

            if (singleJournal == false){
                console.log(`Journals state ${JSON.stringify(journals)}`);

                journals.forEach((journal, count) => {
                    if ((JSON.stringify(journals).includes(journal.name))) {
                        if (journal.name === journalName) {
                            console.log(`FOUND CLICKED JOURNAL NAME: ${journal.name}`);
                            this.updateJournalState(journal.body, journal.name);
                        }
                        else{
                            this.updateJournalState("", journalName);
                        }
                    };
                })
            };
        };
    };

    updateJournalState = (data, journalName) => {
        this.setState({
            "editor": (
                <CKEditor
                    editor={ ClassicEditor }
                    data={data}
                    disabled = {false}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();

                        this.sendJournalData(data, journalName);
                    }}
                />
            )
        });
    };

    sendJournalData = async (data, journalName) => {
        fetch(`https://100.108.10.15:3001/journal/post_journal/${journalName}`, {
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
                    onRowClick={this.updateJournalData}
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
