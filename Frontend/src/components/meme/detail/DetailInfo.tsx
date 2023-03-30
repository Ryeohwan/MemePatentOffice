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
  const userId = JSON.parse(sessionStorage.user).userId;

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
    console.log("여기임", memeid, userId);
    sendRequest({
      url: `/api/mpoffice/meme/info`,
      params: { memeId: memeid, userId: userId },
    });
  }, []);

  useEffect(() => {
    if (status !== 200) return;
    setAuctionState(data.auctionState);
    setLikeCnt(data.likeState);
    setDislikeCnt(data.likeState);
  }, [isLoading]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const likeHandler = () => {
    sendRequest({
      url: "/api/mpoffice/meme/like",
      data: {
        memeId: memeid,
        userId: "",
        memeLike: "LIKE",
      },
    });
    setLikeCnt((prev) => prev + 1);
  };

  return (
    <>
      <div className={styles.memeDetailPage}>
        {!isLoading && data ? (
          <>
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
              {data.title}
            </div>
            <div className={styles.memeTimeView}>
              <span>{data.createdAt[0]}.{data.createdAt[1]}.{data.createdAt[2]} {data.createdAt[3]}:{data.createdAt[4]}</span>
              <span>조회수 {data.searched}</span>
            </div>
            <div className={styles.memeImgWrapper}>
              <img
                src={data.userProfileImage}
                alt=""
                className={styles.memeImg}
              />
            </div>

            <div className={styles.memeGuide}>뜻</div>
            <div className={styles.memeDescription}>
              {data.content}
            </div>
            <div className={styles.memeGuide}>사용하는 상황</div>
            <div className={styles.memeDescription}>
              나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가
              앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간
              토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고
              있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와
              메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간
              토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고
              있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와
              메이가 앉아 한가로운 오후를 보내고 있다.
            </div>

            <div className={styles.memeOwner}>
              <div>최초 등록자</div>
              <div className={styles.ownerName}>{data.createrNickname}</div>
            </div>
            <div className={styles.memeOwner}>
              <div>현재 소유자</div>
              <div className={styles.ownerName}>{data.ownerNickname}</div>
            </div>
            <div className={styles.heartGroup}>
              <div className={styles.heartWrapper}>
                <Icon icon="mdi:cards-heart" className={styles.heartImoji} />
                {/* <div className={styles.heartNumber}>153</div> */}
                <div className={styles.heartNumber} onClick={likeHandler}>
                  {likeCnt}
                </div>
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
          </>
        ) : (
          <p>loading중</p>
        )}
      </div>
    </>
  );
};

export default DetailInfo;
