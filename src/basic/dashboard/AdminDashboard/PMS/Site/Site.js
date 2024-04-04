import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

export default class Site extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let profiles = Object.values(this.props.userProfiles).map((user) => (
      <div className="col">
        <Card variant="outlined">
          <CardContent>
            <h3> {user.username} </h3>
            <br />

            <p> Is Admin: {user.is_admin}</p>
            <p> Account Created: {user.registerTime}</p>
            <p> Email: {user.email}</p>
            <p> Tasks: {JSON.stringify(user.tasks, null, 2)}</p>
            <p> Files: {JSON.stringify(user.files, null, 2)}</p>
          </CardContent>
        </Card>
      </div>
    ));

    return (
      <>
        <Card>
          <CardContent>
            <h1>Site</h1>

            <Card>
              <CardContent>
                <h2> User Profiles</h2>
                <div class="container-fluid">
                  <div class="row">{profiles}</div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </>
    );
  }
}
