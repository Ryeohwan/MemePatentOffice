import React, { useRef } from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

interface FloorProps {
  position: [number, number, number];
  color: string;
}

const Box: React.FC<FloorProps> = ({ position }) => {
  const mesh = useRef<THREE.Mesh>(null);

  const floorTexture = useLoader(THREE.TextureLoader, '/auction/material/grid.png')
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.x = 1;
  floorTexture.repeat.y = 1;

  return (
    <mesh position={position} ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <boxGeometry args={[30, 40, 20]} />
      <meshStandardMaterial map={floorTexture} side={THREE.BackSide}/>
    </mesh>
  );
};

export default Box;
