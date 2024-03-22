import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PresentationControls } from "@react-three/drei";
import { extend } from '@react-three/fiber';
import { blue, grey } from "@mui/material/colors";
import { MapView, OpenStreetMapsProvider } from "geo-three";


export class Map extends Component {
  render() {
    return (
      <>
        <h1>Map</h1>
        <div id="canvas-container">
          <Canvas
            camera={{ position: [2, 0, 12.25], fov: 15 }}
            style={{
              backgroundColor: "#808080",
              width: "80vw",
              height: "80vh",
            }}
          >
            <PresentationControls>
              <ambientLight intensity={0.5} />
              <directionalLight color="red" position={[0, 0, 5]} />
            </PresentationControls>
          </Canvas>
        </div>
      </>
    );
  }
}

export default Map;
