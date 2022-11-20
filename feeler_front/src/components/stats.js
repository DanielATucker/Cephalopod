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
                "CPU_Percent_list": [],
                "RAM_Percent_list": [],
                "Ram_GB_list": [],
                "Upload_list": [],
                "Upload_Speed_list": [],
                "Download_list": [],
                "Download_Speed_list": [],
                "Time_List": []
            },
            "tables": {
                "table1": table1,
                "table2": table1,
                "table3": table1
            }
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props.stats !== prevProps.stats) {            
            this.setState({            
                "data": {
                    "CPU_Percent_list": this.state.data.CPU_Percent_list.concat(this.props.stats.CPU_Percent),
                    "RAM_Percent_list": this.state.data.RAM_Percent_list.concat(this.props.stats.RAM_Percent),
                    "Ram_GB_list": this.state.data.Ram_GB_list.concat(this.props.stats.Ram_GB),
                    "Upload_list": this.state.data.Upload_list.concat(this.props.stats.Upload),
                    "Upload_Speed_list": this.state.data.Upload_Speed_list.concat(this.props.stats.Upload_Speed),
                    "Download_list": this.state.data.Download_list.concat(this.props.stats.Download),
                    "Download_Speed_list": this.state.data.Download_Speed_list.concat(this.props.stats.Download_Speed),
                    "Time_List": this.state.data.Time_List.concat(this.props.stats.Time)
                }
            });

                    
            let CPU_RAM_Table = {
                label: "CPU & RAM % ",
                labels: this.state.data.Time_List,
                datasets: [
                    {
                        "id": 1,
                        "label": "CPU",
                        "data": this.state.data.CPU_Percent_list,
                        "borderColor": "rgb(235, 52, 235)",
                        "backgroundColor": "rgb(235, 52, 235)"
                    },
                    {
                        "id": 2,
                        "label": "RAM",
                        "data": this.state.data.RAM_Percent_list,
                        "borderColor": "rgb(255, 0, 0)",
                        "backgroundColor": "rgb(255, 0, 0)"
                    }
                ]
            };

            let Network_Table = {
                label: "Network Table",
                labels: this.state.data.Time_List,
                datasets: [
                    {
                        "id": 3,
                        "label": "Upload Total",
                        "data": this.state.data.Upload_list,
                        "borderColor": "rgb(235, 52, 235)",
                        "backgroundColor": "rgb(235, 52, 235)"
                    },
                    {
                        "id": 4,
                        "label": "Download Total",
                        "data": this.state.data.Download_list,
                        "borderColor": "rgb(255, 0, 0)",
                        "backgroundColor": "rgb(255, 0, 0)"
                    }
                    
                ]
            };

            let Network_Speed_Table = {
                label: "Network Table",
                labels: this.state.data.Time_List,
                datasets: [
                    {
                        "id": 5,
                        "label": "Upload Speed",
                        "data": this.state.data.Upload_Speed_list,
                        "borderColor": "rgb(235, 52, 235)",
                        "backgroundColor": "rgb(235, 52, 235)"
                    },
                    {
                        "id": 6,
                        "label": "Download Speed",
                        "data": this.state.data.Download_Speed_list,
                        "borderColor": "rgb(255, 0, 0)",
                        "backgroundColor": "rgb(255, 0, 0)"
                    }
                    
                ]
            };

            this.setState({
                "tables": {
                    "table1": CPU_RAM_Table,
                    "table2": Network_Table,
                    "table3": Network_Speed_Table
                }
            }); 
        };
    };

    render () {
        return(
            <>
            
            <h1> Stats </h1>

            <div style={{width: "100%"}}>
                
                <div style={{display: "inline-block", width: "100%"}}>
                <h2> CPU & RAM % </h2>
                    <Line data= {this.state.tables.table1}> </Line>
                </div>
                
                <div style={{display: "inline-block", width: "100%"}}>
                <h2> Network </h2>
                <Line data= {this.state.tables.table2}> </Line>
                </div>
                
                <div style={{display: "inline-block", width: "100%"}}>
                <h2> Network Speed </h2>
                <Line data= {this.state.tables.table3}> </Line>
                </div>

            </div>

            </>
        )
    };
};

