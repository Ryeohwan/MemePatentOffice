// auction page (/auction/:auction_id)

import React, { useRef, useState, useCallback } from "react";
import Scene from "components/auction/main/Scene";
import styles from "pages/AuctionPage.module.css";
import * as THREE from "three";
import gsap from "gsap";

const AuctionPage: React.FC = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [visible, setVisible] = useState<Boolean>(false);
  const player = useRef<THREE.Object3D>(new THREE.Object3D());
  const chairPoint = useRef<THREE.Mesh>(new THREE.Mesh());
  const playerAnimation = useRef<THREE.AnimationAction | undefined>();
  const sitting = useRef(false);

  const canSit = useCallback(() => {
    setVisible(true);
  }, []);
  const cantSit = useCallback(() => {
    setVisible(false);
  }, []);

  const sitDownHandler = () => {
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

    if (playerAnimation.current) {
      playerAnimation.current.play();
      console.log(playerAnimation.current)
    }
    sitting.current = true;
    cantSit()
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
        z: chairPoint.current.position.z-0.8,
        duration: 1,
      }
    );

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
      />
      <div>
        {visible && !sitting.current && (
          <button className={styles.sitBtn} onClick={sitDownHandler}>
            앉기
          </button>
        )} 
        {sitting.current && (
          <button className={styles.sitBtn} onClick={standUpHandler}>
            일어나
          </button>
        )}
      </div>
    </section>
  );
};

export default AuctionPage;
