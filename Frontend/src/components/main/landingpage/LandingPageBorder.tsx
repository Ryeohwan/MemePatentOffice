import React from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

interface LandingBorderPageProps {
  borderPosition: number[];
}

const LandingPageBorder: React.FC<LandingBorderPageProps> = ({borderPosition}) => {
  const texCanvas = document.createElement("canvas");
  const texContext = texCanvas.getContext("2d");
  texCanvas.width = 300;
  texCanvas.height = 300;
  const canvasTexture = new THREE.CanvasTexture(texCanvas);

  useFrame(()=>{
    if(texContext){
      texContext.fillStyle = '#448AFF'
      texContext.fillRect(0,0,300,300)
    }
  })

  const border = new THREE.Mesh(
    new THREE.PlaneGeometry(3.55, 5),
    new THREE.MeshStandardMaterial({
      map: canvasTexture,
      
    })
  );
  border.position.set(borderPosition[0],borderPosition[1],borderPosition[2])



  return (
    <>
      <primitive castShadow object={border} />
    </>
  );
};

export default LandingPageBorder;
