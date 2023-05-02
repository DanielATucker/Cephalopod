import React, { Component } from "react";

export class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title">Stats</h4>
              </div>
              
              <p> isLoggedin: no.</p>
            </div>            
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
