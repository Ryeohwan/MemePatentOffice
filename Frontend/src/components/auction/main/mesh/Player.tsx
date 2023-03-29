import React, { useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/configStore";
import { auctionActions } from "store/auction";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";

interface PlayerProps {
  clickPosition: React.MutableRefObject<THREE.Vector3>;
  playerPosition: React.MutableRefObject<THREE.Vector3>;
  chairPoints: React.MutableRefObject<THREE.Mesh[]>;
  player: React.MutableRefObject<THREE.Object3D>;
  camera: React.MutableRefObject<
    THREE.OrthographicCamera | THREE.PerspectiveCamera
  >;
  cameraPosition: THREE.Vector3;
  canSit: () => void;
  cantSit: () => void;
  chairPoint: React.MutableRefObject<THREE.Mesh>;
  playerAnimation: React.MutableRefObject<THREE.AnimationAction | undefined>;
  tableAndChairs: React.MutableRefObject<THREE.Mesh[]>;
  biddingSubmit: boolean;
  isSitting: React.MutableRefObject<boolean>;
}


type action = {
  handsup: THREE.AnimationAction | null;
  walk: THREE.AnimationAction | null;
  sitdown: THREE.AnimationAction | null;
  standup: THREE.AnimationAction | null;
  normal: THREE.AnimationAction | null;
};

const Player: React.FC<PlayerProps> = ({
  clickPosition,
  playerPosition,
  player,
  camera,
  cameraPosition,
  chairPoints,
  canSit,
  cantSit,
  chairPoint,
  playerAnimation,
  tableAndChairs,
  biddingSubmit,
  isSitting,
}) => {
  const disptach = useDispatch();
  const playerState = useSelector<RootState, number>(
    (state) => state.auction.playerState
  );
  const glb = useLoader(GLTFLoader, "/auction/model/character.glb");
  const actions = useRef<action>({
    handsup: null,
    walk: null,
    sitdown: null,
    standup: null,
    normal: null,
  });
  player.current = glb.scene.children[0];
  glb.scene.traverse((child) => {
    if (child.isObject3D) {
      child.castShadow = true;
    }
  });

  const mixer = new THREE.AnimationMixer(player.current);

  for (let i = 0; i < glb.animations.length; i++) {
    const action = mixer.clipAction(glb.animations[i]);
    const name = action.getClip().name;

    if (name === "handsup") {
      action.repetitions = 1;
      action.clampWhenFinished = true;
      actions.current.handsup = action;
    }
    if (name === "standup") {
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
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(player.current); // object는 Object3D 객체
    box.setFromObject(player.current);
    box.getCenter(player.current.position);
    box.applyMatrix4(player.current.matrixWorld);
    const height = box.max.y - box.min.y;
    playerPosition.current = new THREE.Vector3(13, height / 2, 29);
    camera.current.lookAt(player.current.position);

    player.current.position.x = playerPosition.current.x;
    player.current.position.y = playerPosition.current.y;
    player.current.position.z = playerPosition.current.z;
    player.current.rotation.y += Math.PI;
  }, []);
  console.log(playerState)
  useFrame((state, delta) => {
    mixer.update(delta);
    if (playerState === 0) {
      if (actions.current.normal) actions.current.normal.play();
    } else if (playerState === 1) {
      if (actions.current.normal) actions.current.normal.stop();
      if (actions.current.walk) actions.current.walk.play();
      const angle = Math.atan2(
        clickPosition.current.z - player.current.position.z,
        clickPosition.current.x - player.current.position.x
      );
      player.current.position.x += Math.cos(angle) * 0.06;
      player.current.position.z += Math.sin(angle) * 0.06;

      if (
        Math.abs(clickPosition.current.x - player.current.position.x) < 0.03 &&
        Math.abs(clickPosition.current.z - player.current.position.z) < 0.03
      ) {
        disptach(auctionActions.controlPlayerState(0));
        
      }
      camera.current.position.x = cameraPosition.x + player.current.position.x;
      camera.current.position.z = cameraPosition.z + player.current.position.z;
    } else if (playerState === 2) {
      clickPosition.current = player.current.position;
      if (actions.current.walk) actions.current.walk.stop();

      if (biddingSubmit) {
        if (actions.current.handsup) actions.current.handsup.play();
      }
      if (actions.current.sitdown && !isSitting.current) {
        actions.current.sitdown.play();
        isSitting.current = true;
      }
      if (actions.current.standup)
        playerAnimation.current = actions.current.standup;
    }
    if (playerState !== 2) {
      if (actions.current.sitdown) {
        playerAnimation.current = actions.current.sitdown;
      }
      let isIn;
      chairPoints.current.forEach((chair) => {
        if (
          Math.abs(player.current.position.x - chair.position.x) < 0.5 &&
          Math.abs(player.current.position.z - chair.position.z) < 0.5
        ) {
          canSit();
          chairPoint.current = chair;
          isIn = true;
          if (actions.current.sitdown)
            playerAnimation.current = actions.current.sitdown;
        }
      });
      if (!isIn) {
        cantSit();
      }
    }
  });

  return <primitive object={glb.scene} />;
};

export default Player;
