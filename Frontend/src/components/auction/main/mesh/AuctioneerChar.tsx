import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";

const AuctioneerChar: React.FC = ({
}) => {
  const glb = useLoader(GLTFLoader, "/auction/model/seoyoojin.glb");
  const auctioneer = glb.scene.children[0];
  glb.scene.traverse((child) => {
    if (child.isObject3D) {
      child.castShadow = true;
    }
  });
  const mixer = new THREE.AnimationMixer(auctioneer);
  const normal = mixer.clipAction(glb.animations[1]);
  const walk = mixer.clipAction(glb.animations[2]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(auctioneer); // object는 Object3D 객체
    box.setFromObject(auctioneer);
    box.getCenter(auctioneer.position);
    box.applyMatrix4(auctioneer.matrixWorld);
    const height = box.max.y - box.min.y;
    auctioneer.position.x = -3
    auctioneer.position.y = height / 2 + 1.4
    auctioneer.position.z = -25
  }, []);


  useFrame((state, delta) => {
    mixer.update(delta);
    normal.play()
  });

  return <primitive object={glb.scene} />;
};

export default AuctioneerChar;
