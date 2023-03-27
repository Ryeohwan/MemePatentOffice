import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NftAuctionCard.module.css";

interface AuctionProps {
    items: {meme_id: number, auction_id: number, title: string, time: string, highest_bid: number, imgUrl: string};
};

const NftAuctionCard:React.FC<AuctionProps> = nft => {
    const auctionImg = "http://localhost:3000/" + nft.items.imgUrl;
    const auctionMemeTitle = nft.items.title;
    const auctionTime = nft.items.time;
    const highestBid = nft.items.highest_bid;
    const memeDetailUrl = `/meme-detail/${nft.items.meme_id}/tab=trade`;
    const auctionDetailUrl = `/auction/${nft.items.auction_id}`;

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