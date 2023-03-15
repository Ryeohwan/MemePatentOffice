import React from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import Box from "./geometry/Box";

const Scene : React.FC = () => {
  return (
    <Canvas>
        <ambientLight/>
        <Box position={[0,0,0]} color="blue"/>
    </Canvas>
  );
}

export default Scene