import React from "react";
import { NavLink } from "react-router-dom";
import { auctionType } from "store/auctionList";
import styles from "./NftAuctionCard.module.css";

interface AuctionProps {
    items: auctionType;
};

const getRemainTime = (targetTime: number) => {
  const date = Math.floor(+new Date() / 1000);
  let diff;
  if (targetTime < date) {
    diff = 0;
  } else {
    diff = targetTime - date;
  }
  const remainTime = new Date(0);
  remainTime.setSeconds(diff);

  const hours = remainTime.getUTCHours().toString().padStart(2, "0");
  const minutes = remainTime.getUTCMinutes().toString().padStart(2, "0");
  const seconds = remainTime.getUTCSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const NftAuctionCard:React.FC<AuctionProps> = nft => {
    const auctionImg = nft.items.imgUrl;
    const auctionMemeTitle = nft.items.title;
    const targetTime = Math.floor(+new Date(nft.items.finishTime) / 1000);
    const auctionTime = getRemainTime(targetTime);
    const highestBid = nft.items.highestBid;
    const memeDetailUrl = `/meme-detail/${nft.items.memeId}/tab=trade`;
    const auctionDetailUrl = `/auction/${nft.items.auctionId}`;

    // NFT 제목 글자수 슬라이싱
    const slicingText = (NFT_TEXT:string) => {
        if (NFT_TEXT.length > 38) {
            return NFT_TEXT.substring(0, 38) + " ...";
        } else {
            return NFT_TEXT;  
        }
    };
    
    return (
        <div className={styles.auctionCardWrapper}>
            <img src={auctionImg} alt="" className={styles.auctionImg} />
            <div className={styles.nftTitleText}>{slicingText(auctionMemeTitle)}</div>
            <div>
                <div className={styles.auctionTimeTxt}>남은 시간</div>
                <div className={styles.auctionTime}>{auctionTime}</div>
            </div>
            <div>
                <div className={styles.auctionBidTxt}>최고가</div>
                <div className={styles.auctionBid}>{highestBid} SSF</div>
            </div>
            <div className={styles.btnWrapper}>
                <NavLink to={memeDetailUrl} className={styles.navLink}>
                    <div className={styles.nftDetailBtn}>상세 보기</div>
                </NavLink>
                <NavLink to={auctionDetailUrl} className={styles.navLink}>
                    <div className={styles.auctionDetailBtn}>경매방 입장하기</div>
                </NavLink>
            </div>

        </div>
    );
}; 

export default NftAuctionCard;