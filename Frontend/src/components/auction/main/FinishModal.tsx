import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as THREE from "three";
import useAxios from "hooks/useAxios";

import { useSelector } from "react-redux";
import { biddingHistory } from "store/auction";
import { RootState } from "store/configStore";

import { Canvas } from "react-three-fiber";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import styles from "components/auction/main/FinishModal.module.css";
import FinishModalCharacter from "./FinishModalCharacter";
import { transferNftCoin, transferNftOwnership } from "web3config";

const FinishModal: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const auctionId = parseInt(params.auctionId!, 10);
  const walletAddress = JSON.parse(sessionStorage.getItem('user')!).walletAddress;

  // 경매 끝나자마자 get으로 경매 결과 받아옴
  const { data: resultData, sendRequest: getResultData } = useAxios();

  const biddingHistory = useSelector<RootState, biddingHistory[]>(
    (state) => state.auction.auctionInfo.biddingHistory
  );
  // 모달창
  const visible = useSelector<RootState, boolean>(state=>state.auction.finishModalVisible);
  // const visible = true;

  // 남은 시간
  // const [remainTime, setRemainTime] = useState<number>(5);
  const remainTime = useRef<number>(6);
  
  const memeTransaction = async (resultData:any) => {
    let fromAccount;
    let toAccount;
    let price;
    let memeTokenId;

    if (resultData) {
      fromAccount = resultData.fromAccount;
      toAccount = resultData.toAccount;
      price = resultData.price;
      memeTokenId = resultData.memeTokenId;

      // 판매자 : fromAccount, 구매자 : toAccount
      if (walletAddress === fromAccount || walletAddress === toAccount) {
        await transferNftCoin(fromAccount, toAccount, price);
        await transferNftOwnership(toAccount, memeTokenId);
        // 모달 닫기
      } 
    }  


  };


  useEffect(() => {


    if (visible){
      getResultData({
        url: `/api/auction/result?auctionId=${auctionId}`
      });
  
        console.log(resultData)
        if (resultData) {

        }


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
