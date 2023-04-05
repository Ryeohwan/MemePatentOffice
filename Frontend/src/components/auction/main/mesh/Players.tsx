import React, { useRef, useMemo, useState, useEffect } from "react";

import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import { useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { action } from "components/auction/main/mesh/Player";
import { playersInfo } from "store/auction";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

interface PlayersProps {
  info: playersInfo;
  userNum: number;
  characters: React.MutableRefObject<playersInfo[]>;
  changeHandler: () => void;
}

const Players: React.FC<PlayersProps> = ({
  info,
  userNum,
  characters,
  changeHandler,
}) => {
  const font = useLoader(FontLoader, "Gmarket Sans TTF Medium_Regular.json");
  const text = useMemo(() => {
    const geometry = new TextGeometry(info.nickname, {
      font: font,
      size: 0.3,
      height: 0.04,
      curveSegments: 12,
    });
    const material = new THREE.MeshBasicMaterial({ color: "#000000" });
    const newMesh = new THREE.Mesh(geometry, material);
    return newMesh;
  }, []);

  const gltf = useLoader(GLTFLoader, "/auction/model/character.glb");
  const actions = useRef<action>({
    handsup: null,
    walk: null,
    sitdown: null,
    standup: null,
    normal: null,
  });
  const [isSitting, setIsSitting] = useState<boolean>(false);
  useEffect(() => {
    changeHandler();
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
      actions.current.handsup = action;
    } else if (name === "standup") {
      action.repetitions = 1;
      action.clampWhenFinished = true;
      actions.current.standup = action;
    } else if (name === "sitdown") {
      action.repetitions = 1;
      action.clampWhenFinished = true;
      actions.current.sitdown = action;
    } else if (name === "default") {
      actions.current.normal = action;
    } else if (name === "walk") {
      actions.current.walk = action;
    }
  }
  useFrame((state, delta) => {
    character.children[0].position.x = info.x;
    character.children[0].position.y = info.y;
    character.children[0].position.z = info.z;
    character.children[0].rotation.x = info.rotation_x;
    character.children[0].rotation.y = info.rotation_y;
    character.children[0].rotation.z = info.rotation_z;
    const box2 = new THREE.Box3().setFromObject(text); // object는 Object3D 객체
    box2.setFromObject(text);
    box2.getCenter(text.position);
    box2.applyMatrix4(text.matrixWorld);
    const textwidth = box2.max.x - box2.min.x;

    text.position.x = info.x - textwidth / 2;
    text.position.y = info.y + 1.2
    text.position.z = info.z;

    if (info.status === "DEFAULT") {
      if (actions.current.walk?.isRunning()) actions.current.walk?.stop();
      actions.current.normal?.play();
    } else if (info.status === "WALK") {
      if (actions.current.normal?.isRunning()) actions.current.normal?.stop();
      actions.current.walk?.play();
    } else if (info.status === "SITDOWN") {
      if (actions.current.normal?.isRunning()) actions.current.normal?.stop();
      if (actions.current.walk?.isRunning()) actions.current.walk?.stop();
      if (actions.current.handsup?.isRunning()) actions.current.handsup?.stop();
      if (!isSitting) {
        setTimeout(() => {
          setIsSitting(true);
        }, 1200);
        actions.current.sitdown?.play();
      }
    } else if (info.status === "STANDUP") {
      if (actions.current.handsup?.isRunning()) actions.current.handsup?.stop();
      if (actions.current.sitdown?.isRunning()) actions.current.sitdown?.stop();
      actions.current.standup?.play();
      if (isSitting) {
        setIsSitting(false);
      }
    } else if (info.status === "HANDSUP") {
      actions.current.sitdown?.stop();
      actions.current.handsup?.play();
    }
    mixer.update(delta);
  });

  return (
    <>
      {characters.current.find((c) => c.nickname === info.nickname) && (
        <group>
          <primitive object={text}/>
          <primitive object={character} />
        </group>
      )}
    </>
  );
};

export default Players;
