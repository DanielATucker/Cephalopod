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
            label: "Stats",
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
            }, 
            
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props.stats !== prevProps.stats) {            
            console.log(`Updated Props: ${this.props}`);
            
            this.props.stats.map((stat) => {

                this.setState({            
                    "data": {
                        "CPU_Percent_list": this.state.data.CPU_Percent_list.push(stat.CPU_Percent),
                        "RAM_Percent_list": this.state.data.RAM_Percent_list.push(stat.RAM_Percent_list),
                        "Ram_GB_list": this.state.data.Ram_GB.push(stat.Ram_GB),
                        "Upload_list": this.state.data.Upload.push(stat.Upload),
                        "Upload_Speed_list": this.state.data.Upload_Speed.push(stat.Upload_Speed),
                        "Download_list": this.state.data.Download.push(stat.Download),
                        "Download_Speed_list": this.state.data.Download_Speed.push(stat.Download_Speed),
                        "Time_List": this.state.data.Time_List.push(stat.Time)
                    }
                });

                let table1 = {
                    label: "Stats",
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
    }
}
