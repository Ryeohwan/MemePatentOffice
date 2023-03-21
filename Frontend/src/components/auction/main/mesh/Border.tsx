import React from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "react-three-fiber";

const Border: React.FC = () => {
  const texCanvas = document.createElement("canvas");
  const texContext = texCanvas.getContext("2d");
  texCanvas.width = 100;
  texCanvas.height = 100;
  const canvasTexture = new THREE.CanvasTexture(texCanvas);

  const nftTexture = useLoader(
    THREE.TextureLoader,
    "data:image/jpeg;base64,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"
  );
  const logoTexture = useLoader(
    THREE.TextureLoader,
    "/auction/material/logo.png"
  );

  const border = new THREE.Mesh(
    new THREE.PlaneGeometry(25, 10),
    new THREE.MeshStandardMaterial({
      color: "black",
    })
  );
  const nftLeft = new THREE.Mesh(
    new THREE.PlaneGeometry(8.1, 10.1),
    new THREE.MeshStandardMaterial({
      map: nftTexture,
    })
  );
  const nftRight = new THREE.Mesh(
    new THREE.PlaneGeometry(8.1, 10.1),
    new THREE.MeshStandardMaterial({
      map: nftTexture,
    })
  );
  const logo = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshStandardMaterial({
      map: logoTexture,
    })
  );
  const timerMaterial = new THREE.MeshBasicMaterial({
    map: canvasTexture,
  });

  nftLeft.position.set(-9.5, 7, -28.9);
  nftRight.position.set(7.5, 7, -28.9);
  logo.position.set(-1, 5, -28.9);
  border.position.set(-1, 7, -29);

  // const targetTime = new Date(2023, 3, 20, 14, 15, 0)
  const targetTime = Math.floor(+new Date(2023, 3-1, 21, 16, 0, 0)/1000);

  const getRemainTime = () => {
    const date = Math.floor(+new Date()/1000)
    // console.log(date, targetTime)
    let diff
    if (targetTime < date){
      diff = 0
    }else{
      diff = (targetTime-date)
    }
    const remainTime = new Date(0)
    remainTime.setSeconds(diff)
    
    const hours = remainTime.getUTCHours().toString().padStart(2, "0");
    const minutes = remainTime.getUTCMinutes().toString().padStart(2, "0");
    const seconds = remainTime.getUTCSeconds().toString().padStart(2,"0");

    return [diff,`${hours}:${minutes}:${seconds}`];
  };

  useFrame(() => {
    canvasTexture.needsUpdate = true;
    if (texContext) {
      texContext.fillStyle = "#0277BD"; // 물감
      texContext.fillRect(0, 0, 100, 100); // 좌표0,0, 크기
      let timerProps = getRemainTime()
      let diff = timerProps[0]
      let timerView = timerProps[1]
      texContext.fillText(`${timerView}`, 5, 50);
      texContext.font = "17px Gmarket Sans TTF";
      if (diff <= 60*60){
        texContext.fillStyle = "red"; // 물감
      }else{
        texContext.fillStyle = "white"; // 물감
      }
      texContext.fillText(`${timerView}`, 10, 20);
    }
  });

  const timer = new THREE.Mesh(new THREE.PlaneGeometry(9, 10), timerMaterial);
  timer.position.set(-1, 7, -28.95);

  return (
    <>
      <primitive castShadow object={border} />
      <primitive object={nftLeft} />
      <primitive object={nftRight} />
      <primitive object={logo} />
      <primitive object={timer} />
    </>
  );
};
export default Border;
