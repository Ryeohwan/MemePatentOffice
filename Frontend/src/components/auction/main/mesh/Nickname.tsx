import React, { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useFrame } from "react-three-fiber";
interface NicknameProps {
  nickname: string;
  position: { x: number; y: number; z: number };
}

const Nickname: React.FC<NicknameProps> = ({ nickname, position }) => {
  const font = useLoader(FontLoader, "NanumMyeongjo_Regular.json");
  const text = useMemo(() => {
    const geometry = new TextGeometry(nickname, {
      font: font,
      size: 0.2,
      height: 0.01,
      curveSegments: 12,
      // bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 3,
    });
    const material = new THREE.MeshBasicMaterial({ color: "#000000" });
    const newMesh = new THREE.Mesh(geometry, material);
    return newMesh;
  }, []);

  const box = new THREE.Box3().setFromObject(text); // object는 Object3D 객체
  box.setFromObject(text);
  box.getCenter(text.position);
  box.applyMatrix4(text.matrixWorld);
  const textwidth = box.max.x - box.min.x;

  useFrame((state, delta) => {
    text.position.x = position.x - textwidth / 2;
    text.position.y = position.y + 1.2;
    text.position.z = position.z;
  });

  return <primitive object={text} />;
};

export default Nickname;
