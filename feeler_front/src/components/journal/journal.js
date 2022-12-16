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
                    { field: 'name', headerName: 'Journal', width: 130}
                ], 
                "rows": [
                    { id: 0, name: "JOURNALNAME"}
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
        });

        if (this.state) {
            this.setState({
                "datagrid": prevGrid
            });
        };
    };

    journalClick = (params) => {
        console.log(`Prams: ${prams}`);
        console.log(`"${params.row.name}" clicked`);
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
                    onRowClick={journalClick}
                    >
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