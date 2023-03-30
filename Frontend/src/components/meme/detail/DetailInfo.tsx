import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { auctionUploadActions } from "store/auctionUpload";

import useAxios from "hooks/useAxios";

import UploadModal from "components/auction/upload/UploadModal";

import styles from "./DetailInfo.module.css";
import { Icon } from "@iconify/react";

const DetailInfo: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isFromNotice, setIsFromNotice] = useState<boolean>();
  const params = useParams();
  const memeid = parseInt(params.meme_id!, 10);

  const [auctionState, setAuctionState] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [dislikeCnt, setDislikeCnt] = useState(0);

  const { data, isLoading, status, sendRequest } = useAxios();
  const { data: likeData, sendRequest: likeRequest } = useAxios();
  const { data: dislikeData, sendRequest: dislikeRequest } = useAxios();

  useEffect(() => {
    setIsFromNotice(location.state ? true : false);
  }, []);

  useEffect(() => {
    sendRequest({ url: `/api/mpoffice/meme/${memeid}` });
  }, []);

  useEffect(() => {
    if (status !== 200) return;
    setAuctionState(data.auctionState)
    setLikeCnt(data.likeState)
    setDislikeCnt(data.likeState)
  }, [isLoading])


  const likeHandler = () => {
    sendRequest({
      url: "/api/mpoffice/meme/like",
      data: {
        'memeId': memeid,
        'userId': '',
        'memeLike': 'LIKE',
      }
    })
    setLikeCnt((prev) => prev+1)
  }

  return (
    <>
      {isLoading ? (
        <p>loading중</p>
      ) : (
        <div className={styles.memeDetailPage}>
          <div className={styles.auctionBtnWrapper}>
            <div className={styles.alarmBtn}>경매 알림 받기</div>
            <div
              className={
                isFromNotice ? styles.auctionInfoBtn2 : styles.auctionInfoBtn
              }
            >
              12월 28일 13시 경매 예정
            </div>
          </div>

          <div className={styles.memeTitle}>
            귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕
            가족사진입니다
            {/* {data.title} */}
          </div>
          <div className={styles.memeTimeView}>
            <span>2023.03.31 17:44</span>
            {/* <span>{data.createdAt}</span> */}
            <span>조회수 689,982</span>
            {/* <span>조회수 </span> */}
          </div>
          <div className={styles.memeImgWrapper}>
            <img
              src="http://localhost:3000/totoro.jpg"
              alt=""
              className={styles.memeImg}
            />
          </div>

          <div className={styles.memeGuide}>뜻</div>
          <div className={styles.memeDescription}>
            나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아
            한가로운 오후를 보내고 있다.
          </div>
          <div className={styles.memeGuide}>사용하는 상황</div>
          <div className={styles.memeDescription}>
            나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아
            한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은
            토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에
            큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운
            오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로,
            사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰
            토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운
            오후를 보내고 있다.
          </div>

          <div className={styles.memeOwner}>
            <div>최초 등록자</div>
            <div className={styles.ownerName}>5조의 햇살</div>
          </div>
          <div className={styles.memeOwner}>
            <div>현재 소유자</div>
            <div className={styles.ownerName}>단발머리 부엉이</div>
          </div>
          <div className={styles.heartGroup}>
            <div className={styles.heartWrapper}>
              <Icon icon="mdi:cards-heart" className={styles.heartImoji} />
              {/* <div className={styles.heartNumber}>153</div> */}
              <div className={styles.heartNumber} onClick={likeHandler}>{likeCnt}</div>
            </div>
            <div className={styles.heartWrapper}>
              <Icon
                icon="ic:baseline-heart-broken"
                className={styles.heartImoji}
              />
              {/* <div className={styles.heartNumber}>2</div> */}
              {/* <div className={styles.heartNumber} onClick={dislikeHandler}>{dislikeCnt}</div> */}
            </div>
          </div>
          <div
            className={styles.uploadAuctionBtn}
            onClick={() => {
              dispatch(
                auctionUploadActions.controlModal({
                  visible: true,
                  memeid: memeid,
                })
              );
            }}
          >
            이 NFT 경매 등록하러 가기
          </div>
          <UploadModal />
        </div>
      )}
    </>
  );
};

export default DetailInfo;
