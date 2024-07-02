import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

export default class SocialMediaManager extends Component {
  render() {
    return (
      <>
        <Card>
          <CardContent>
            <div className="row">
              <div className="col">
                <Card variant="outlined">
                  <CardContent>
                    <div style={{ textAlign: "center" }}>
                      <h4>Social Media Manager</h4>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      Build and refine the online presence of
                      LeftistMediaGroup.org
                      <br />
                    </div>

                    <div style={{ textAlign: "left" }}>
                      <br />

                      Preferred skills:
                      <ul>
                        <li>
                          Facebook, Instagram, Reddit, Media Trends, Brand
                          Building, or social media managing interest or
                          experience
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}

