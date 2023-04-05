import React, { useRef, useEffect } from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

interface FloorProps {
  position: [number, number, number];
  pushMesh: (mesh: THREE.Mesh) => void;
}

const Floor: React.FC<FloorProps> = ({ position, pushMesh }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    THREE.TextureLoader,
    [
      "/auction/material/floor/Wood_Herringbone_Tiles_002_basecolor.jpg",
      "/auction/material/floor/Wood_Herringbone_Tiles_002_height.png",
      "/auction/material/floor/Wood_Herringbone_Tiles_002_normal.jpg",
      "/auction/material/floor/Wood_Herringbone_Tiles_002_roughness.jpg",
      "/auction/material/floor/Wood_Herringbone_Tiles_002_ambientOcclusion.jpg",
    ]
  );
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
      <meshStandardMaterial
        map={colorMap}
        // displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
      {/* <meshStandardMaterial color="#FFFFFF" /> */}
    </mesh>
  );
};

export default Floor;
