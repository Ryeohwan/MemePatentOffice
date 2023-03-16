import React, { useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import Floor from "./mesh/Floor";
import Player from "./mesh/Player";

interface SceneProps {
  width: number;
  height: number;
}

const Scene: React.FC<SceneProps> = ({ width, height }) => {
  const [clickPosition, setClickPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );
  const [moving, setMoving] = useState(false);
  const [sitting, setSitting] = useState(false);

  const camera = new THREE.OrthographicCamera(
    -(width / height),
    width / height,
    1,
    -1,
    -1000,
    1000
  );
  const cameraPosition = new THREE.Vector3(13, 10, 25);
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
  camera.lookAt(0, 0.3, 7);
  camera.zoom = 20;
  camera.updateProjectionMatrix();

  return (
    <Canvas
      style={{ height: "100vh" }}
      camera={camera}
      shadows="soft"
    >
      <ambientLight />
      <Floor position={[0, 0, 0]} color="blue" />
      <Player moving={moving} sitting={sitting} clickPosition={clickPosition} />
    </Canvas>
  );
};

export default Scene;
