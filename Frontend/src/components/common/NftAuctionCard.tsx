import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NftAuctionCard.module.css";

interface AuctionProps {
    items: {meme_id: number, auction_id: number, title: string, time: string, highest_bid: number, imgUrl: string};
};

const NftAuctionCard:React.FC<AuctionProps> = nft => {
    const AUCTION_IMG = "http://localhost:3000/" + nft.items.imgUrl;
    const AUCTION_MEME = nft.items.title;
    const AUCTION_TIME = nft.items.time;
    const HIGHEST_BID = nft.items.highest_bid;
    const MEME_DETAIL_URL = `/meme-detail/:${nft.items.meme_id}`;
    const AUCTION_DETAIL_URL = `/auction/:${nft.items.auction_id}`;

    return (
        <div className={styles.auctionCardWrapper}>
            <img src={AUCTION_IMG} alt="" className={styles.auctionImg} />
            <div className={styles.nftTitleText}>{AUCTION_MEME}</div>
            <div>
                <div>남은 시간</div>
                <div>{AUCTION_TIME}</div>
            </div>
            <div>
                <div>최고가</div>
                <div>{HIGHEST_BID}</div>
            </div>
            <div>
                <NavLink to={MEME_DETAIL_URL}>
                    <button>상세 보기</button>
                </NavLink>
                <NavLink to={AUCTION_DETAIL_URL}>
                    <button>경매방 입장하기</button>
                </NavLink>
            </div>

        </div>
    );
}; 

export default NftAuctionCard;