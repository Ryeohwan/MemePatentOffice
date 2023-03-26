import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "react-three-fiber";
interface ChairProps {
  chairs: React.MutableRefObject<THREE.Mesh[]>;
  chairPoints: React.MutableRefObject<THREE.Mesh[]>;
  tableAndChairs: React.MutableRefObject<THREE.Mesh[]>;
}

const Chair: React.FC<ChairProps> = ({
  chairs,
  chairPoints,
  tableAndChairs,
}) => {
  const glb = useLoader(GLTFLoader, "/auction/model/chair.glb");
  // const texture = useLoader(THREE.TextureLoader, "/auction/material/wood.jpg");
  const box = new THREE.Box3().setFromObject(glb.scene.children[0]); // object는 Object3D 객체
  box.setFromObject(glb.scene.children[0]);
  box.getCenter(glb.scene.children[0].position);
  box.applyMatrix4(glb.scene.children[0].matrixWorld);
  const chairHeight = box.max.y - box.min.y;

  useEffect(() => {
    for (let i = 0; i < 56; i++) {
      const chair = glb.scene.children[0].clone() as THREE.Mesh;
      chair.material = new THREE.MeshStandardMaterial({
        // map: texture,
        color: "#03A9F4",
      });
      chair.position.set(
        (i % 7)*1.3 - 12,
        chairHeight / 2,
        Math.floor(i / 8) * 5 - 12
      );
      chair.castShadow = true;
      chair.receiveShadow = true;
      chair.rotation.y = Math.PI;
      chairs.current.push(chair);

      const pointMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshStandardMaterial({
          color: "#858585",
          transparent: true,
          opacity: 0.8,
        })
      );
      pointMesh.receiveShadow = true;
      pointMesh.rotation.x = -Math.PI / 2;
      pointMesh.position.set(chair.position.x, 0.1, chair.position.z - 1);
      chairPoints.current.push(pointMesh);
    }
    for (let i = 0; i < 56; i++) {
      const chair = glb.scene.children[0].clone() as THREE.Mesh;
      chair.material = new THREE.MeshStandardMaterial({
        color: "#03A9F4",
      });
      chair.position.set(
        (i % 7)*1.3 + 3,
        chairHeight / 2,
        Math.floor(i / 8) * 5 - 12
      );
      chair.castShadow = true;
      chair.receiveShadow = true;
      chair.rotation.y = Math.PI;
      chairs.current.push(chair);

      const pointMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshStandardMaterial({
          color: "#858585",
          transparent: true,
          opacity: 0.8,
        })
      );
      pointMesh.receiveShadow = true;
      pointMesh.rotation.x = -Math.PI / 2;
      pointMesh.position.set(chair.position.x, 0.1, chair.position.z - 1);
      chairPoints.current.push(pointMesh);
    }
  }, []);

  return (
    <>
      {chairs.current.map((chair, index) => {
        return (
          <primitive key={index} object={chair} position={chair.position} />
        );
      })}
      {chairPoints.current.map((chair, index) => {
        return (
          <primitive key={index} object={chair} position={chair.position} />
        );
      })}
    </>
  );
};
export default Chair;
