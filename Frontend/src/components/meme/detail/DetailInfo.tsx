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
  // get memid from params
  const params = useParams();
  const memeid = parseInt(params.meme_id!, 10);
  const userId = JSON.parse(sessionStorage.user).userId;

  // get meme detail info
  const { data, isLoading, status, sendRequest } = useAxios();
  // post like meme
  const { data: likeData, sendRequest: likeRequest } = useAxios();
  // post dislike meme
  const { data: dislikeData, sendRequest: dislikeRequest } = useAxios();

  // like, dislike count
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  // like, dislike state
  const [likeAction, setLikeAction] = useState<boolean>(false);
  const [dislikeAction, setDislikeAction] = useState<boolean>(false);

  // 경매에 등록된 상태인지
  const [auctionState, setAuctionState] = useState(false);

  useEffect(() => {
    setIsFromNotice(location.state ? true : false);
  }, []);

  // get Meme detail info
  useEffect(() => {
    sendRequest({
      url: `/api/mpoffice/meme/info`,
      params: { memeId: memeid, userId: userId },
    });
  }, []);

  useEffect(() => {
    if (status !== 200) return;
    setAuctionState(data.auctionState);

    setLikes(data.likeCount);
    setDislikes(data.hateCount);

    if (data.memeLike === "LIKE") {
      setLikeAction(true);
    } else if (data.memeLike === "HATE") {
      setDislikeAction(true);
    }
  }, [isLoading]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  // const likeHandler = () => {
  //   sendRequest({
  //     url: "/api/mpoffice/meme/like",
  //     data: {
  //       memeId: memeid,
  //       userId: "",
  //       memeLike: "LIKE",
  //     },
  //   });
  //   setLikeCnt((prev) => prev + 1);
  // };

  const onClickLike = () => {
    if(likeAction) {
      likeRequest({
        url: "/api/mpoffice/meme/like",
        method: "POST",
        data: {
          memeId: memeid,
          userId: userId,
          memeLike: null 
        },
      });
    } else {
      likeRequest({
        url: "/api/mpoffice/meme/like",
        method: "POST",
        data: {
          memeId: memeid,
          userId: userId,
          memeLike: "LIKE" 
        },
      });

    }

    if (likeAction) {
      setLikes(likes - 1);
      setLikeAction(false);
    } else if (dislikeAction) {
      setLikes(likes + 1);
      setLikeAction(true);
      setDislikeAction(false);
      setDislikes(dislikes - 1);
    } else if (!likeAction && !dislikeAction) {
      setLikeAction(true);
      setLikes(likes + 1);
    }
  };

  const onClickDislike = () => {
    if (dislikeAction) {
      dislikeRequest({
        url: "/api/mpoffice/meme/like",
        method: "POST",
        data: {
          memeId: memeid,
          userId: userId,
          memeLike: null 
        },
      });
    } else {
      dislikeRequest({
        url: "/api/mpoffice/meme/like",
        method: "POST",
        data: {
          memeId: memeid,
          userId: userId,
          memeLike: "HATE" 
        },
      });

    }

    if (dislikeAction) {
      setDislikes(dislikes - 1);
      setDislikeAction(false);
    } else if (likeAction) {
      setDislikes(dislikes + 1);
      setDislikeAction(true);
      setLikeAction(false);
      setLikes(likes - 1);
    } else if (!likeAction && !dislikeAction) {
      setDislikeAction(true);
      setDislikes(dislikes + 1);
    }
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

            <div className={styles.memeTitle}>{data.title}</div>
            <div className={styles.memeTimeView}>
              <span>
                {data.createdAt[0]}.{data.createdAt[1]}.{data.createdAt[2]}
                &nbsp;&nbsp;{data.createdAt[3]}:{data.createdAt[4]}
              </span>
              <span>조회수 {data.searched}</span>
            </div>
            <div className={styles.memeImgWrapper}>
              <img src={data.memeImage} alt="" className={styles.memeImg} />
            </div>

            <div className={styles.memeGuide}>뜻</div>
            <div className={styles.memeDescription}>{data.content}</div>
            <div className={styles.memeGuide}>사용하는 상황</div>
            <div className={styles.memeDescription}>{data.situation}</div>

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
                <div className={styles.dislikeBtn}>
                  <Icon
                    icon="mdi:cards-heart"
                    className={
                      !likeAction
                        ? styles.heartImoji
                        : styles.dislikeHeartImoji
                    }
                    onClick={onClickLike}
                  />
                </div>
                <div className={styles.heartNumber}>{likes}</div>
              </div>

              <div className={styles.heartWrapper}>
                <div className={styles.dislikeBtn}>
                  <Icon
                    icon="ic:baseline-heart-broken"
                    className={
                      !dislikeAction
                        ? styles.heartImoji
                        : styles.dislikeHeartImoji
                    }
                    onClick={onClickDislike}
                  />
                </div>
                <div className={styles.heartNumber}>{dislikes}</div>
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