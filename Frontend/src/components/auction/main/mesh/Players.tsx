import React, { useRef, useMemo, useState, useEffect } from "react";

import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import { useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { action } from "components/auction/main/mesh/Player";
import { playersInfo } from "store/auction";

interface PlayersProps {
  info: playersInfo;
  userNum: number;
  characters: React.MutableRefObject<playersInfo[]>;
}

const Players: React.FC<PlayersProps> = ({ info, userNum, characters }) => {
  const gltf = useLoader(GLTFLoader, "/auction/model/character.glb");
  const actions = useRef<action>({
    handsup: null,
    walk: null,
    sitdown: null,
    standup: null,
    normal: null,
  });
  const [statusChange, setStatusChange] = useState<string>("");
  useEffect(() => {
    setStatusChange(info.status !== "SITDOWN" ? info.status : "sit");
  }, [info.status]);
  const character = useMemo(() => {
    return clone(gltf.scene);
  }, []);
  const animations = useMemo(() => {
    const animations = gltf.animations.map((clip) => clip.clone());
    return animations;
  }, []);

  const mixer = new THREE.AnimationMixer(character.children[0]);

  for (let i = 0; i < animations.length; i++) {
    const action = mixer.clipAction(animations[i]);
    const name = action.getClip().name;
    if (name === "handsup") {
      action.repetitions = 1;
      action.clampWhenFinished = true;
      actions.current.handsup = action;
    }
    if (name === "standup") {
      action.repetitions = 1;
      action.clampWhenFinished = true;
      actions.current.standup = action;
    }
    if (name === "sitdown") {
      action.repetitions = 1;
      action.clampWhenFinished = true;
      actions.current.sitdown = action;
    }
    if (name === "default") {
      actions.current.normal = action;
    }
    if (name === "walk") {
      actions.current.walk = action;
    }
  }

  console.log(info);
  useFrame((state, delta) => {
    mixer.update(delta);
    character.children[0].position.x = info.x;
    character.children[0].position.y = info.y;
    character.children[0].position.z = info.z;
    character.children[0].rotation.x = info.rotation_x;
    character.children[0].rotation.y = info.rotation_y;
    character.children[0].rotation.z = info.rotation_z;

    if (info.status === "DEFAULT") {
      actions.current.walk?.stop();
      actions.current.normal?.play();
    } else if (info.status === "WALK") {
      actions.current.normal?.stop();
      actions.current.walk?.play();
    } else if (info.status === "SITDOWN") {
      actions.current.normal?.stop();
      actions.current.walk?.stop();
      if (statusChange !== "sit") actions.current.sitdown?.play();
    } else if (info.status === "STANDUP") {
      actions.current.sitdown?.stop();
      actions.current.standup?.play();
    } else if (info.status === "HANDSUP") {
      actions.current.handsup?.play();
      console.log(info.status);
    }
  });

  return (
    <>
      {characters.current.find((c) => c.nickname === info.nickname) && (
        <primitive object={character} />
      )}
    </>
  );
};

export default Players;
