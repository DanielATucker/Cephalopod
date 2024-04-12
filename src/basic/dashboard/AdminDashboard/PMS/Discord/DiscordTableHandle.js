import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

export default class DiscordTableHandle extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        CountryState: ""
      }
    };
  }

  render() {
    return (
      <tbody>
        <td className="PMSDiscordCol">
          {this.props.selectedHandle.handle}
        </td>
        <td className="PMSDiscordCol">
          <FormGroup>
            <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.lastContacted} />
          </FormGroup>
        </td>
        <td className="PMSDiscordCol">
          <FormGroup>
            <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.welcomed} />
          </FormGroup>
        </td>
        <th className="PMSDiscordCol">
          Projects joined

          <div className="table-responsive">
            <table border="1px">

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.projectsJoined.admin} />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.projectsJoined.buddySystem} />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.projectsJoined.supportTeam} />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.projectsJoined.emergencySupportTeam} />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.projectsJoined.socialMediaManager} />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.projectsJoined.programmer} />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                Mentorship

                <th className="PMSDiscordCol">
                  <FormGroup>
                    <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.projectsJoined.mentorship.mentor} />
                  </FormGroup>

                </th>
                <th className="PMSDiscordCol">
                  <FormGroup>
                    <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.projectsJoined.mentorship.mentee} />
                  </FormGroup>
                </th>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.projectsJoined.mutualAidContacting} />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.projectsJoined.LeftismThroughMusic} />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.projectsJoined.LeftistEducation} />
                </FormGroup>
              </th>
            </table>
          </div>
        </th>
        <td className="PMSDiscordCol">
          <FormGroup>
            <FormControlLabel control={<Checkbox size="small" />} label={this.props.selectedHandle.overloaded} />
          </FormGroup>
        </td>
        <td className="PMSDiscordCol">
          <Editor
            value={this.props.selectedHandle.lastSocial}
            onValueChange={(newEntry) => {
            }}
            highlight={newEntry => highlight(newEntry, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </td>
        <td className="PMSDiscordCol">
          <Editor
            value={this.props.selectedHandle.CountryState}
            onValueChange={(newEntry) => {
            }}
            highlight={newEntry => highlight(newEntry, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </td>
      </tbody>
    );
  }
}
