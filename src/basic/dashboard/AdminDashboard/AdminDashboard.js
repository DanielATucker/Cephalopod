import React, { Component } from "react";

import Chat from "../chat/Chat.js";
import Stats from "../stats/Stats.js";
import Music from "../music/Music.js";
import Sync from "../sync/Sync.js";
import Kanban1 from "../kanban/kanban.js";

import { Card, CardContent } from "@mui/material";
import axios from "axios";
import Socials from "./Socials/Socials.js";
import PersonnelManagementSoftware from "./PMS/PMS.js";
import SundaySocialAdmin from "./SundaySocialAdmin/SundaySocialAdmin.js";
import Wade from "./Wade/Wade.js";

export class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socials: null,
      newSocialName: null,
      socialSearchResult: null,
    };
  }

  newSocialNameChange = (Name) => {
    this.setState({ newSocialName: Name });
  };

  addNewSocial = (url) => {
    axios
      .put(`https://${process.env.host}/socials/new_feed`, { url: url }, { withCredentials: true })
      .then((result) => {
        if (!result.data === "Token Expired, Log in Again") {
          console.log(`Socials in Result: ${JSON.stringify(result.data, null, 2)}`);
          this.setState({ isFacebookLoggedIn: null })
        }

      }).catch((err) => {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`)
      })
  }


  getSocials = () => {
    axios
      .get(`https://${process.env.host}/socials/out`, { test: "test" }, { withCredentials: true })
      .then((result) => {
        console.log(`Result: ${JSON.stringify(result.data, null, 2)}`);
        this.setState({ socials: result.data })
      });
  }

  render() {
    return (
      <div class="col">

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

              <br />

              <SundaySocialAdmin />

              <Wade />

              <PersonnelManagementSoftware />

              <Card>
                <CardContent>
                  <Socials socials={this.state.socials}
                    getSocials={this.getSocials}
                    newSocialNameChange={this.newSocialNameChange}
                    addNewSocial={this.addNewSocial}
                    newSocialName={this.state.newSocialName}
                    socialSearchResult={this.state.socialSearchResult}
                  />
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
