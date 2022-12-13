import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';

import Editor from "./editor";

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
                    { id: 1, Name: "JOURNALNAME"}
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
        
        this.setState({
            "journals": this.state.journals.concat(node)
        })
    };

    componentDidUpdate(previousState){
        if (this.state.journals != previousState.journals) {
            this.state.journals.map((journal) => {
                let prevGrid = this.state.datagrid;

                let newGrid = prevGrid.rows.concat(journal);

                this.setState({
                    "datagrid": newGrid
                });
            });

            console.log(`Updated DataGrid: ${JSON.stringify(this.state.datagrid)}`)
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
