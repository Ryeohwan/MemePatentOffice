import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auctionUploadActions } from "store/auctionUpload";
import useAxios from "hooks/useAxios";
import UploadModal from "components/auction/upload/UploadModal";
import styles from "./DetailInfo.module.css";
import { Icon } from "@iconify/react";

const DetailInfo: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auctionPoint, setAuctionPoint] = useState<boolean>();

  // get memid from params
  const params = useParams();
  const memeid = parseInt(params.meme_id!, 10);
  const userId = JSON.parse(sessionStorage.user).userId;
  const userNickname = JSON.parse(sessionStorage.getItem("user")!).nickname;
  const [visible, setVisible] = useState<boolean>(false);
  // get meme detail info
  const { data, isLoading, status, sendRequest } = useAxios();
  // get auction info
  const { data: auctionData, sendRequest: auctionRequest } = useAxios();

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

  // 경매 등록 상태 (txt)
  const [auctionState, setAuctionState] = useState<string>("");

  // get Meme detail info
  useEffect(() => {
    sendRequest({
      url: `/api/mpoffice/meme/info`,
      params: { memeId: memeid, userId: userId },
    });
  }, []);
  useEffect(() => {
    if (status !== 200) return;
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
  }, [data]);

  // get auction info
  useEffect(() => {
    auctionRequest({url: `/api/auction/search?memeId=${memeid}`})
  }, [])
  // 경매 상태 변경
  useEffect(() => {
    if (!auctionData) {
      return;
    } else if (auctionData.memeStatus === "AUCTIONDOESNOTEXISTS") {
      setAuctionState("경매 예정 없음")
    } else if (auctionData.memeStatus === "AUCTIONPROCEEDING") {
      setAuctionState("경매 입장하기")
      setAuctionPoint(true);  
    } else if (auctionData.memeStatus === "HASENROLLEDAUCTION") {
      const date = new Date(auctionData.startTime)
      setAuctionState(`${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 예정`)
    }
  }, [auctionData])

  // 등록자 / 소유자 profile img get
  const {data: creatorImg, sendRequest: creatorImgRequest} = useAxios();
  const {data: ownerImg, sendRequest: sendImgRequest} = useAxios();
  useEffect(() => {
    if (data && status === 200)  {
      if (!creatorImg) creatorImgRequest({url: `/api/mpoffice/user/profile/image/${data.createrNickname}`})
      if (!ownerImg) sendImgRequest({url: `/api/mpoffice/user/profile/image/${data.ownerNickname}`})
    }
  }, [data])

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

  const modalVisibleHandler = (visible: boolean) => {
    setVisible(visible);
  };

  const profileNavigateHandler = (nickname: string) => {
    navigate(`/profile/${nickname}/tab=nft`);
  };

  const auctionNavigateHandler = () => {
    if (auctionData && auctionData.memeStatus === "AUCTIONPROCEEDING") {
      // auction id 받아서 auction으로 이동시키기
      navigate(`/auction/${auctionData.auctionId}`)
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
                  auctionPoint ? styles.auctionInfoBtn2 : styles.auctionInfoBtn
                }
                onClick={() => auctionNavigateHandler()}
              >
                {auctionState}
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
              <div
                className={styles.ownerName}
                onClick={() => profileNavigateHandler(data.createrNickname)}
              >  
                {creatorImg && <img src={creatorImg.imgUrl} alt=""/>}
                {data.createrNickname}
              </div>
            </div>
            <div className={styles.memeOwner}>
              <div>현재 소유자</div>
              <div
                className={styles.ownerName}
                onClick={() => profileNavigateHandler(data.ownerNickname)}
              > 
                {ownerImg && <img src={ownerImg.imgUrl} alt=""/>}
                {data.ownerNickname}
              </div>
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
                      sellerId: JSON.parse(sessionStorage.getItem("user")!)
                        .userId,
                    })
                  );
                  modalVisibleHandler(true);
                }}
              >
                이 NFT 경매 등록하러 가기
              </div>
            )}
            <UploadModal visible={visible} modalHandler={modalVisibleHandler} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default DetailInfo;
