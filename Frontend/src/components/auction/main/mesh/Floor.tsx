import React, { useRef, useEffect } from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

interface FloorProps {
  position: [number, number, number];
  pushMesh: (mesh: THREE.Mesh) => void;
}

const Floor: React.FC<FloorProps> = ({ position, pushMesh }) => {
  const mesh = useRef<THREE.Mesh>(null);

  const [floorTexture, normalMap] = useLoader(THREE.TextureLoader, [
    "/auction/material/rug_basecolor.jpg",
    "/auction/material/rug_normal.jpg",
  ]);
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.offset.set(1, 1);
  floorTexture.repeat.set(3, 3);
  floorTexture.needsUpdate = true;
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
      <meshStandardMaterial map={floorTexture} normalMap={normalMap} />
    </mesh>
  );
};

export default Floor;
