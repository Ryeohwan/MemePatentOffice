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
import { Characters } from "type";

const AuctionCanvas: React.FC<Characters> = ({
  client,
  auctionId,
  characters,
  userNum,
}) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const dispatch = useDispatch();
  const playerState = useSelector<RootState, number>(
    (state) => state.auction.playerState
  );

  const [isFull, setIsFull] = useState<Boolean>(false);
  const [visible, setVisible] = useState<Boolean>(false);
  const player = useRef<THREE.Object3D>(new THREE.Object3D());
  const chairPoints = useRef<Array<THREE.Mesh>>([]);
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
  const [fullScreen, setFullScreen] = useState(false);
  
  const [playerStatus, setPlayerState] = useState<number>(0);
  const changeHandler = () => {
    setPlayerState((prev)=>prev+1)
  }
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
  // dispatch(auctionActions.closeAuction())
  // dispatch(chatActions.closeAuction())
  //   };
  // }, []);

  const biddingHandler = (state: boolean) => {
    setBiddingVisible(state);
  };
  const biddingSubmitHandler = () => {
    setBiddingVisible(false);
    dispatch(auctionActions.controlPlayerState(4));
    setTimeout(() => {
      dispatch(auctionActions.controlPlayerState(5));
    }, 2000);
  };

  const canSitHandler = useCallback((state: boolean) => {
    setVisible(state);
  }, []);

  const sitDownHandler = () => {
    dispatch(auctionActions.controlPlayerState(2));
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
    isSitting.current = false;
    canSitHandler(false);
    setTimeout(() => {
      dispatch(auctionActions.controlPlayerState(5));
    }, 1200);
  };

  const standUpHandler = () => {
    dispatch(auctionActions.controlPlayerState(3));
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

    setTimeout(() => {
      dispatch(auctionActions.controlPlayerState(0));
    }, 1200);
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
        canSitHandler={canSitHandler}
        player={player}
        chairPoint={chairPoint}
        playerAnimation={playerAnimation}
        camera={camera}
        playerPosition={playerPosition}
        isSitting={isSitting}
        client={client}
        auctionId={auctionId}
        characters={characters}
        userNum={userNum}
        chairPoints={chairPoints}
        changeHandler={changeHandler}
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
        {playerState===5 && (
          <>
            <Button icon="pi pi-dollar" onClick={() => biddingHandler(true)} />
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
        <ChatMain client={client} auctionId={auctionId} />
      </div>
      <div className={styles.fullMoniterBtn}>
        {playerState===5 ? (
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
