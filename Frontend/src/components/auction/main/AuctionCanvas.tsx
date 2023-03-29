// auction page (/auction/:auction_id)

import React, { useRef, useState, useCallback, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/configStore";
import { auctionActions } from "store/auction";

import Scene from "components/auction/main/Scene";
import styles from "components/auction/main/AuctionCanvas.module.css";
import * as THREE from "three";
import gsap from "gsap";
import AuctionSlideMenu from "components/auction/main/list/AuctionSlideMenu";

import { Button } from "primereact/button";
import ChatMain from "components/auction/main/chat/ChatMain";
import Bidding from "components/auction/main/list/Bidding";
import FinishModal from "components/auction/main/FinishModal";

interface AuctionCanvasProps {
  finishTime: Date | string;
  sellerID: string;
}

const AuctionCanvas: React.FC = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const dispatch = useDispatch()
  const playerState = useSelector<RootState, number>(state=>state.auction.playerState)
  const [isFull, setIsFull] = useState<Boolean>(false);
  const [visible, setVisible] = useState<Boolean>(false);
  const player = useRef<THREE.Object3D>(new THREE.Object3D());
  const chairPoint = useRef<THREE.Mesh>(new THREE.Mesh());
  const playerAnimation = useRef<THREE.AnimationAction | undefined>();
  const playerPosition = useRef<THREE.Vector3>(new THREE.Vector3());
  const isSitting = useRef<boolean>(false);
  const cameraPoint = useRef<THREE.Vector3>(new THREE.Vector3());
  const cameraRotation = useRef<number[]>([]);
  const camera = useRef<THREE.OrthographicCamera | THREE.PerspectiveCamera>(
    new THREE.OrthographicCamera(
      -(width / height),
      width / height,
      1,
      -1,
      -1000,
      1000
    )
  );
  const bigCamera = new THREE.OrthographicCamera(
    -(width / height),
    width / height,
    1,
    -1,
    -1000,
    1000
  );
  const playerCamera = useRef<THREE.PerspectiveCamera>(
    new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  );
  const [biddingVisible, setBiddingVisible] = useState<boolean>(false);
  const [biddingSubmit, setBiddingSubmit] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState(false)
  // useEffect(() => {
  //   const elem = document.getElementById("auction");
  //   if (elem) {
  //     elem.addEventListener("click", () => {
  //       if (elem.requestFullscreen) {
  //         elem.requestFullscreen();
  //       }
  //     });
  //   }
  //   setFullScreen(true)
  //   return () => {
  //     if (document.fullscreenElement)
  //     document.exitFullscreen();
  //   };
  // }, []);

  const biddingHandler = () => {
    setBiddingVisible(false);
  };
  const biddingOpen = () => {
    setBiddingVisible(true);
  };
  const biddingSubmitHandler = () => {
    setBiddingVisible(false);
    setBiddingSubmit(true);
    setTimeout(() => {
      setBiddingSubmit(false);
    }, 2500);
  };

  const canSit = useCallback(() => {
    setVisible(true);
  }, []);
  const cantSit = useCallback(() => {
    setVisible(false);
  }, []);

  const sitDownHandler = () => {
    // moving.current = false;
    dispatch(auctionActions.controlPlayerState(2))
    cameraPoint.current = camera.current.position.clone();
    cameraRotation.current = [
      camera.current.rotation.x,
      camera.current.rotation.y,
      camera.current.rotation.z,
    ];
    playerCamera.current.position.set(
      chairPoint.current.position.x > 0
        ? chairPoint.current.position.x + 0.5
        : chairPoint.current.position.x - 1,
      chairPoint.current.position.y + 2,
      chairPoint.current.position.z + 5
    );
    playerCamera.current.lookAt(0, 3, -30);
    camera.current = playerCamera.current.clone();
    player.current.lookAt(0, 1, -30);
    player.current.rotation.y = 0;
    if(playerAnimation.current) playerAnimation.current.play()
    gsap.fromTo(
      player.current.position,
      {
        x: player.current.position.x,
        z: player.current.position.z,
      },
      {
        x: chairPoint.current.position.x - 0.3,
        y: chairPoint.current.position.y + 0.8,
        z: chairPoint.current.position.z + 0.8,
        duration: 1,
      }
    );

    if (playerAnimation.current) {
      playerAnimation.current.play();
    }
    cantSit();
  };

  const standUpHandler = () => {
    dispatch(auctionActions.controlPlayerState(0))
    setIsFull(false);
    camera.current = bigCamera;
    camera.current.zoom = 30;
    player.current.lookAt(0, 1, -30);
    player.current.rotation.y = 0;
    gsap.fromTo(
      player.current.position,
      {
        x: chairPoint.current.position.x,
        z: chairPoint.current.position.z + 0.8,
      },
      {
        x: chairPoint.current.position.x,
        y: playerPosition.current.y,
        z: chairPoint.current.position.z - 0.8,
        duration: 1,
      }
    );
    gsap.to(camera.current.position, {
      x: cameraPoint.current.x,
      y: cameraPoint.current.y,
      z: cameraPoint.current.z,
      duration: 1,
    });
    camera.current.rotation.x = cameraRotation.current[0];
    camera.current.rotation.y = cameraRotation.current[1];
    camera.current.rotation.z = cameraRotation.current[2];
    if (playerAnimation.current) {
      playerAnimation.current.play();
    }
  };

  const fullMoniter = () => {
    gsap.to(camera.current.position, {
      z: 30,
      y: 5,
      duration: 2,
    });
    setIsFull(true);
  };
  const notFullMoniter = () => {
    gsap.to(camera.current.position, {
      z: playerCamera.current.position.z,
      y: playerCamera.current.position.y,
      duration: 2,
    });
    setIsFull(false);
  };
  return (
    <section id="auction" className={styles.auctionWrapper}>
      <Scene
        canSit={canSit}
        cantSit={cantSit}
        player={player}
        chairPoint={chairPoint}
        playerAnimation={playerAnimation}
        camera={camera}
        biddingSubmit={biddingSubmit}
        playerPosition={playerPosition}
        isSitting={isSitting}
      />
      <div className={styles.buttonWrapper}>
        {/* {document.getElementById("auction") && <AuctionSlideMenu />} */}
        <AuctionSlideMenu />
        {visible && playerState === 0 && (
          <Button
            label="앉기"
            className={styles.sitBtn}
            onClick={sitDownHandler}
          />
        )}
        {playerState===2 && (
          <>
            <Button icon="pi pi-dollar" onClick={biddingOpen} />
            <Button
              label="일어나"
              className={styles.sitBtn}
              onClick={standUpHandler}
            />
          </>
        )}
        <Bidding
          biddingHandler={biddingHandler}
          biddingSubmitHandler={biddingSubmitHandler}
          biddingVisible={biddingVisible}
        />
        <ChatMain />
      </div>
      <div className={styles.fullMoniterBtn}>
        {playerState === 2 ? (
          isFull ? (
            <Button onClick={() => notFullMoniter()}>확대</Button>
          ) : (
            <Button onClick={() => fullMoniter()}>전체 화면</Button>
          )
        ) : (
          <></>
        )}
      </div>
      <FinishModal />
    </section>
  );
};

export default AuctionCanvas;
