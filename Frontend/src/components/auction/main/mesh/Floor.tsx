import React, { useRef, useEffect } from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

interface FloorProps {
  position: [number, number, number];
  pushMesh: (mesh: THREE.Mesh) => void;
}

const Floor: React.FC<FloorProps> = ({ position, pushMesh }) => {
  const mesh = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (mesh.current) {
      mesh.current.name = "Floor";
      pushMesh(mesh.current);
    }
  }, []);
  return (
    <mesh
      receiveShadow
      position={position}
      ref={mesh}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[30, 60]} />
      {/* <meshStandardMaterial map={floorTexture} normalMap={normalMap} /> */}
      <meshStandardMaterial color="#D0D0D0" />
    </mesh>
  );
};

export default Floor;
