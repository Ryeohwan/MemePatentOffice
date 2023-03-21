// auction page (/auction/:auction_id)

import React, { useRef, useState, useCallback } from "react";
import Scene from "components/auction/main/Scene";
import styles from "pages/AuctionPage.module.css";
import * as THREE from "three";
import gsap from "gsap";
import AuctionSlideMenu from "components/auction/main/list/AuctionSlideMenu";

import { Button } from "primereact/button";
import ChatMain from "components/auction/main/chat/ChatMain";

const AuctionPage: React.FC = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [visible, setVisible] = useState<Boolean>(false);
  const player = useRef<THREE.Object3D>(new THREE.Object3D());
  const chairPoint = useRef<THREE.Mesh>(new THREE.Mesh());
  const playerAnimation = useRef<THREE.AnimationAction | undefined>();
  const sitting = useRef(false);
  const cameraPoint = useRef<THREE.Vector3>(new THREE.Vector3());
  const cameraRotation = useRef<number[]>([]);
  const camera = useRef<THREE.OrthographicCamera>(
    new THREE.OrthographicCamera(
      -(width / height),
      width / height,
      1,
      -1,
      -1000,
      1000
    )
  );
  const canSit = useCallback(() => {
    setVisible(true);
  }, []);
  const cantSit = useCallback(() => {
    setVisible(false);
  }, []);

  const sitDownHandler = () => {
    console.log(camera.current);

    player.current.lookAt(0, 1, -30);
    player.current.rotation.y = 0;
    gsap.fromTo(
      player.current.position,
      {
        x: player.current.position.x,
        z: player.current.position.z,
      },
      {
        x: chairPoint.current.position.x,
        z: chairPoint.current.position.z + 0.8,
        duration: 1,
      }
    );
    cameraPoint.current = camera.current.position.clone();
    cameraRotation.current = [
      camera.current.rotation.x,
      camera.current.rotation.y,
      camera.current.rotation.z,
    ];
    gsap.to(camera.current.position, {
      x: player.current.position.x - 3,
      y: player.current.position.y + 5,
      z: player.current.position.z,
      duration: 1,
    });
    camera.current.lookAt(player.current.position.x, 7, -25);
    if (playerAnimation.current) {
      playerAnimation.current.play();
      console.log(playerAnimation.current);
    }
    sitting.current = true;
    cantSit();
  };

  const standUpHandler = () => {
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
        z: chairPoint.current.position.z - 0.8,
        duration: 1,
      }
    );
    console.log(cameraPoint);
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
    sitting.current = false;
  };
  return (
    <section className={styles.auctionWrapper}>
      <Scene
        width={width}
        height={height}
        canSit={canSit}
        cantSit={cantSit}
        player={player}
        chairPoint={chairPoint}
        playerAnimation={playerAnimation}
        sitting={sitting}
        camera={camera}
      />
      <div className={styles.buttonWrapper}>
        <AuctionSlideMenu />
        {visible && !sitting.current && (
          <Button
            label="앉기"
            className={styles.sitBtn}
            onClick={sitDownHandler}
          />
        )}
        {sitting.current && (
            <Button
              label="일어나"
              className={styles.sitBtn}
              onClick={standUpHandler}
            />
        )}
        <ChatMain/>
      </div>
    </section>
  );
};

export default AuctionPage;
