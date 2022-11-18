import React, { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Line } from 'react-chartjs-2';
import { formControlLabelClasses } from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default class Stats extends React.Component {
    constructor(props) {
        super(props)

        let table1 = {
            label: "Not Initiated",
            labels: ["Not Initiated"],
            datasets: [{
                "id": 1,
                "label": "NOT Initiated",
                "data": [0],
                "borderColor": "rgb(235, 52, 235)",
                "backgroundColor": "rgb(235, 52, 235)"
            }]
        };

        this.state = {
            "messages": [],
            "scrollviewMessages": [],
            "data": {
                "CPU_Percent_list": [0],
                "RAM_Percent_list": [0],
                "Ram_GB_list": [0],
                "Upload_list": [0],
                "Upload_Speed_list": [0],
                "Download_list": [0],
                "Download_Speed_list": [0],
                "Time_List": [0]
            },
            "tables": {
                "table1": table1,
            }
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props.stats !== prevProps.stats) {
            let  currentProps = JSON.stringify(this.props);
            let currentState = JSON.stringify(this.state.data);
            
            console.log(`State: ${currentState}`);

            console.log(`Props: ${currentProps}`);

            console.log(this.props.stats);
            console.log(typeof this.props.stats);

            CPU_Percent_Out = this.state.data.CPU_Percent_list.push(this.props.CPU_Percent)

            console.log(CPU_Percent_Out);

            this.setState({            
                "data": {
                    "CPU_Percent_list": CPU_Percent_Out,
                    "RAM_Percent_list": this.state.data.RAM_Percent_list.push(this.props.RAM_Percent),
                    "Ram_GB_list": this.state.data.Ram_GB_list.push(this.props.Ram_GB),
                    "Upload_list": this.state.data.Upload_list.push(this.props.Upload),
                    "Upload_Speed_list": this.state.data.Upload_Speed_list.push(this.props.Upload_Speed),
                    "Download_list": this.state.data.Download_list.push(this.props.Download),
                    "Download_Speed_list": this.state.data.Download_Speed_list.push(this.props.Download_Speed),
                    "Time_List": this.state.data.Time_List.push(this.props.Time)
                }
            });

                    
            let table1 = {
                label: "CPU",
                labels: this.state.data.Time_List,
                datasets: [{
                    "id": 1,
                    "label": "CPU",
                    "data": this.state.data.CPU_Percent_list,
                    "borderColor": "rgb(235, 52, 235)",
                    "backgroundColor": "rgb(235, 52, 235)"
                }]
            };

            this.setState({
                "tables": {
                    "table1": table1,
                }
            }); 
        };
    };

    render () {
        return(
            <>
            
            <h1> Stats </h1>
            <Line data= {this.state.tables.table1}> </Line>

            </>
        )
    };
};