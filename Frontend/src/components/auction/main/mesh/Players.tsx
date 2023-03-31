import React, { useState, useMemo } from "react";

import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { playersInfo } from "store/auction";

interface PlayersProps {
  info: playersInfo;
}

const Players: React.FC<PlayersProps> = ({ info }) => {
  const glb = useLoader(GLTFLoader, "/auction/model/character.glb") as GLTF;

  const character = useMemo(() => {
    const clone = glb.scene.clone();
    return clone;
  }, []);

  const [positions, setPositions] = useState<
    Map<string, { x: number; y: number; z: number }>
  >(new Map());

  const handlePositionUpdate = () => {
    const { nickname, x, y, z } = info;
    setPositions((prevPositions) => {
      const updatedPositions = new Map(prevPositions);
      updatedPositions.set(nickname, { x, y, z });
      return updatedPositions;
    });
  };

  const characterPosition = useMemo(() => {
    if (character) {
      const position = positions.get("nickname");
      if (position) {
        return new THREE.Vector3(position.x, position.y, position.z);
      }
    }
    return new THREE.Vector3();
  }, [positions, info.nickname, character]);


  return <primitive object={character}/>;
};

export default Players;
