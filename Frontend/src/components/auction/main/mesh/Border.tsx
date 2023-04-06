import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auctionActions } from "store/auction";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { auctionInfo } from "store/auction";
import * as THREE from "three";
import { useFrame, useLoader } from "react-three-fiber";
import GifLoader from "three-gif-loader";
import GifTexture from "three-gif-loader/lib/gif-texture";

const Border: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const texCanvas = document.createElement("canvas") as HTMLCanvasElement;
  const texContext = texCanvas.getContext("2d");
  const nftTexture = useRef<THREE.Texture | GifTexture>();
  texCanvas.width = 100;
  texCanvas.height = 100;
  const canvasTexture = new THREE.CanvasTexture(texCanvas);
  const { biddingHistory, finishTime, memeImgUrl, startingPrice } = useSelector<
    RootState,
    auctionInfo
  >((state) => state.auction.auctionInfo);
  // const arrOne = memeImgSrc.split(",");
  // const arrTwo = arrOne[0]!.match(/:(.*?);/);
  // const mime = arrTwo![1];
  const loader = new GifLoader();
  // const loader2 = new THREE.TextureLoader()
  // const texture = loader2.load(memeImgUrl!)
  const texture = useLoader(THREE.TextureLoader, memeImgUrl!);
  const reader: FileReader = new FileReader();
  nftTexture.current = texture;

  const border = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
      color: "",
    })
  );

  const NFT = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({
      map: nftTexture.current,
      fog: false,
    })
  );
  const timerMaterial = new THREE.MeshBasicMaterial({
    map: canvasTexture,
  });

  NFT.position.set(-1, 5, -28.9);
  border.position.set(-1, 7, -29);

  const targetTime = Math.floor(+new Date(finishTime!) / 1000);

  const getRemainTime = () => {
    const date = Math.floor(+new Date() / 1000);
    let diff=0;
    if (targetTime < date) {
      if (targetTime - date < -300){
        alert('이미 종료된 경매입니다.')
        navigate('/main')
      }
      diff = 0;
    } else if (targetTime - date > 15*60){
      alert('아직 시작하지 않은 경매입니다.')
      navigate('/main')
    } else {
      diff = targetTime - date;
    }
    const remainTime = new Date(0);
    remainTime.setSeconds(diff);

    const minutes = remainTime.getUTCMinutes().toString().padStart(2, "0");
    const seconds = remainTime.getUTCSeconds().toString().padStart(2, "0");

    return [diff, `${minutes}:${seconds}`];
  };
  // useEffect(() => {
  //   if (texContext) {
  //   }
  // }, []);

  useFrame(() => {
    canvasTexture.needsUpdate = true;
    if (texContext) {
      texContext.fillStyle = "#0277BD"; // 물감
      texContext.fillRect(0, 0, 100, 100); // 좌표0,0, 크기
      texContext.font = "14px Gmarket Sans TTF";
      texContext.fillStyle = "white"; // 물감
      texContext.fillText(
        `${
          biddingHistory.length > 0 ? biddingHistory[0].price : startingPrice
        } SSF`,
        21,
        39
      );
      texContext.font = "14px Gmarket Sans TTF";
      let timerProps = getRemainTime();
      let diff = timerProps[0];
      if(diff === 0 ){
        dispatch(auctionActions.controlFinishModal(true))
      }
      let timerView = timerProps[1];
      if ((diff as number) <= 3 * 60) {
        texContext.fillStyle = "red"; // 물감
      } else {
        texContext.fillStyle = "white"; // 물감
      }
      texContext.fillText(`${timerView}`, 30, 20);
    }
  });

  const timer = new THREE.Mesh(new THREE.PlaneGeometry(9, 10), timerMaterial);
  timer.position.set(-1, 7, -28.95);

  return (
    <>
      <primitive castShadow object={border} />
      <primitive object={NFT} />
      <primitive object={timer} />
    </>
  );
};
export default Border;
