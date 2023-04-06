import React, { useEffect, useMemo, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/configStore";
import { auctionActions } from "store/auction";
import { WebSocketProps } from "type";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import { playersInfo } from "store/auction";
import Nickname from "./Nickname";

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
  seeChatHandler: () => void
  seeChat: boolean
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
  seeChat,
  seeChatHandler
}) => {
  const dispatch = useDispatch();
  const status = useSelector<RootState, string>(
    (state) => state.auction.status
  );
  const hasChange = useRef<boolean>(false);
  const playerState = useSelector<RootState, number>(
    (state) => state.auction.playerState
  );
  const nickname = JSON.parse(sessionStorage.getItem("user")!).nickname;
  const actions = useRef<action>({
    handsup: null,
    walk: null,
    sitdown: null,
    standup: null,
    normal: null,
  });

  const font = useLoader(FontLoader, "Gmarket Sans TTF Medium_Regular.json");
  const text = useMemo(() => {
    const geometry = new TextGeometry(nickname, {
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

    const box2 = new THREE.Box3().setFromObject(text); // object는 Object3D 객체
    box2.setFromObject(text);
    box2.getCenter(text.position);
    box2.applyMatrix4(text.matrixWorld);
    const textwidth = box2.max.x - box2.min.x;

    text.position.x = player.current.position.x - textwidth / 2;
    text.position.y = player.current.position.y + 1.2
    text.position.z = player.current.position.z;

    client.current?.publish({
      destination: "/pub/character",
      body: JSON.stringify({
        auctionId: auctionId,
        nickname: nickname,
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
          Math.abs(player.current.position.x - chair.position.x) < 1 &&
          Math.abs(player.current.position.z - chair.position.z) < 1
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
            canSitHandler(false);
            return;
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
      player.current.position.x += Math.cos(angle) * 0.075;
      player.current.position.z += Math.sin(angle) * 0.075;
      if (
        Math.abs(clickPosition.current.x - player.current.position.x) < 0.03 &&
        Math.abs(clickPosition.current.z - player.current.position.z) < 0.03
      ) {
        dispatch(auctionActions.controlPlayerState(0));
      }
      camera.current.position.x = cameraPosition.x + player.current.position.x;
      camera.current.position.z = cameraPosition.z + player.current.position.z;
    } else if (playerState === 2) {
      hasChange.current = false;
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
      actions.current.sitdown?.stop();
      actions.current.standup?.play();
    } else if (playerState === 4) {
      dispatch(auctionActions.changeStatus("HANDSUP"));
      actions.current.handsup?.play();
    } else if (playerState === 5) {
      if (status !== "SITDOWN")
        dispatch(auctionActions.changeStatus("SITDOWN"));
    }
  });
  return (
    <group>
      <primitive object={text}/>
      <primitive object={character} />
    </group>
  );
};

export default Player;
