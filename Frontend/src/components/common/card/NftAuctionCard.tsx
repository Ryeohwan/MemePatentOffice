import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { auctionCardType } from "store/auction";
import styles from "./NftAuctionCard.module.css";

interface AuctionProps {
  items: auctionCardType;
}

const getRemainTime = (targetTime: number) => {
  const date = Math.floor(+new Date() / 1000);
  let diff;
  if (targetTime < date) {
    diff = 0;
  } else {
    diff = targetTime - date;
  }
  return diff;
};

const formatTime = (time: number) => {
  const remainTime = new Date(0);
  if (time > 0) remainTime.setSeconds(time);
  const hours = remainTime.getUTCHours().toString().padStart(2, "0");
  const minutes = remainTime.getUTCMinutes().toString().padStart(2, "0");
  const seconds = remainTime.getUTCSeconds().toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const NftAuctionCard: React.FC<AuctionProps> = (nft) => {
  const navigate = useNavigate();
  const auctionImg = nft.items.imgUrl;
  const auctionMemeTitle = nft.items.title;
  const targetTime = Math.floor(+new Date(nft.items.finishTime) / 1000);
  const [auctionTime, setAuctionTime] = useState<number>(
    getRemainTime(targetTime)
  );
  const highestBid = nft.items.highestBid;
  const memeDetailUrl = `/meme-detail/${nft.items.memeId}/tab=trade`;
  const auctionDetailUrl = `/auction/${nft.items.auctionId}`;

  // NFT 제목 글자수 슬라이싱
  const slicingText = (NFT_TEXT: string) => {
    if (NFT_TEXT.length > 38) {
      return NFT_TEXT.substring(0, 38) + " ...";
    } else {
      return NFT_TEXT;
    }
  };

  // 경매방 입장하기
  const enterHandler = () => {
    if (auctionTime > 0) {
      navigate(`/auction/${nft.items.auctionId}`);
    } else {
      alert("입장하실 수 없는 방입니다.");
    }
  };

  // 남은 시간 재렌더링
  useEffect(() => {
    const interval = setInterval(() => {
      setAuctionTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.auctionCardWrapper}>
      <img src={auctionImg} alt="" className={styles.auctionImg} />
      <div className={styles.nftTitleText}>{slicingText(auctionMemeTitle)}</div>
      <div>
        <div className={styles.auctionTimeTxt}>남은 시간</div>
        <div className={`${styles.auctionTime} ${auctionTime < 60 ? styles.pointTime : ""}`}>{formatTime(auctionTime)}</div>
      </div>
      <div>
        <div className={styles.auctionBidTxt}>최고가</div>
        <div className={styles.auctionBid}>{highestBid} SSF</div>
      </div>
      <div className={styles.btnWrapper}>
        <NavLink to={memeDetailUrl} className={styles.navLink}>
          <div className={styles.nftDetailBtn}>상세 보기</div>
        </NavLink>
        {/* <NavLink to={auctionDetailUrl} className={styles.navLink}>
            <div className={styles.auctionDetailBtn}>경매방 입장하기</div>
        </NavLink> */}
        <div className={styles.navLink} onClick={enterHandler}>
          <div className={styles.auctionDetailBtn}>경매방 입장하기</div>
        </div>
      </div>
    </div>
  );
};

export default NftAuctionCard;
