import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";
import Site from "./Site/Site";
import axios from "axios";
import PMSDiscord from "./Discord/PMSDiscord";

export default class PersonnelManagementSoftware extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfiles: [],
    };
  }

  getUserProfiles = () => {
    axios
      .get(`https://${process.env.host}/admin/user_profiles`, {
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
    return (
      <div className="col">
        <Card>
          <CardContent>
            <h1>Personnel Management Software</h1>

            <PMSDiscord />

            <Site
              getUserProfiles={this.getUserProfiles}
              userProfiles={this.state.userProfiles}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}
