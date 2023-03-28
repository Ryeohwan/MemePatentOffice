import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "react-three-fiber";
import gsap from "gsap";

interface LandingPanelProps {
  //   panelState: boolean;
  panelState: React.MutableRefObject<boolean>;
  imageRotation: React.MutableRefObject<THREE.Vector3[]>;
  imagePanelsPosition: React.MutableRefObject<THREE.Vector3[]>;
  imagePanels: React.MutableRefObject<THREE.Mesh[]>;
  randomPositionArray: React.MutableRefObject<number[]>;
}

const LandingPanel: React.FC<LandingPanelProps> = ({
  panelState,
  imageRotation,
  imagePanels,
  randomPositionArray,
  imagePanelsPosition,
}) => {
  const images = useLoader(THREE.TextureLoader, [
    "/auction/landingpage/01.png",
    "/auction/landingpage/02.jpg",
    "/auction/landingpage/03.jpg",
    "/auction/landingpage/04.png",
    "/auction/landingpage/05.jpg",
    "/auction/landingpage/06.jpg",
    "/auction/landingpage/07.jpg",
    "/auction/landingpage/08.jpg",
    "/auction/landingpage/09.jpg",
    "/auction/landingpage/10.jpg",
  ]);
  const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
  const planeGeometry = new THREE.PlaneGeometry(0.3, 0.3);
  const isRandom = useRef<boolean>(false)
  const spherePositionArray = (
    sphereGeometry.attributes.position as THREE.BufferAttribute
  ).array;
  for (let i = 0; i < spherePositionArray.length; i++) {
      if (i%3===1){
        randomPositionArray.current.push((Math.random() - 0.5) * 4+2);
    }else if(i%3===2){
        randomPositionArray.current.push((Math.random() - 0.5)*4);
    }
    else{
        randomPositionArray.current.push((Math.random() - 0.5) * 4+5);
    }
  }
  for (let i = 0; i < spherePositionArray.length; i += 3) {
    const texture = images[Math.ceil(Math.random() * 10-1)];
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeometry, material);
    mesh.position.set(
      spherePositionArray[i] + 5,
      spherePositionArray[i + 1]+2,
      spherePositionArray[i + 2]
    );
    mesh.lookAt(5, 2, 0);
    const meshPosition = mesh.position.clone()
    imagePanelsPosition.current.push(meshPosition)
    imagePanels.current.push(mesh);
    const rotation = new THREE.Vector3(
      mesh.rotation.x,
      mesh.rotation.y,
      mesh.rotation.z
    );
    imageRotation.current.push(rotation);
  }

  useFrame((state, delta) => {
    if (panelState.current && !isRandom.current) {
        isRandom.current = true
      for (let i = 0; i < imagePanels.current.length; i++) {
        gsap.to(imagePanels.current[i].position, {
          duration: 2,
          x: randomPositionArray.current[i * 3],
          y: randomPositionArray.current[i * 3 + 1],
          z: randomPositionArray.current[i * 3 + 2],
        });
        gsap.to(imagePanels.current[i].rotation, {
          duration: 2,
          x: 0,
          y: 0,
          z: 0,
        });
      }
    } else if(!panelState.current && isRandom.current) {
        isRandom.current = false
      for (let i = 0; i < imagePanels.current.length; i++) {
        for (let i = 0; i < imagePanels.current.length; i++) {
          gsap.fromTo(imagePanels.current[i].position, {
            x:imagePanels.current[i].position.x,
            y:imagePanels.current[i].position.y,
            z:imagePanels.current[i].position.z
        },{
            duration: 2,
            x: imagePanelsPosition.current[i].x,
            y: imagePanelsPosition.current[i].y,
            z: imagePanelsPosition.current[i].z,
          });
        }
        gsap.to(imagePanels.current[i].rotation, {
          duration: 2,
          x: imageRotation.current[i].x,
          y: imageRotation.current[i].y,
          z: imageRotation.current[i].z,
        });
      }
    }
  });


  return (
    <>
      {imagePanels.current.length > 0 &&
        imagePanels.current.map((image, index) => {
          return <primitive key={`image${index}`} object={image} />;
        })}
    </>
  );
};

export default LandingPanel;
