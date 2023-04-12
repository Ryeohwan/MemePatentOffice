import React, { useRef, useEffect } from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

interface BlockProps {
  position: [number, number, number];
}

const Box: React.FC<BlockProps> = ({ position }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    THREE.TextureLoader,
    [
      "/auction/material/wall/Wall_Interior_001_basecolor.jpg",
      "/auction/material/wall/Wall_Interior_001_height.png",
      "/auction/material/wall/Wall_Interior_001_normal.jpg",
      "/auction/material/wall/Wall_Interior_001_roughness.jpg",
      "/auction/material/wall/Wall_Interior_001_ambientOcclusion.jpg",
    ]
  );
  // colorMap.wrapS = THREE.RepeatWrapping;
  // colorMap.wrapT = THREE.RepeatWrapping;
  // blockTexture.repeat.x = 2;
  // blockTexture.repeat.y = 2;
  useEffect(() => {
    if (mesh.current) {
      mesh.current.name = "block";
    }
  }, []);

  return (
    <mesh receiveShadow position={position} ref={mesh}>
      <boxGeometry args={[30, 20, 60]} />
      <meshStandardMaterial
        side={THREE.BackSide}
        map={colorMap}
        // displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
    </mesh>
  );
};

export default Box;
