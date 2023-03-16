import React, {useEffect} from "react";
import * as THREE from 'three'
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
interface ChairProps {
    position : [number, number, number],
}

const Chair: React.FC<ChairProps> = ({position}) => {
  const glb = useLoader(GLTFLoader, "/auction/model/chair.glb"); // 나중에 선택해서 가져오는 코드로 바꾸기
  const texture = useLoader(THREE.TextureLoader, '/auction/material/wood.jpg')
  const chair = glb.scene.children[0];
  console.log(chair)
//   chair.material = new THREE.MeshStandardMaterial({map:texture})
useEffect(() => {
    const box = new THREE.Box3().setFromObject(chair); // object는 Object3D 객체
    box.setFromObject(chair);
    box.getCenter(chair.position);
    box.applyMatrix4(chair.matrixWorld);
    const height = box.max.y - box.min.y;
    chair.position.y = height/2
  }, []);

  return <primitive object={glb.scene} />;
};

export default Chair;
