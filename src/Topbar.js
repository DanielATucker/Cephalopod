import { Button } from "@mui/material";
import React from "react";

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  returnComponent = (component) => {
    this.props.getBottomComponent(component);
  };

  render() {
    return (
      <div class="row topbar position-sticky">
        <div class="col">
          <Button
            onClick={() => {
              if (this.state) {
                this.returnComponent("Music");
              }
            }}
          >
            {" "}
            Music
          </Button>
        </div>

        <div class="col">
          <Button
            onClick={() => {
              if (this.state) {
                this.returnComponent("Messages");
              }
            }}
          >
            {" "}
            Messages
          </Button>
        </div>

        <div class="col">
          <Button
            onClick={() => {
              if (this.state) {
                this.returnComponent("RSS");
              }
            }}
          >
            {" "}
            Rss
          </Button>
        </div>

        <div class="col">
          <Button
            onClick={() => {
              if (this.state) {
                this.returnComponent("Journal");
              }
            }}
          >
            {" "}
            Journal
          </Button>
        </div>

        <div class="col">
          <Button
            onClick={() => {
              if (this.state) {
                this.returnComponent("Notifications");
              }
            }}
          >
            {" "}
            Notifications
          </Button>
        </div>
      </div>
    );
  }
}
