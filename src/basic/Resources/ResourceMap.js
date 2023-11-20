import { Viewer, Entity, EntityDescription } from "resium";
import { Cartesian3, createWorldTerrainAsync } from "cesium";
import { Card, CardContent } from "@mui/material";

const pointGraphics = { pixelSize: 10 };
const terrainProvider = createWorldTerrainAsync();

import ResourceData from "./ResourceData.json";
import React from "react";

export default class ResourceMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getPosition = (group) => {
    try {
      let finalPosition = Cartesian3.fromDegrees(
        group.location_coord.lng,
        group.location_coord.lat
      );
      return finalPosition;
    } catch (err) {
      console.log(`Error: ${err}`);

      console.log(
        `Group: ${JSON.stringify(group, null, 2)}\nPosition: ${positionIn}`
      );

      let finalPosition = Cartesian3.fromDegrees(0, 0);

      return finalPosition;
    }
  };

  getLinks = (links) => {
    for (let link of links) {
      return <a href={link.url}> {link.url} </a>;
    }
  };

  render() {
    let groups = Object.values(ResourceData).map((group) => (
      <Entity
        position={this.getPosition(group)}
        point={pointGraphics}
        name={group.name}
      >
        <EntityDescription>
          <h2> {group.name}</h2>
          <p>
            {group.location_name}, {group.location_country}
          </p>
          <p> Links: </p>
          <p> {this.getLinks(group.links)} </p>
          <p> Facebook: </p>
          <a href={group.link_facebook}>{group.link_facebook}</a>
        </EntityDescription>
      </Entity>
    ));

    return (
      <Card variant="outlined">
        <CardContent>
          <h3> Resource Map</h3>
          <br />

          <Card variant="outlined">
            <CardContent>
              <p> DISCLAMER:</p>
              <p>
                {" "}
                Leftist Media Group has not vetted any of the sources on this
                page
              </p>
              <p>
                {" "}
                This dataset is from <link href="MutualAid.Wiki"></link>
                MutualAid.Wiki
              </p>
            </CardContent>
          </Card>

          <Card sx={{ minHeight: 800 }}>
            <CardContent>
              <Viewer full terrainProvider={terrainProvider}>
                {groups}
              </Viewer>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  }
}
