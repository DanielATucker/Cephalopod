import { Viewer, Entity, EntityDescription } from "resium";
import { Cartesian3, createWorldTerrainAsync } from "cesium";
import { Card, CardContent } from "@mui/material";

const pointGraphics = { pixelSize: 10 };
const terrainProvider = createWorldTerrainAsync();

import React from "react";

import { io } from "socket.io-client";

export default class PersGPS extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      historicalData: {},
    };
  }
  InitSocket = () => {
    const socket = io("http://localhost:5001", { resource: 'nodejs' });

    socket.on("connect", () => {
      console.log("Connected to server");

      socket.emit("track_user", this.props.username);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("Historical_data", (data) => {
      console.log("Historical Data: ", data);
      this.setState({ historicalData: data });
    });

    socket.on("GPS_data", (data) => {
      console.log(`Live: ${JSON.stringify(data.data, null, 2)}`);

      this.props.LiveData(data.data);
    });
  };


  componentDidMount() {
    this.InitSocket();
  }

  render() {
    return (
      <Card variant="outlined">
        <CardContent>
          <div className="page-header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="!#" onClick={(event) => event.preventDefault()}>
                    Dashboard
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Pers GPS
                </li>
              </ol>
            </nav>
          </div>

          <h3 className="page-title"> GPS </h3>

          <Card sx={{ minHeight: 800 }}>
            <CardContent>

              <Viewer full terrainProvider={terrainProvider}>
                <Entity
                  position={this.props.live.position}
                  point={pointGraphics}
                  name="Position"
                >
                  <EntityDescription>
                    <h2> {this.props.username}</h2>
                  </EntityDescription>
                </Entity>
              </Viewer>

            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  }
}
