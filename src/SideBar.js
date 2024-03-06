import { Button, Card, CardContent } from "@mui/material";
import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  returnComponent = (component) => {
    this.props.getComponent(component);
  };

  renderAccount = () => {
    if (this.props.is_loggedin === true) {
      return (
        <Button
          onClick={() => {
            if (this.state) {
              this.returnComponent("Dashboard");
            }
          }}
        >
          Dashboard
        </Button>
      );
    } else {
      return (
        <>
          <div class="row ">
            <Button
              onClick={() => {
                if (this.state) {
                  this.returnComponent("SignUp");
                }
              }}
            >
              {" "}
              SignUp
            </Button>
          </div>

          <div class="row ">
            <Button
              onClick={() => {
                if (this.state) {
                  this.returnComponent("LogIn");
                }
              }}
            >
              {" "}
              Login
            </Button>
          </div>
        </>
      );
    }
  };

  renderCreateAdmin = () => {
    if (this.props.admin_created === false) {
      return (
        <div class="row ">
          <Button
            onClick={() => {
              if (this.state) {
                this.returnComponent("RegisterAdmin");
              }
            }}
          >
            Register-Admin
          </Button>
        </div>
      );
    }
  };

  renderAdminDashboard = () => {
    if (this.props.is_admin === true) {
      return (
        <div class="row ">
          <Button
            onClick={() => {
              if (this.state) {
                this.returnComponent("AdminDashboard");
              }
            }}
          >
            Admin Dashboard
          </Button>
        </div>
      );
    }
  };

  render() {
    return (
      <Card variant="outlined">
        <CardContent>


          <div class="row ">
            <Button
              onClick={() => {
                if (this.state) {
                  this.returnComponent("Home");
                }
              }}
            >
              {" "}
              Home
            </Button>
          </div><div class="row ">
            <Button
              onClick={() => {
                if (this.state) {
                  this.returnComponent("Education");
                }
              }}
            >
              Education
            </Button>
          </div><div class="row ">
            <Button
              onClick={() => {
                if (this.state) {
                  this.returnComponent("Music");
                }
              }}
            >
              Music
            </Button>
          </div><div className="row ">
            <Button
              onClick={() => {
                if (this.state) {
                  this.returnComponent("Resources");
                }
              }}
            >
              Resources
            </Button>
          </div>

          {this.renderAccount()}
          {this.renderAdminDashboard()}
          {this.renderCreateAdmin()}
        </CardContent>
      </Card>
    );
  }
}
