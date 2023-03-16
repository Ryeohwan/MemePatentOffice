import React, { useRef, useEffect } from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

interface FloorProps {
  position: [number, number, number];
  pushMesh: (mesh: THREE.Mesh) => void;
}

const Floor: React.FC<FloorProps> = ({ position, pushMesh }) => {
  const mesh = useRef<THREE.Mesh>(null);

  const floorTexture = useLoader(
    THREE.TextureLoader,
    "/auction/material/grid.png"
  );
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.x = 1;
  floorTexture.repeat.y = 1

  useEffect(() => {
    if (mesh.current) {
      mesh.current.name = "Floor";
      pushMesh(mesh.current);
    }
  }, []);

  return (
    <mesh position={position} ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[30, 40]} />
      <meshStandardMaterial map={floorTexture} />
    </mesh>
  );
};

export default Floor;
