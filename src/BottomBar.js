import React from "react";
import Music from "./basic/home/Music";
import Chat from "./basic/dashboard/chat/Chat";
import RSS from "./basic/dashboard/RSS/RSS";
import Journal from "./basic/Journal/Journal";

export default class BottomBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderBottomComponent = () => {
    if (this.props.BottomBarComponent === "Music") {
      return <Music />;
    } else if (this.props.BottomBarComponent === "Messages") {
      return <Chat username={this.props.username} />;
    } else if (this.props.BottomBarComponent === "RSS") {
      return <RSS />;
    } else if (this.props.BottomBarComponent === "Notifications") {
      return <h1> Notifications</h1>;
    } else if (this.props.BottomBarComponent === "Journal") {
      return <Journal />;
    }
  };

  render() {
    return (
      <div class="row">{this.renderBottomComponent()}</div>
    );
  }
}
