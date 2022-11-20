import React, { useEffect, useState, FlatList } from "react";
import Card from '@mui/material/Card';
import { fontSize } from "@mui/system";
import { DataGrid } from '@mui/data-grid';


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
        return (
            <>
            <h1> Journal</h1>

            <DataGrid
                rows={["Journal"]}
                columns={[1,2,3]}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            >
            </DataGrid>

            </>
        );
    };
};
