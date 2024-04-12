import React, { Component } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Editor from 'react-simple-code-editor';
import Checkbox from '@mui/material/Checkbox';
import { highlight, languages } from 'prismjs/components/prism-core';


export default function NewUser(props) {
  return (
    <table class="table" border="1px">
      <tbody>
        <th className="PMSDiscordCol" style={{ width: 111 }}>
          <Editor
            value={props.user.handle}
            onValueChange={props.NewUserHandleChange}
            highlight={newEntry => highlight(newEntry, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </th>
        <th className="PMSDiscordCol">
          <FormGroup>
            <FormControlLabel control={<Checkbox size="small" checked={props.user.lastContacted} onChange={props.NewUserLastContactedChange} />} label="Last Contacted" />
          </FormGroup>
        </th>
        <th className="PMSDiscordCol">
          <FormGroup>
            <FormControlLabel control={<Checkbox size="small" checked={props.user.welcomed} />} label="Welcomed" />
          </FormGroup>
        </th>
        <th className="PMSDiscordCol">
          Projects joined

          <div className="table-responsive">
            <table border="1px">

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" checked={props.user.projectsJoined.admin} />} label="Admin" />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" checked={props.user.projectsJoined.buddySystem} />} label="Buddy System" />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" checked={props.user.projectsJoined.supportTeam} />} label="Support Team" />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" checked={props.user.projectsJoined.EmergencySupportTeam} />} label="Emergency Support Team" />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" checked={props.user.projectsJoined.socialMediaManager} />} label="Social Media Manager" />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" checked={props.user.projectsJoined.programmer} />} label="Programmer" />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                Mentorship

                <th className="PMSDiscordCol">
                  <FormGroup>
                    <FormControlLabel control={<Checkbox size="small" checked={props.user.projectsJoined.mentorship.mentor} />} label="Mentor" />
                  </FormGroup>

                </th>
                <th className="PMSDiscordCol">
                  <FormGroup>
                    <FormControlLabel control={<Checkbox size="small" checked={props.user.projectsJoined.mentorship.mentee} />} label="Mentee" />
                  </FormGroup>
                </th>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" checked={props.user.projectsJoined.mutualAidContacting} />} label="Mutual aid contacting" />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" checked={props.user.projectsJoined.leftismThroughMusic} />} label="Leftism Through Music" />
                </FormGroup>
              </th>

              <th className="PMSDiscordCol">
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" checked={props.user.projectsJoined.LeftistEducation} />} label="Leftist Education" />
                </FormGroup>
              </th>
            </table>
          </div>
        </th>
        <th className="PMSDiscordCol">
          <FormGroup>
            <FormControlLabel control={<Checkbox size="small" checked={props.user.overloaded} />} label="Overloaded" />
          </FormGroup>
        </th>
        <th className="PMSDiscordCol">
          <Editor
            value={props.user.lastSocial}
            onValueChange={(newEntry) => {
            }}
            highlight={newEntry => highlight(newEntry, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </th>
        <th className="PMSDiscordCol">
          <Editor
            value={props.user.countryState}
            onValueChange={(newEntry) => {
            }}
            highlight={newEntry => highlight(newEntry, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </th>
      </tbody>
    </table>
  );
}

