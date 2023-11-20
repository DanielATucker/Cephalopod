import { Card, CardContent } from "@mui/material";
import React, { Component } from "react";

export class WhatIsAnarchism extends Component {
  render() {
    return (
      <Card variant="outlined">
        <CardContent>
          <h4>What is Anarchism?</h4>
          <Card>
            <CardContent>
              <p>Anarchism is one of the many alternatives to Capitalism. </p>

              <p>
                Within Anarchism, there are many different philosophies. The
                main point behind Anarchism is that there is no central
                government.
              </p>

              <p>
                The specific philosophy under Anarchism that LMG subscribes to
                is Anarcho-Syndicalism. Within Anarcho-Syndicalism, the biggest
                decisions in society are made by the specific workers in it's
                respective industry.
              </p>

              <p>
                This is in sharp contrast to our current system, where we
                essentially "elect" some random person to in theory, represent
                our personal views about how the world should be run. Then the
                person that's convinced the most people to elect them, get's to
                essentially run the geopolitical stage.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  }
}

export default WhatIsAnarchism;
