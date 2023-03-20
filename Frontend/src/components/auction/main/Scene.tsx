import React, { useState, useCallback, useRef, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import Box from "components/auction/main/mesh/Box";
import Floor from "components/auction/main/mesh/Floor";
import Player from "components/auction/main/mesh/Player";
import Chair from "components/auction/main/mesh/Chair";
import Table from "components/auction/main/mesh/Table";
import Auctioneer from "components/auction/main/mesh/AuctioneerChar";
import Border from "components/auction/main/mesh/Border";

import styles from "components/auction/main/Scene.module.css";

interface SceneProps {
  width: number;
  height: number;
  canSit: () => void;
  cantSit: () => void;
  player: React.MutableRefObject<THREE.Object3D>;
  chairPoint: React.MutableRefObject<THREE.Mesh>;
  playerAnimation: React.MutableRefObject<THREE.AnimationAction | undefined>;
  sitting: React.MutableRefObject<Boolean>;
  camera: React.MutableRefObject<THREE.OrthographicCamera>;
}

const Scene: React.FC<SceneProps> = ({
  width,
  height,
  canSit,
  cantSit,
  player,
  chairPoint,
  playerAnimation,
  sitting,
  camera
}) => {
  const canvas = useRef<any>();
  const [meshes, setMeshes] = useState<THREE.Mesh[]>([]);
  const tableAndChairs = useRef<THREE.Mesh[]>([])
  const table = useRef<THREE.Object3D>(new THREE.Object3D());
  const chairs = useRef<Array<THREE.Mesh>>([]);
  const raycaster = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouse = useRef<THREE.Vector2>(new THREE.Vector2());
  const clickPosition = useRef<THREE.Vector3>(new THREE.Vector3());
  const chairPoints = useRef<Array<THREE.Mesh>>([]);

  const playerPosition = useRef<THREE.Vector3>(new THREE.Vector3());
  const moving = useRef(false);

  // 카메라
  const cameraPosition = new THREE.Vector3(13, 10, 25);
  

  useEffect(() => {
    if (document.querySelector("#three-canvas")) {
      canvas.current = document.querySelector("#three-canvas");
    }
  }, []);
  // 이벤트
  const createdHandler = () => {
    camera.current.position.set(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );
    camera.current.zoom = 35;
    camera.current.updateProjectionMatrix();
  };

  const pushMesh = (mesh: THREE.Mesh) => {
    setMeshes((prev) => [...prev, mesh]);
  };

  const checkIntersects = () => {
    const intersects = raycaster.current.intersectObjects(meshes);
    for (const item of intersects) {
      if (item.object.name === "Floor") {
        clickPosition.current.x = item.point.x; // 하나의 함수 (0,0,0)
        clickPosition.current.y = 0.01;
        clickPosition.current.z = item.point.z;
        player.current.lookAt(
          item.point.x,
          player.current.position.y,
          item.point.z
        );
        break;
      }
    }
  };

  const calculateMousePosition = useCallback((e: React.MouseEvent) => {
    if (mouse.current && canvas.current) {
      mouse.current.x = (e.pageX / canvas.current.clientWidth) * 2 - 1;
      mouse.current.y = -((e.pageY / canvas.current.clientHeight) * 2 - 1);
    }
  }, []);

  const raycasting = () => {
    if (mouse.current) {
      raycaster.current.setFromCamera(mouse.current, camera.current);
      checkIntersects();
    }
  };

  const mouseUpHandler = (e: React.MouseEvent) => {
    if (!sitting.current) {
      calculateMousePosition(e);
      raycasting();
      moving.current = true;
    }
  };
  return (
    <Canvas
      id="three-canvas"
      className={styles.scene}
      camera={camera.current}
      dpr={window.devicePixelRatio > 1 ? 2 : 1}
      shadows="soft"
      onMouseUp={mouseUpHandler}
      onCreated={createdHandler}
    >
      <ambientLight intensity={0.7} />
      <directionalLight
        intensity={1}
        color="white"
        position={[15, 10, 10]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-100, 100, 100, -100]}
        />
      </directionalLight>

      <Floor position={[0, 0.01, 0]} pushMesh={pushMesh} />
      <Player
        moving={moving}
        sitting={sitting}
        clickPosition={clickPosition}
        playerPosition={playerPosition}
        player={player}
        camera={camera}
        cameraPosition={cameraPosition}
        canSit={canSit}
        cantSit={cantSit}
        chairPoints={chairPoints}
        chairPoint={chairPoint}
        playerAnimation={playerAnimation}
        tableAndChairs={tableAndChairs}
      />
      <Box position={[0, 15, 0]} />
      <Table table={table} pushMesh={pushMesh} tableAndChairs={tableAndChairs}/>
      <Chair chairs={chairs} chairPoints={chairPoints} tableAndChairs={tableAndChairs}/>
      <Auctioneer />
      <Border />
    </Canvas>
  );
};
export default Scene;
