import React, { Component } from "react";

import { Card, CardContent, Button, } from "@mui/material";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Axios } from "axios";
import NewUser from "./NewUser";
export default class PMSDiscord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewUser: false,
      selectedHandle: {
        handle: "Handle",
        lastContacted: false,
        welcomed: false,
        projectsJoined: {
          admin: false,
          buddySystem: false,
          supportTeam: false,
          emergencySupportTeam: false,
          socialMediaManager: false,
          programmer: false,
          mentorship: {
            mentor: false,
            mentee: false,
          },
          mutualAidContacting: false,
          LeftismThroughMusic: false,
          LeftistEducation: false,
        },
        overloaded: false,
        lastSocial: "",
        countryState: ""
      }
    };
  };

  renderNewUser = () => {
    this.setState({ showNewUser: !this.state.showNewUser })
  }

  NewUserHandleChange = (handle) => {
    let newUser = this.state.selectedHandle
    newUser.handle = handle;
    this.setState({ user: newUser })
  }

  NewUserLastContactedChange = (event) => {
    let newUser = this.state.selectedHandle
    newUser.lastContacted = event.target.checked;
    this.setState({ user: newUser })
  }

  render() {
    return (
      <div className="col">
        <Card>
          <CardContent>
            <h1>PMS - Discord</h1>

            <button
              onClick={this.renderNewUser}
            >
              New User
            </button>

            <Card>
              <CardContent>
                <div class="table-responsive">
                  {this.state.showNewUser && (
                    <NewUser
                      user={this.state.selectedHandle}
                      NewUserHandleChange={this.NewUserHandleChange}
                      NewUserLastContactedChange={this.NewUserLastContactedChange}
                    />
                  )}
                  <table class="table" border="1px">
                    <th className="PMSDiscordCol">
                      <FormGroup>
                        <FormControlLabel control={<Checkbox size="small" />} label="Handle" />
                      </FormGroup>
                    </th>

                    <td className="PMSDiscordCol">
                      <FormGroup>
                        <FormControlLabel control={<Checkbox size="small" />} label="Last Contacted" />
                      </FormGroup>
                    </td>
                    <td className="PMSDiscordCol">
                      <FormGroup>
                        <FormControlLabel control={<Checkbox size="small" />} label="Welcomed" />
                      </FormGroup>
                    </td>

                    <th className="PMSDiscordCol">
                      Projects joined

                      <div className="table-responsive">
                        <table border="1px">

                          <th className="PMSDiscordCol">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox size="small" />} label="Admin" />
                            </FormGroup>
                          </th>

                          <th className="PMSDiscordCol">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox size="small" />} label="Buddy System" />
                            </FormGroup>
                          </th>

                          <th className="PMSDiscordCol">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox size="small" />} label="Support Team" />
                            </FormGroup>
                          </th>

                          <th className="PMSDiscordCol">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox size="small" />} label="Emergency Support Team" />
                            </FormGroup>
                          </th>

                          <th className="PMSDiscordCol">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox size="small" />} label="Social Media Manager" />
                            </FormGroup>
                          </th>

                          <th className="PMSDiscordCol">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox size="small" />} label="Programmer" />
                            </FormGroup>
                          </th>

                          <th className="PMSDiscordCol">
                            Mentorship

                            <th className="PMSDiscordCol">
                              <FormGroup>
                                <FormControlLabel control={<Checkbox size="small" />} label="Mentor" />
                              </FormGroup>

                            </th>
                            <th className="PMSDiscordCol">
                              <FormGroup>
                                <FormControlLabel control={<Checkbox size="small" />} label="Mentee" />
                              </FormGroup>
                            </th>
                          </th>

                          <th className="PMSDiscordCol">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox size="small" />} label="Mutual aid contacting" />
                            </FormGroup>
                          </th>

                          <th className="PMSDiscordCol">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox size="small" />} label="Leftism Through Music" />
                            </FormGroup>
                          </th>

                          <th className="PMSDiscordCol">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox size="small" />} label="Leftist Education" />
                            </FormGroup>
                          </th>
                        </table>
                      </div>
                    </th>

                    <th className="PMSDiscordCol">
                      <FormGroup>
                        <FormControlLabel control={<Checkbox size="small" />} label="Overloaded" />
                      </FormGroup>
                    </th>

                    <th className="PMSDiscordCol">
                      <FormGroup>
                        <FormControlLabel control={<Checkbox size="small" />} label="Last Social" />
                      </FormGroup>
                    </th>


                    <th className="PMSDiscordCol">
                      <FormGroup>
                        <FormControlLabel control={<Checkbox size="small" />} label="Country - State" />
                      </FormGroup>
                    </th>

                  </table>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card >
      </div >
    );
  }
}