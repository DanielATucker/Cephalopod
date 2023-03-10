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
            ),
            "idCount": 1
        };
    };

    componentDidMount() {
        this.getJournalData();

        setTimeout(() => {
            this.getJournalData();
        }, 10000);
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
        let nodeJournals = JSON.parse(node);

        console.log(`NODES IN: ${JSON.stringify(nodeJournals)}`);

        let prevGrid = JSON.parse(JSON.stringify(this.state.datagrid));

        let singleJournal = null;

        if (typeof nodeJournals.name == "undefined") {
            singleJournal = false;
        }
        else {
            singleJournal = true;
        };

        if (singleJournal == false) {
            nodeJournals.forEach(nodeJournalsSingle => {            
                if (this.state) {
                    if (this.state.journals.some(item => item.name === nodeJournalsSingle.name)) {
                        let currentJournals = this.state.journals;
                        console.log(`CURRENT JOURNALS: ${JSON.stringify(currentJournals, null, 2)}`);

                        console.log(`COMPARING ${JSON.stringify(nodeJournalsSingle)}`)

                        if (this.state.journals.some(item => (item.name === nodeJournalsSingle.name) && (item.body === nodeJournalsSingle.body))) {
                            //console.log(`BODY SAME`);
                        }
                        else {
                            console.log(`BODY NOT SAME`);

                            let prevJournals = this.state.journals;

                            const index = prevJournals.map(e => e.name).indexOf(nodeJournalsSingle.name);

                            prevJournals[index].body = nodeJournalsSingle.body

                            this.setState({
                                "Journals": prevJournals
                            })
                        }
                    }
                    else {
                        prevGrid.rows.push({ id: this.state.idCount, name: nodeJournalsSingle.name});
                        
                        this.state.idCount++

                        if (this.state) {
                            this.setState({
                                "journals": this.state.journals.concat(nodeJournalsSingle)
                            });
                        };
                    }
                };
            }); 
        }
        else {
            if (this.state) {
                if (!(JSON.stringify(this.state.journals).includes(nodeJournals.name))) {
                    prevGrid.rows.push({ id: 0, name: nodeJournals.name});

                    this.setState({
                        "journals": this.state.journals.concat(nodeJournals)
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
        this.getJournalData();

        let journalName = params.row.name;

        console.log(`Clicked ${journalName}`)
        
        if (this.state) {
            let journals = this.state.journals;

            let singleJournal = null;

            if (typeof journals.name === "undefined") {
                singleJournal = false;
            }
            else {
                singleJournal = true;
            };

            if (singleJournal == true){
                journals.forEach(journal => {
                    if (!(JSON.stringify(journals).includes(journal.name))) {
                        if (journal.name === journalName) {
                            this.updateJournalState(journal.body, journal.name);
                        };
                    };
                });
            };

            if (singleJournal == false){
                if (this.state){
                    let found = null;

                    this.state.journals.forEach(journal => {
                        if (journal.name === journalName) {
                            this.updateJournalState(journal.body, journalName);

                            found = true;
                        };

                        if (found !== true) {
                            console.log(`NEW ENTRY`);

                            console.log(`STATE ${JSON.stringify(this.state.journals)}`);
                            
                            this.updateJournalState("", journalName);
                        }
                    });
                };
            
            };
        };
    };

    updateJournalState = (data, journalName) => { 
        console.log(`DATA ${data}`);
        
        this.setState({
            "editor": (
                <CKEditor
                    editor={ ClassicEditor }
                    data={data}
                    disabled = {false}
                    onChange={ ( event, editor ) => {
                        console.log(`EVENT ${JSON.stringify(event), null, 2}`);

                        const dataOut = editor.getData();

                        console.log(`DATA OUT ${dataOut}`);

                        this.sendJournalData(dataOut, journalName);
                        
                        this.getJournalData();
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
                    onRowClick={this.updateJournalData}
                    disableSelectionOnClick
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