import "./App.css";
import "chart.js/auto";
import React, { useState } from "react";
import Layout from "./layout";

function App() {
  const [admin_created, setadmin_created] = useState(null);

  return (
    <>
      <Layout
        admin_created={admin_created}
        setadmin_created={setadmin_created}
      />

    </>
  );
}

export default App;
