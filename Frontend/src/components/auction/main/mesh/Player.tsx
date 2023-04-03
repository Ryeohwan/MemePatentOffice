import React, { useEffect, useMemo, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/configStore";
import { auctionActions } from "store/auction";
import { WebSocketProps } from "type";

import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import { playersInfo } from "store/auction";

interface PlayerProps extends WebSocketProps {
  characters: React.MutableRefObject<playersInfo[]>;
  clickPosition: React.MutableRefObject<THREE.Vector3>;
  playerPosition: React.MutableRefObject<THREE.Vector3>;
  chairPoints: React.MutableRefObject<THREE.Mesh[]>;
  player: React.MutableRefObject<THREE.Object3D>;
  camera: React.MutableRefObject<
    THREE.OrthographicCamera | THREE.PerspectiveCamera
  >;
  cameraPosition: THREE.Vector3;
  canSitHandler: (state: boolean) => void;
  chairPoint: React.MutableRefObject<THREE.Mesh>;
  playerAnimation: React.MutableRefObject<THREE.AnimationAction | undefined>;
  tableAndChairs: React.MutableRefObject<THREE.Mesh[]>;
  isSitting: React.MutableRefObject<boolean>;
}

export type action = {
  handsup: THREE.AnimationAction | null;
  walk: THREE.AnimationAction | null;
  sitdown: THREE.AnimationAction | null;
  standup: THREE.AnimationAction | null;
  normal: THREE.AnimationAction | null;
};

const Player: React.FC<PlayerProps> = ({
  characters,
  clickPosition,
  playerPosition,
  player,
  camera,
  cameraPosition,
  chairPoints,
  canSitHandler,
  chairPoint,
  playerAnimation,
  tableAndChairs,
  isSitting,
  auctionId,
  client,
}) => {
  const dispatch = useDispatch();
  const status = useSelector<RootState, string>(
    (state) => state.auction.status
  );
  const hasChange = useRef<boolean>(false);
  const playerState = useSelector<RootState, number>(
    (state) => state.auction.playerState
  );

  const actions = useRef<action>({
    handsup: null,
    walk: null,
    sitdown: null,
    standup: null,
    normal: null,
  });

  const gltf = useLoader(GLTFLoader, "/auction/model/character.glb");
  const character = useMemo(() => {
    return clone(gltf.scene);
  }, [gltf]);

  const animations = useMemo(() => {
    const animations = gltf.animations.map((clip) => clip.clone());
    return animations;
  }, []);

  player.current = character.children[0];
  const mixer = new THREE.AnimationMixer(character.children[0]);

  // 애니메이션 지정
  for (let i = 0; i < animations.length; i++) {
    const action = mixer.clipAction(animations[i]);
    const name = action.getClip().name;
    if (name === "handsup") {
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

  useFrame((state, delta) => {
    // console.log(state)
    mixer.update(delta);
    // console.log(character.children[0].position)
    // console.log(character.children[0])
    client.current?.publish({
      destination: "/pub/character",
      body: JSON.stringify({
        auctionId: auctionId,
        nickname: JSON.parse(sessionStorage.getItem("user")!).nickname,
        x: player.current.position.x,
        y: player.current.position.y,
        z: player.current.position.z,
        rotation_x: player.current.rotation.x,
        rotation_y: player.current.rotation.y,
        rotation_z: player.current.rotation.z,
        status: status,
      }),
    });

    if (playerState === 0) {
      if (status !== "DEFAULT")
        dispatch(auctionActions.changeStatus("DEFAULT"));
      if (actions.current.normal) actions.current.normal.play();
      let isIn;
      chairPoints.current.forEach((chair) => {
        if (
          Math.abs(player.current.position.x - chair.position.x) < 0.6 &&
          Math.abs(player.current.position.z - chair.position.z) < 0.6
        ) {
          if (
            characters.current.find((c) => {
              return (
                c.x === chair.position.x - 0.3 &&
                c.y === chair.position.y + 0.8 &&
                c.z === chair.position.z + 0.8
                );
              })
              ) {
                console.log(1)
                canSitHandler(false)
                return
              }
          if (!hasChange.current) {
              canSitHandler(true);
            hasChange.current = true;
          }
          chairPoint.current = chair;
          isIn = true;
          if (actions.current.sitdown) {
            playerAnimation.current = actions.current.sitdown;
          }
        }
      });
      if (!isIn) {
        hasChange.current = false;
        canSitHandler(false);
      }
    } else if (playerState === 1) {
      if (status !== "WALK") dispatch(auctionActions.changeStatus("WALK"));
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
        dispatch(auctionActions.controlPlayerState(0));
      }
      camera.current.position.x = cameraPosition.x + player.current.position.x;
      camera.current.position.z = cameraPosition.z + player.current.position.z;
    } else if (playerState === 2) {
      if (status !== "SITDOWN")
        dispatch(auctionActions.changeStatus("SITDOWN"));
      clickPosition.current = player.current.position.clone();
      actions.current.walk?.stop();
      actions.current.normal?.stop();
      actions.current.sitdown?.play();
      setTimeout(() => {
        dispatch(auctionActions.controlPlayerState(5));
      }, 1200);
      if (actions.current.standup)
        playerAnimation.current = actions.current.standup;
    } else if (playerState === 3) {
      dispatch(auctionActions.changeStatus("STANDUP"));
      actions.current.standup?.play();
    } else if (playerState === 4) {
      dispatch(auctionActions.changeStatus("HANDSUP"));
      actions.current.handsup?.play();
    } else if (playerState === 5) {
      if (status !== "SITDOWN")
        dispatch(auctionActions.changeStatus("SITDOWN"));
    }
    if (playerState !== 2) {
      if (actions.current.sitdown) {
        playerAnimation.current = actions.current.sitdown;
      }
    }
  });
  return <primitive object={character} />;
};

export default Player;
