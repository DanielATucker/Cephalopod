import "./App.css";
import "chart.js/auto";
import React, { useState } from "react";
import Layout from "./layout";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      admin_created: null,
    };
  }

  setadmin_created = (value) => {
    this.setState({ admin_created: value });
  };

  render() {
    return (
      <Layout
        admin_created={this.state.admin_created}
        setadmin_created={this.setadmin_created}
      />
    );
  }
}

export default App;
