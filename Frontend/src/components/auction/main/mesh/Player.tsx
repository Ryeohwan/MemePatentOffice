import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";

interface PlayerProps {
  moving: React.MutableRefObject<Boolean>;
  sitting: React.MutableRefObject<Boolean>;
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
}

const Player: React.FC<PlayerProps> = ({
  moving,
  sitting,
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
}) => {
  const glb = useLoader(GLTFLoader, "/auction/model/arh.glb"); // 나중에 선택해서 가져오는 코드로 바꾸기
  const raycaster = new THREE.Raycaster();

  player.current = glb.scene.children[0];
  glb.scene.traverse((child) => {
    if (child.isObject3D) {
      child.castShadow = true;
    }
  });
  const mixer = new THREE.AnimationMixer(player.current);
  const normal = mixer.clipAction(glb.animations[0]);
  const handsup = mixer.clipAction(glb.animations[1]);
  handsup.repetitions = 1;
  handsup.clampWhenFinished = true;
  const sitdown = mixer.clipAction(glb.animations[2]);
  sitdown.repetitions = 1;
  sitdown.clampWhenFinished = true;
  const standup = mixer.clipAction(glb.animations[3]);
  standup.clampWhenFinished = true;
  const walk = mixer.clipAction(glb.animations[4]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(player.current); // object는 Object3D 객체
    box.setFromObject(player.current);
    box.getCenter(player.current.position);
    box.applyMatrix4(player.current.matrixWorld);
    const height = box.max.y - box.min.y;
    playerPosition.current = new THREE.Vector3(13, height / 2, 29);
    camera.current.lookAt(player.current.position);
  }, []);

  useEffect(() => {
    player.current.position.x = playerPosition.current.x;
    player.current.position.y = playerPosition.current.y;
    player.current.position.z = playerPosition.current.z;
    player.current.rotation.y += Math.PI;
  }, []);

  useFrame((state, delta) => {
    mixer.update(delta);
    const direction = new THREE.Vector3(
      player.current.rotation.x,
      player.current.rotation.y,
      player.current.rotation.z
    );
    direction.normalize();
    raycaster.set(player.current.position, direction);
    const intersects = raycaster.intersectObjects(tableAndChairs.current);
    for (const item of intersects) {
      if (item.distance < 0.2) {
        moving.current = false;
        walk.stop();
      }
    }

    if (!moving.current && !sitting.current) {
      normal.play();
    } else if (moving.current) {
      normal.stop();
      walk.play();
      const angle = Math.atan2(
        clickPosition.current.z - player.current.position.z,
        clickPosition.current.x - player.current.position.x
      );
      player.current.position.x += Math.cos(angle) * 0.05;
      player.current.position.z += Math.sin(angle) * 0.05;

      if (
        Math.abs(clickPosition.current.x - player.current.position.x) < 0.03 &&
        Math.abs(clickPosition.current.z - player.current.position.z) < 0.03
      ) {
        moving.current = false;
        walk.stop();
      }
      camera.current.position.x = cameraPosition.x + player.current.position.x;
      camera.current.position.z = cameraPosition.z + player.current.position.z;
    } else if (sitting.current) {
      if (biddingSubmit) {
        handsup.play();
      } else if (sitting.current) {
        sitdown.play();
        playerAnimation.current = standup;
      }
    }
    if (!sitting.current) {
      let isIn;
      chairPoints.current.forEach((chair) => {
        if (
          Math.abs(player.current.position.x - chair.position.x) < 0.5 &&
          Math.abs(player.current.position.z - chair.position.z) < 0.5
        ) {
          canSit();
          chairPoint.current = chair;
          isIn = true;
          playerAnimation.current = sitdown;
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
