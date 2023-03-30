import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Box from "./mesh/Box";
import { useSelector } from "react-redux";
import { auctionInfo, biddingHistory } from "store/auction";
import { RootState } from "store/configStore";

import { Canvas } from "react-three-fiber";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import styles from "components/auction/main/FinishModal.module.css";
import FinishModalCharacter from "./FinishModalCharacter";

type action = {
  buy: THREE.AnimationAction | null;
  notbuy: THREE.AnimationAction | null;
};

const FinishModal: React.FC = () => {
  const navigate = useNavigate();
  const { finishTime, memeId } = useSelector<RootState, auctionInfo>(
    (state) => state.auction.auctionInfo
  );
  const biddingHistory = useSelector<RootState, biddingHistory[]>(
    (state) => state.auction.biddingHistory
  );
  // 끝나는 시간 format
  const finishFormat = finishTime.split("T")[1].substring(0, 5);

  // 모달창
  const [visible, setVisible] = useState<boolean>(false);

  // 남은 시간
  // const [remainTime, setRemainTime] = useState<number>(5);
  const remainTime = useRef<number>(5)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toISOString().split("T")[1].substring(0, 5);
      if (currentTime === finishFormat) {
        if (!visible){
          setVisible(true);
          remainTime.current -= 1
          // setRemainTime((prev)=>prev-1)
        }
      }
      if (remainTime.current ===0){
        navigate(`/meme-detail/${memeId}`)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const currentTime = new Date().toISOString().split("T")[1].substring(0, 5);
  //   if (currentTime === finishFormat) {
  //     setVisible(true);
  //     setRemainTime((time) => time - 1);
  //   }
  //   console.log(remainTime);
  // }, [time]);

  return (
    <Dialog
      header="경매 마감"
      visible={visible}
      closable={false}
      modal={false}
      className={styles.modal}
      onHide={() => {}}
    >
      {/* 경매 끝났을 때 최고가 닉네임 띄우기 */}
      <div className={styles.wrapper}>
        <p className={styles.nickname}>{biddingHistory[0].nickname}님</p>
        <p className={styles.cong}>축하드립니다!!</p>
        <div className={styles.canvasDiv}>
          <Canvas className={styles.canvas} camera={{ fov: 75, near: 0.1, far: 100, position: [0, 1, 2] }}>
            <ambientLight />
          <FinishModalCharacter />
          </Canvas>
        </div>
        <p className={styles.remainTime}>5초 후에 종료됩니다.</p>
        <Button>나가기</Button>
      </div>
    </Dialog>
  );
};

export default FinishModal;
