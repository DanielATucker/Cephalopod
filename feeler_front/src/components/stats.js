import React, { useEffect, useState } from "react";


export default class Stats extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "messages": [],
            "scrollviewMessages": []
        };
    };

    render () {
        return(
            <h1> Stats </h1>
        )
    }
}