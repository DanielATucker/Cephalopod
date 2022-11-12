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

        this.state = {
            "messages": [],
            "scrollviewMessages": [],
            "stats": [],
            "tables": {
                "table1": table1,
              }
        };

        let table1 = {
            label: "Stats",
            labels: ["Time", "Time2", "Time3"],
            datasets: [1, 2, 3]
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