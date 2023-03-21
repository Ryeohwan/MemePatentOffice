import React from "react";
import styles from "./NftCard.module.css";
import totoro from "assets/totoro.jpg";
import haku from "assets/haku.png";

const NftCard:React.FC = () => {
    // NFT 제목
    const NFT_TEXT = "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다아~~~~~"
    // NFT 제목 글자수 슬라이싱
    const slicingText = (NFT_TEXT:string) => {
        if (NFT_TEXT.length > 38) {
            return NFT_TEXT.substring(0, 38) + " ...";
        } else {
            return NFT_TEXT;
        }
    }

    return (
        <div className={styles.nftCardWrapper} >
            <div className={styles.nftOwner}>
                <img src={haku} alt="" className={styles.nftOwnerImg}/>
                <div className={styles.nftOwnerName}>단발머리 부엉이</div>
            </div>                                                                                  
            <img src={totoro} alt="" className={styles.nftImg}/>
            <div className={styles.nftTxtWrapper}>
                <div className={styles.nftTxt}>
                    {slicingText(NFT_TEXT)}
                </div>
            </div>
        </div>
    );
};

export default NftCard;