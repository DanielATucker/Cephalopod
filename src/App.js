import "./App.css";
import "chart.js/auto";

import { Routes, Route, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import Dashboard from "./dashboard/Dashboard.js";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <div className="sidebar">
          <Sidebar>
            <Menu>
              <MenuItem component={<Link to="/dashboard" />}>
                {" "}
                Dashboard
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>

        <div class="container">
          <Routes>
            <Route exact path="/" element={<Dashboard/>} />/
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
