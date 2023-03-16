import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";

interface PlayerProps {
  moving: boolean;
  sitting: boolean;
  clickPosition: React.MutableRefObject<THREE.Vector3>;
  playerPosition: React.MutableRefObject<THREE.Vector3>;
  stop: () => void;
  player: React.MutableRefObject<THREE.Object3D>;
  camera: React.MutableRefObject<THREE.OrthographicCamera>;
  cameraPosition: THREE.Vector3
}

const Player: React.FC<PlayerProps> = ({
  moving,
  sitting,
  clickPosition,
  stop,
  playerPosition,
  player,
  camera,
  cameraPosition,
}) => {
  const glb = useLoader(GLTFLoader, "/auction/model/arh.glb"); // 나중에 선택해서 가져오는 코드로 바꾸기
  player.current = glb.scene.children[0];

  const mixer = new THREE.AnimationMixer(player.current);
  const normal = mixer.clipAction(glb.animations[0]);
  const handsup = mixer.clipAction(glb.animations[1]);
  const sitdown = mixer.clipAction(glb.animations[2]);
  const standup = mixer.clipAction(glb.animations[3]);
  const walk = mixer.clipAction(glb.animations[4]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(player.current); // object는 Object3D 객체
    box.setFromObject(player.current);
    box.getCenter(player.current.position);
    box.applyMatrix4(player.current.matrixWorld);
    const height = box.max.y - box.min.y;
    playerPosition.current = new THREE.Vector3(0, height / 2, 0);
    camera.current.lookAt(player.current.position);
  }, []);

  useEffect(() => {
    player.current.position.x = playerPosition.current.x;
    player.current.position.y = playerPosition.current.y;
    player.current.position.z = playerPosition.current.z;
  }, [playerPosition]);

  useFrame((state, delta) => {
    mixer.update(delta);
    if (!moving && !sitting) {
      normal.play();
    } else if (moving) {
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
        stop();
      }
      camera.current.position.x = cameraPosition.x + player.current.position.x;
      camera.current.position.z = cameraPosition.z + player.current.position.z;
    }
  });

  return <primitive object={glb.scene} />;
};

export default Player;
