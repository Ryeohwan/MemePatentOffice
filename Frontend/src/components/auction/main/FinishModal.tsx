import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import * as THREE from "three";

import { useSelector } from "react-redux";
import { biddingHistory } from "store/auction";
import { RootState } from "store/configStore";

import { Canvas } from "react-three-fiber";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import styles from "components/auction/main/FinishModal.module.css";
import FinishModalCharacter from "./FinishModalCharacter";

const FinishModal: React.FC = () => {
  const navigate = useNavigate();

  const biddingHistory = useSelector<RootState, biddingHistory[]>(
    (state) => state.auction.auctionInfo.biddingHistory
  );
  // 모달창
  const visible = useSelector<RootState, boolean>(state=>state.auction.finishModalVisible);

  // 남은 시간
  // const [remainTime, setRemainTime] = useState<number>(5);
  const remainTime = useRef<number>(6);
  useEffect(() => {
    if (visible){
      const interval = setInterval(() => {
        remainTime.current -= 1
        if (remainTime.current === 0) {
          navigate('/main')
        }
      }, 1000);
    }
  }, [visible]);
  const camera = useRef<THREE.PerspectiveCamera>(
    new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  );
  camera.current.position.set(-0.5, 0.5, 2.5);
  camera.current.lookAt(0, 0.5, 0);
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
        {biddingHistory.length === 0? (
          <>
            <p>경매가 종료되었습니다.</p>
          </>
        ) : (
          <>
            <p className={styles.nickname}>{biddingHistory[0].nickname}님</p>
            <p className={styles.cong}>축하드립니다!!</p>
            <div className={styles.canvasDiv}>
              <Canvas className={styles.canvas} camera={camera.current}>
                <ambientLight />
                <FinishModalCharacter />
              </Canvas>
            </div>
            <div className={styles.exitContainer}>
              <p className={styles.remainTime}>5초 후에 종료됩니다.</p>
              <Button
                className={styles.exitBtn}
                onClick={() => {
                  navigate(`/main`);
                }}
              >
                나가기
              </Button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default FinishModal;
