import React, { useEffect, useState } from "react";


export default class Stats extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "messages": [],
            "scrollviewMessages": [],
            "stats": []
        };
    };

    render () {
        return(
            <>
            
            <h1> Stats </h1>
            <p> {this.state.stats}</p>

            </>
        )
    }
}