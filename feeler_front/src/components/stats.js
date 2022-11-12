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
            "stats": []
        };

        let table1 = {
            label: "Stats",
            labels: ["Time", "Time2", "Tim3"],
            datasets: [1, 2, 3]
        };

        this.state = {
            "data": {
              "table1": table1,
            }
        };
    };

    render () {
        return(
            <>
            
            <h1> Stats </h1>
            <Line data= {this.state.stats}> </Line>

            </>
        )
    }
}