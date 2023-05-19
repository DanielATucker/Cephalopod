import React, { Component } from "react";

export class WhatIsAnarchism extends Component {
  render() {
    return (
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">What is Anarchism?</h4>

            <div className="media">
              <i className="mdi mdi-earth icon-md text-info d-flex align-self-center mr-3"></i>

              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      {" "}
                      Anarchism is one of the many alternatives to Capitalism.{" "}
                    </div>

                    <div className="card-body">
                      {" "}
                      Within Anarchism, there are many different philosophies.
                      The main point behind Anarchism is that there is no
                      central government.
                    </div>

                    <div className="card-body">
                      {" "}
                      The specific philosophy under Anarchism that LMG
                      subscribes to is Anarcho-Syndicalism. Within
                      Anarcho-Syndicalism, the biggest decisions in society are
                      made by the specific workers in it's respective industry.{" "}
                    </div>

                    <div className="card-body">
                      {" "}
                      This is in sharp contrast to our current system, where we
                      essentially "elect" some random person to in theory,
                      represent our personal views about how the world should be
                      run. Then the person that's convinced the most people to
                      elect them, get's to essentially run the geopolitical
                      stage.{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WhatIsAnarchism;
