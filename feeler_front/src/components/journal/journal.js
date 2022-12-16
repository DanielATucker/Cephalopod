import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';

import Editor from "./editor";
import { FormControlUnstyledContext } from "@mui/base";

export  default class Journal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "journals": [], 
            "datagrid": {
                "columns": [
                    { field: 'id', headerName: 'ID'},
                    { field: 'Name', headerName: 'Journal', width: 130}
                ], 
                "rows": [
                    { id: 0, Name: "JOURNALNAME"}
                ]
            }
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
        if (node != "No node found") {
            this.setState({
                "journals": this.state.journals.concat(node)
            })
        };

        this.journalsHandler(node);
    };

    journalsHandler = (node) => {
        console.log(`Node: ${JSON.stringify(node)}`);

        let journals = JSON.parse(node);
        
        console.log(typeof journals);
        console.log(`Journals: ${JSON.stringify(journals)}`);
            
        let prevGrid = JSON.parse(JSON.stringify(this.state.datagrid));

        console.log(prevGrid);
        console.log(prevGrid.rows);

        Object.entries(journals).forEach((journalObject, count) => {           
            console.log(`JournalObject: ${JSON.stringify(journalObject)}`);

            let journal = journalObject[1];

            console.log(`Journal: ${JSON.stringify(journal)}`);

            console.log(`PrevGrid Rows in: ${JSON.stringify(prevGrid.rows)}`);

            if (prevGrid.rows.some(found => found.name === journal.name)) {
                console.log(`FOUND JOURNAL NAME: ${journal.name}`);
            }
            else{
                console.log(`Count in: ${count}`);

                count = count + 1;

                console.log(`Count out: ${count}`);

                prevGrid.rows.push({ id: count, name: journal.name});

                console.log(`PrevGrid out: ${JSON.stringify(prevGrid)}`);

                count++;
            };
        });

        console.log(`Grid out: ${JSON.stringify(prevGrid)}`);

        if (this.state) {
            this.setState({
                "datagrid": prevGrid
            });
        };

        if (this.state) {
            console.log(`Updated DataGrid: ${JSON.stringify(this.state.datagrid)}`);
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
                    checkboxSelection>
                    </DataGrid>
                </div>

                <div style={{display: "inline-block"}}>
                    <Editor></Editor>
                </div>

                <div style={{display: "inline-block"}}>
                    <Card variant="outlined"> Viewer </Card>
                </div>
            </div>

            </>
        );
    };
};