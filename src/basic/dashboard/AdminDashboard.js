import React, { Component } from "react";

import Chat from "./chat/Chat.js";
import Calendar1 from "./Calendar.js";
import Stats from "./stats/Stats.js";
import Music from "./music/Music.js";
import Sync from "./sync/Sync.js";
import Kanban1 from "./kanban/kanban.js";

import { ProSidebarProvider } from "react-pro-sidebar";
import { Card, CardContent } from "@mui/material";
import axios from "axios";

export class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { userProfiles: [] };
  }

  getUserProfiles = () => {
    axios
      .get(`http://${process.env.host}/admin/user_profiles`, {
        withCredentials: true,
      })
      .then((result) => {
        this.setState({ userProfiles: result.data.userProfiles });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  componentDidMount() {
    this.getUserProfiles();
  }

  render() {
    let profiles = Object.values(this.state.userProfiles).map((user) => (
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
      <div class="row">

        <div>
          <Card variant="outlined">
            <CardContent>
              <h1> Admin Dashboard</h1>

              <Card>
                <CardContent>
                  <h2> Admin Profile</h2>
                  <p> Username: {this.props.username}</p>
                </CardContent>
              </Card>

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
        </div>
      </div>
    );
  }
}

export default AdminDashboard;

/*
<Calendar1></Calendar1>

<ProSidebarProvider>
  <Chat></Chat>
</ProSidebarProvider>

<Stats></Stats>
<Sync></Sync>
<Music></Music>

*/
