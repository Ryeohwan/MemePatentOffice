import React, { useState, useCallback, useRef } from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import Box from "components/auction/main/mesh/Box";
import Floor from "components/auction/main/mesh/Floor";
import Player from "components/auction/main/mesh/Player";
import Chair from "./mesh/Chair";

interface SceneProps {
  width: number;
  height: number;
}

const Scene: React.FC<SceneProps> = ({ width, height }) => {
  const [meshes, setMeshes] = useState<THREE.Mesh[]>([]);
  const raycaster = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouse = useRef<THREE.Vector2>(new THREE.Vector2());
  const isPressed = useRef(false);
  const clickPosition = useRef<THREE.Vector3>(new THREE.Vector3());

  const player = useRef<THREE.Object3D>(new THREE.Object3D());
  const playerPosition = useRef<THREE.Vector3>(new THREE.Vector3());
  const [moving, setMoving] = useState(false);
  const [sitting, setSitting] = useState(false);

  // 카메라
  const cameraPosition = new THREE.Vector3(13, 10, 25);
  const camera = useRef<THREE.OrthographicCamera>(
    new THREE.OrthographicCamera(
      -(width / height),
      width / height,
      1,
      -1,
      -1000,
      1000
    )
  );

  // 이벤트
  const createdHandler = () => {
    camera.current.position.set(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );
    camera.current.zoom = 25;
    camera.current.updateProjectionMatrix();
  };

  const stop = () => {
    setMoving(false);
  };

  const pushMesh = (mesh: THREE.Mesh) => {
    setMeshes((prev) => [...prev, mesh]);
  };
  const checkIntersects = () => {
    const intersects = raycaster.current.intersectObjects(meshes);
    for (const item of intersects) {
      if (item.object.name === "Floor") {
        setMoving(false);
        clickPosition.current.x = item.point.x; // 하나의 함수 (0,0,0)
        clickPosition.current.y = 0.01;
        clickPosition.current.z = item.point.z;
        setMoving(true);
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
    if (mouse.current) {
      mouse.current.x = (e.clientX / width) * 2 - 1;
      mouse.current.y = -((e.clientY / height) * 2 - 1);
    }
  }, []);

  const raycasting = () => {
    if (mouse.current) {
      raycaster.current.setFromCamera(mouse.current, camera.current);
      checkIntersects();
    }
  };
  const mouseDownHandler = (e: React.MouseEvent) => {
    calculateMousePosition(e);
    isPressed.current = true;
  };
  const mouseUpHandler = (e: React.MouseEvent) => {
    calculateMousePosition(e);
    raycasting();
    isPressed.current = false;
  };
  return (
    <Canvas
      style={{ height: "100vh" }}
      camera={camera.current}
      dpr={window.devicePixelRatio > 1 ? 2 : 1}
      shadows="soft"
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onCreated={createdHandler}
    >
      <ambientLight />
      <Floor position={[0, 0, 0]} pushMesh={pushMesh} />
      <Player
        moving={moving}
        sitting={sitting}
        clickPosition={clickPosition}
        stop={stop}
        playerPosition={playerPosition}
        player={player}
        camera={camera}
        cameraPosition={cameraPosition}
      />
      <Box position={[0, 15, 0]} />
      <Chair position={[0, 0, 0]} />
    </Canvas>
  );
};

export default Scene;
