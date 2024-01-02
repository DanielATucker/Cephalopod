import React, { Component } from "react";

import { Dropdown } from "react-bootstrap";

import SignUpForm from "./account/SignUpForm.js";
import { Card, CardContent } from "@mui/material";
import { Padding } from "@mui/icons-material";

import { LMG_memes } from "./home/LMG_memes.js";
import Social_media from "./home/Social_media.js";
import Sophia from "./home/Sophia.js";
import Wade from "./home/Wade.js";
import Music from "./home/Music.js";
import Contact from "./home/Contact.js";
import Programmer from "./home/Programmer.js";
import LMGAsSocialMedia from "./home/LMGAsSocialMedia.js";
import CommunitySupportNetwork from "./home/CommunitySupportNetwork.js";

export class Home extends Component {
  render() {
    return (
      <Card variant="outlined">
        <CardContent>
          <div className="page-header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="!#" onClick={(event) => event.preventDefault()}>
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Landing
                </li>
              </ol>
            </nav>
          </div>

          <div className="row-centered">
            <Card variant="outlined">
              <CardContent>
                <h1>Leftist Media Group</h1>

                <p>
                  Leftist Media group is dedicated to Organizing the Left and
                  starting the Revolution.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="row-centered">
            <Card>
              <CardContent>
                <h4> Lets Overthrow Capitalism together</h4>

                <div className="row">
                  <div className="col-sm">
                    <Card variant="outlined">
                      <CardContent>
                        <p>
                          Due to our escalating climate catastrophe we are nearing the end of our fascist leadership path.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="col-sm">
                    <Card variant="outlined">
                      <CardContent>
                        <p>
                          Overthrowing Capitalism will require a multifaceted
                          attack from every angle possible.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card variant="outlined">
            <CardContent style={{ borderColor: "red" }}>
              <h4>Projects</h4>

              <p>
                All projects are focused on a specific avenue of dismantling
                Capitalism one brick at a time.
              </p>

              <div className="col" style={{ padding: 15 }}>
                <LMG_memes />
              </div>

              <div className="col" style={{ padding: 15 }}>
                <CommunitySupportNetwork/>
              </div>

              <div className="col" style={{ padding: 15 }}>
                <Social_media />
              </div>

              <div className="col" style={{ padding: 15 }}>
                <Programmer />
              </div>

              <div className="col" style={{ padding: 15 }}>
                <Sophia />
              </div>

              <div className="row">
                <div className="col" style={{ padding: 15 }}>
                  <Wade />
                </div>

                <div className="col" style={{ padding: 15 }}>
                  <Music />
                </div>
              </div>

              <div className="col" style={{ padding: 15 }}>
                <LMGAsSocialMedia />
              </div>

              <div className="row-centered">
                <SignUpForm />
              </div>

              <div className="row-centerd" tyle={{ padding: 15 }}>
                <Contact />
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  }
}

export default Home;
