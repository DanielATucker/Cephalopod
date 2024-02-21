import React, { Component } from "react";

import Chat from "./chat/Chat.js";
import Calendar1 from "./Calendar.js";
import Stats from "./stats/Stats.js";
import Music from "./music/Music.js";
import Sync from "./sync/Sync.js";
import Kanban1 from "./kanban/kanban.js";

import Account from "../account/Account.js";
import PersGPS from "./GPS/PersGPS.js";
import { Cartesian3, Cartesian4 } from "cesium";


export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      live: {
        time: null,
        latitude: null,
        longitude: null,
        altitude: null,
        altitude: null,
        position: null,
      }
    };
  };


  renderComponent = (component) => {
    console.log(`Component: ${this.props.topComponent}`)
    if (component === null) {
      return (
        <h1> Null </h1>
      )
    } else if (component === "Music") {
      return (
        <Music></Music>
      );
    }
  };

  LiveData = (data) => {
    this.setState({
      live: {
        time: data.time,
        latitude: data.lat,
        longitude: data.lon,
        altitude: data.alt,
        position: Cartesian3.fromDegrees(data.lon, data.lat)
      }
    });

    console.log(`Latitude: ${data.lat} Longitude: ${data.lon}`)
  };

  render() {
    return (
      <>
        <Account username={this.props.username} />
        <PersGPS username={this.props.username}
          LiveData={this.LiveData}
          live={this.state.live} />
      </>
    )
  }
}

export default Dashboard;

/*
<Calendar1></Calendar1>

<ProSidebarProvider>
  <Chat></Chat>
</ProSidebarProvider>


<Stats></Stats>

<Sync></Sync>
*/

