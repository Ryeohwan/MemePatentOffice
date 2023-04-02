import React, { useState, useMemo, useEffect } from "react";

import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { playersInfo } from "store/auction";

interface PlayersProps {
  info: playersInfo;
  userNum: number;
}

const Players: React.FC<PlayersProps> = ({ info, userNum }) => {
  const glb = useLoader(GLTFLoader, "/auction/model/character.glb") as GLTF;

  const character = useMemo(() => {
    // const clone = glb.scene.clone();
    // return clone;
    const character = new THREE.Group()
      character.add(glb.scene)
      character.children.push(glb.scene.children[0].clone())
      return character.children[0]
  }, []);

  const characterPosition = useMemo(() => {
    if (character) {
      const position = {x: info.x, y:info.y, z:info.z}
      if (position) {
        return new THREE.Vector3(position.x, position.y, position.z);
      }
    }
    return new THREE.Vector3();
  }, [info]);

  useEffect(() => {
    character.children[0].position.x = characterPosition.x;
    character.children[0].position.y = characterPosition.y;
    character.children[0].position.z = characterPosition.z;
  }, [characterPosition]);

  return <primitive object={character} />;
};

export default Players;
