import React, { Component } from "react";

import WhatIsCapitalism from "./education/What_is_Capitalism.js";
import WhatIsAnarchism from "./education/What_is_Anarchism.js";
import Revolution from "./education/Revolution.js";
import { Card, CardContent } from "@mui/material";
import Library from "./education/Library/Library.js";

export class Education extends Component {
  render() {
    return (
      <div class="row">
        <Card variant="outlined">
          <CardContent>
            <div className="page-header">
              <h3 className="page-title"> Education </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="!#" onClick={(event) => event.preventDefault()}>
                      Education
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </ol>
              </nav>
            </div>

            <Card variant="outlined">
              <CardContent>
                <div className="row-centered">
                  <h4>Lets Overthrow Capitalism together</h4>
                  <Card>
                    <CardContent>
                      The goal of overthrowing Capitalism will require many
                      subtasks, as the only way to defeat it is through the power
                      of love, or in other words, a multifaceted attack from every
                      angle possible.
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <h4>Topics to explore</h4>

                <Card>
                  <CardContent>
                    <div className="row">
                      <div className="col"> What is Capitalism? </div>
                      <div className="col"> What is Anarchism? </div>
                      <div className="col"> Revolution </div>
                    </div>

                    <div className="row-centered">
                      <br /> <br />
                      <p> - Coming soon! </p>
                      <br />
                    </div>

                    <div className="row">
                      <div className="col"> Anarcho-Syndicalism </div>
                      <div className="col"> Revolutionary Thinking </div>
                      <div className="col"> The State </div>
                      <div className="col"> Workers Rights </div>
                      <div className="col"> BLM </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <WhatIsCapitalism />

            <WhatIsAnarchism />

            <Revolution />

            <Library></Library>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Education;
