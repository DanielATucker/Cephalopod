import { Routes, Route, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import Home from "./basic/Home.js";
import Volunteering from "./basic/volunteering/Volunteering.js";
import Account from "./basic/account/Account.js";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SignUpForm from "./basic/account/SignUpForm.js";
import { red } from "@mui/material/colors";

import Register_Admin from "./basic/account/Register_admin.js";
import Login from "./basic/account/Login.js";
import React, { useEffect } from "react";
import SideBar from "./SideBar.js";
import axios from "axios";
import ResourceMap from "./basic/Resources/ResourceMap.js";
import AdminDashboard from "./basic/dashboard/AdminDashboard.js";
import TopBar from "./Topbar.js";
import Dashboard from "./basic/dashboard/Dashboard.js";
import { Margin } from "@mui/icons-material";
import Education from "./basic/Education.js";
import BottomBar from "./BottomBar.js";
import Music from "./basic/music/Music.js";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: red,
  },
  components: {
    // Name of the component
    MuiCard: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          borderColor: "red",
          borderRadius: 2,
          position: "relative",
          zIndex: 0,
        },
      },
    },
  },
});

export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      is_loggedin: "Not initalized",
      username: "Not initalized",
      component: "Home",
      is_admin: null,
      BottomBarComponent: null,
    };
  }

  renderBottomBar = () => {
    if (this.state.is_loggedin === true) {
      return <BottomBar BottomBarComponent={this.state.BottomBarComponent} username={this.state.username} />;
    }
  };

  renderTopBar = () => {
    if (this.state.is_loggedin === true) {
      return <TopBar getBottomComponent={this.getBottomComponent} />;
    }
  };

  setIs_admin = (is_admin) => {
    this.setState({ is_admin: is_admin });
  };

  renderComponent = () => {
    if (this.state.component === "Home") {
      return <Home />;
    } else if (this.state.component === "Education") {
      return <Education />;
    } else if (this.state.component === "SignUp") {
      return (
        <SignUpForm
          setIs_loggedin={this.setIs_loggedin}
          setUsername={this.setUsername}
        />
      );
    } else if (this.state.component === "LogIn") {
      return (
        <Login
          setIs_loggedin={this.setIs_loggedin}
          setUsername={this.setUsername}
          setIs_admin={this.setIs_admin}
        />
      );
    } else if (this.state.component === "RegisterAdmin") {
      return <Register_Admin admin_created={this.admin_created} />;
    } else if (this.state.component === "Resources") {
      return <ResourceMap />;
    } else if (this.state.component === "Dashboard") {
      return <Dashboard username={this.state.username} />;
    } else if (this.state.component === "AdminDashboard") {
      return <AdminDashboard username={this.state.username} />;
    } else if (this.state.component === "Music") {
      return <Music />;
    }
  };

  getComponent = (component) => {
    if (component === "Home") {
      this.setState({ component: "Home" });
    } else if (component === "Education") {
      this.setState({ component: "Education" });
    } else if (component === "SignUp") {
      this.setState({ component: "SignUp" });
    } else if (component === "LogIn") {
      this.setState({ component: "LogIn" });
    } else if (component === "Dashboard") {
      this.setState({ component: "Dashboard" });
    } else if (component === "RegisterAdmin") {
      this.setState({ component: "RegisterAdmin" });
    } else if (component === "Resources") {
      this.setState({ component: "Resources" });
    } else if (component === "AdminDashboard") {
      this.setState({ component: "AdminDashboard" });
    } else if (component === "Music") {
      this.setState({ component: "Music" });
    }
  };

  getBottomComponent = (component) => {
    if (component === "Music") {
      this.setState({ BottomBarComponent: "Music" });
    } else if (component === "Messages") {
      this.setState({ BottomBarComponent: "Messages" });
    } else if (component === "RSS") {
      this.setState({ BottomBarComponent: "RSS" });
    } else if (component === "Journal") {
      this.setState({ BottomBarComponent: "Journal" });
    }
  };

  admin_created = () => {
    axios
      .get(`https://${process.env.host}/system/admin_created`, {
        withCredentials: true,
      })
      .then((result) => {
        if (result.data.admin_created === true) {
          this.props.setadmin_created(true);
        } else {
          this.props.setadmin_created(false);
        };
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  setIs_loggedin = (is_loggedin) => {
    this.setState({ is_loggedin: is_loggedin });
  };

  setUsername = (username) => {
    this.state.username = username;
  };

  componentDidMount() {
    this.admin_created();
  }

  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div class="container">

          <div class="row main">

            {this.renderTopBar()}

            <div class="col-sm-3">
              <SideBar
                getComponent={this.getComponent}
                is_loggedin={this.state.is_loggedin}
                admin_created={this.props.admin_created}
                is_admin={this.state.is_admin}
              />
            </div>

            <div class="col">
              <div class="row">
                {this.renderComponent()}
              </div>
            </div>

            {this.renderBottomBar()}
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
