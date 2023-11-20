import { Button, THEME_ID } from "@mui/material";
import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import Music from "./basic/home/Music";
import Chat from "./basic/dashboard/chat/Chat";
import RSS from "./basic/dashboard/RSS/RSS";

export default class BottomBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderBottomComponent = () => {
    if (this.props.BottomBarComponent === "Music") {
      return <Music />;
    } else if (this.props.BottomBarComponent === "Messages") {
      return <Chat />;
    } else if (this.props.BottomBarComponent === "RSS") {
      return <RSS />;
    } else if (this.props.BottomBarComponent === "Notifications") {
      return <h1> Notifications</h1>;
    }
  };

  render() {
    return (
      <div class="row position-fixed ">{this.renderBottomComponent()}</div>
    );
  }
}
