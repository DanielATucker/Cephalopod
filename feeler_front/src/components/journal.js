import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';


export default class Journal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "test": 1
        };

        
    };
    
    componentDidMount() {
        this.setState({
            "test": 2
        })
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {            
            this.setState({
                "test": 3
            })

        }
    };   

    render() {

        const columns = [
            { field: 'id', headerName: 'ID'},
            { field: 'Name', headerName: 'Journal', width: 130}
        ]
        const rows = [
            { id: 1, Name: "JOURNALNAME"}
            ];

        return (
            <>
            
            <h1> Journal</h1>

            <div style={{width: "100%", display: "flex"}}>
                
                <div style={{display: "inline-block", width: "20%", height: 700}}>
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection>
                    </DataGrid>
                </div>

                <div style={{display: "inline-block"}}>
                    <Card> Editor </Card>
                </div>

                <div style={{display: "inline-block"}}>
                    <Card variant="outlined" border="1px" borderColor="#d20104"> Viewer </Card>
                </div>
            </div>

            </>
        );
    };
};
