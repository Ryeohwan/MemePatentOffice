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
  const userNickname = JSON.parse(sessionStorage.getItem("user")!).nickname;

  // get meme detail info
  const { data, isLoading, status, sendRequest } = useAxios();
  // post like meme
  const { sendRequest: likeRequest } = useAxios();
  // post dislike meme
  const { sendRequest: dislikeRequest } = useAxios();
  // post cart alarm
  const { sendRequest: alarmRequest } = useAxios();

  // 밈 업로드 시간
  const [createdDate, setCreatedDate] = useState("");

  // like, dislike count
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  // like, dislike state
  const [likeAction, setLikeAction] = useState<boolean>(false);
  const [dislikeAction, setDislikeAction] = useState<boolean>(false);

  // 경매 알림 상태
  const [cart, setCart] = useState<string>("");

  // 경매에 등록된 상태인지
  const [auctionState, setAuctionState] = useState<string | null>();

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
    setCart(data.cart);
    setLikes(data.likeCount);
    setDislikes(data.hateCount);
    const isoDate = data.createdAt;
    const date = new Date(isoDate);
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
    setCreatedDate(`${formattedDate}  ${formattedTime}`);

    if (data.memeLike === "LIKE") {
      setLikeAction(true);
    } else if (data.memeLike === "HATE") {
      setDislikeAction(true);
    }
  }, [isLoading]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const onClickGetAlarm = () => {
    alarmRequest({
      url: "/api/mpoffice/meme/cart",
      method: "POST",
      data: {
        memeId: memeid,
        userId: userId,
        cart: "ADD",
      },
    });
    setCart(cart === "ADD" ? "DELETE" : "ADD");
  };

  const onClickLike = () => {
    likeRequest({
      url: "/api/mpoffice/meme/like",
      method: "POST",
      data: {
        memeId: memeid,
        userId: userId,
        memeLike: "LIKE",
      },
    });

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
    dislikeRequest({
      url: "/api/mpoffice/meme/like",
      method: "POST",
      data: {
        memeId: memeid,
        userId: userId,
        memeLike: "HATE",
      },
    });

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
              <div className={styles.alarmBtn} onClick={onClickGetAlarm}>
                {cart === "ADD" ? "경매 알림 취소" : "경매 알림 받기"}
              </div>
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
              <span>{createdDate}</span>
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
                      !likeAction ? styles.heartImoji : styles.dislikeHeartImoji
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
            {userNickname === data.createrNickname && (
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
            )}
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
