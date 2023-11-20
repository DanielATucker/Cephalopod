import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

import SignUpForm from "../account/SignUpForm";
import { Card, CardContent } from "@mui/material";

export class Volunteering extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          <div className="page-header">
            <h3 className="page-title"> Volunteering </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="!#" onClick={(event) => event.preventDefault()}>
                    Volunteering
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Positions & Signup
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
                ></a>
                <i
                  className="mdi mdi-close bannerClose"
                  onClick={this.toggleProBanner}
                ></i>
              </span>
            </div>
          </div>

          <Card>
            <CardContent>
              <div className="row-centered">
                <h4>Lets Overthrow Capitalism together</h4>
                <p>
                  The goal of overthrowing Capitalism will require many
                  subtasks, as the only way to defeat it is through the power of
                  love, or in other words, a multifaceted attack from every
                  angle possible.
                </p>
              </div>
              <button className="btn btn-outline-light btn-rounded get-started-btn">
                See Projects
              </button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  }
}

export default Volunteering;
