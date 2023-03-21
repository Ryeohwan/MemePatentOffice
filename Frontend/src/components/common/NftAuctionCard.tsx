import React from "react";
import styles from "./NftAuctionCard.module.css";

const NftAuctionCard:React.FC = () => {
    return (
        <div className={styles.auctionCardWrapper}>
            <img src="" alt="" className={styles.auctionImg} />
            <div className={styles.nftTitleText}>!!nft 제목!!</div>
            <div>
                <div>남은 시간</div>
                <div>!!시간!!</div>
            </div>
            <div>
                <div>최고가</div>
                <div>!!가격!!</div>
            </div>
            <div>
                <button>상세 보기</button>
                <button>경매방 입장하기</button>
            </div>

        </div>
    );
}; 

export default NftAuctionCard;