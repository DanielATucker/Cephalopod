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
            label: "Stats",
            labels: ["Time", "Time2", "Time3"],
            datasets: [{
                "id": 1,
                "label": "CPU",
                "data": [5, 5, 5],
                "borderColor": "rgb(235, 52, 235)",
                "backgroundColor": "rgb(235, 52, 235)"
            }]
        };

        this.state = {
            "messages": [],
            "scrollviewMessages": [],
            "stats": [],
            "tables": {
                "table1": table1,
            }
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props.stats !== prevProps.stats) {            
            let statsDict = []

            console.log(this.props);

            statsDict = this.props.stats.map((stat) => {
                console.log(stat);
            });
            
            this.setState({
                "stats": statsDict
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