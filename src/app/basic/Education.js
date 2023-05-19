import React, { Component } from "react";

import WhatIsCapitalism from "./education/What_is_Capitalism.js";
import WhatIsAnarchism from "./education/What_is_Anarchism.js";
import Revolution from "./education/Revolution.js";

export class Education extends Component {
  render() {
    return (
      <>
        <div>
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

          <div className="proBanner">
            <div>
              <span className="d-flex align-items-center purchase-popup">
                <p>Sign up to volunteer with us!</p>
                <a
                  href="leftistmediagroup.com/volunteering"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="btn btn-sm purchase-button ml-auto"
                >
                  Volunteer Now
                </a>
                <i
                  className="mdi mdi-close bannerClose"
                  onClick={this.toggleProBanner}
                ></i>
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-12 grid-margin stretch-card">
              <div className="card corona-gradient-card">
                <div className="card-body py-0 px-0 px-sm-3">
                  <div className="row align-items-center">
                    <div className="col-4 col-sm-3 col-xl-2">
                      <img
                        src={require("../../assets/images/dashboard/Group126@2x.png")}
                        className="gradient-corona-img img-fluid"
                        alt="banner"
                      />
                    </div>
                    <div className="col-5 col-sm-7 col-xl-8 p-0">
                      <h4 className="mb-1 mb-sm-0">
                        Lets Overthrow Capitalism together
                      </h4>
                      <p className="mb-0 font-weight-normal d-none d-sm-block">
                        {" "}
                        The goal of overthrowing Capitalism will require many
                        subtasks, as the only way to defeat it is through the
                        power of love, or in other words, a multifaceted attack
                        from every angle possible.
                      </p>
                    </div>
                    <div className="col-3 col-sm-2 col-xl-2 pl-0 text-center">
                      <button className="btn btn-outline-light btn-rounded get-started-btn">
                        See Projects
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Topics to explore</h4>
                <ul className="list-arrow">
                  <li> What is Capitalism? </li>
                  <li> What is Anarchism? </li>
                  <li> Revolution </li>

                  <br></br>

                  <p> - Coming soon! </p>

                  <li> Anarcho-Syndicalism </li>
                  <li> Revolutionary Thinking </li>
                  <li> The State </li>
                  <li> Workers Rights </li>
                  <li> BLM </li>
                </ul>
              </div>
            </div>
          </div>

          <WhatIsCapitalism></WhatIsCapitalism>
          <WhatIsAnarchism></WhatIsAnarchism>
          <Revolution></Revolution>
        </div>
      </>
    );
  }
}

export default Education;
