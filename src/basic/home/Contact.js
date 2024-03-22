import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";


export class Contact extends Component {
  render() {
    return (
      <>
        <Card>
                  <CardContent>
                    <h4>Contact</h4>
                    <p>Leftist Media Group</p>

                    <div className="row-centerd">
                      <Card variant="outlined">
                        <CardContent>
                          <p className="font-weight-bold"> E-mail </p>
                          <p className="mb-2">  <a href="mailto:leftistmediagroup@gmail.com">LeftistMediaGroup@gmail.com</a>  </p>
                          <p className="font-weight-bold"> Discord</p>
                          <p> 
                            <a href="https://discord.gg/g82CpDKG">Community Support Network</a>
                          </p>
                          <p className="font-weight-bold"> Facebook</p>
                          <p>
                          <a href="https://www.facebook.com/LeftistMediaGroup">Facebook.com/LMG</a></p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
      </>
    );
  }
}

export default Contact;