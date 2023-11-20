import React, { Component } from "react";

import Chat from "./chat/Chat.js";
import Calendar1 from "./Calendar.js";
import Stats from "./stats/Stats.js";
import Music from "./music/Music.js";
import Sync from "./sync/Sync.js";
import Kanban1 from "./kanban/kanban.js";

import Account from "../account/Account.js";


export class Dashboard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
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
  
  render() {
    return(
      <Account username={this.props.username}/>
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

