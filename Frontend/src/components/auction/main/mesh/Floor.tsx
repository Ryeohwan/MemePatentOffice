import React, { useRef, useEffect } from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

interface FloorProps {
  position: [number, number, number];
  pushMesh: (mesh: THREE.Mesh) => void;
}

const Floor: React.FC<FloorProps> = ({ position, pushMesh }) => {
  const mesh = useRef<THREE.Mesh>(null);
<<<<<<< HEAD

  const [floorTexture, normalMap] = useLoader(THREE.TextureLoader, [
    "/auction/material/floor_Graph_BaseColor.jpg",
    "/auction/material/floor_Graph_Normal.jpg",
  ]);
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.offset.set(1, 1);
  floorTexture.repeat.set(2, 2);
  floorTexture.needsUpdate = true;
=======
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
>>>>>>> origin/develop/frontend
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
<<<<<<< HEAD
      <meshStandardMaterial map={floorTexture} normalMap={normalMap} />
      {/* <meshStandardMaterial color="#D0D0D0" /> */}
=======
      <meshStandardMaterial
        map={colorMap}
        // displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
      {/* <meshStandardMaterial color="#FFFFFF" /> */}
>>>>>>> origin/develop/frontend
    </mesh>
  );
};

export default Floor;
