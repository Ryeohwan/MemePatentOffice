import React from "react";
import styles from "./NftCardBack.module.css";

const NftCardBack:React.FC = () => {
    const NFT_TEXT = "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진"
    const NFT_DESCRIPTION = "나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다."
    
    const slicingText = (NFT_TEXT:string) => {
        if (NFT_TEXT.length > 40) {
            return NFT_TEXT.substring(0, 40) + " ...";
        } else {
            return NFT_TEXT;
        }
    }

    return (
        <div className={styles.nftCardBack}>
            <div className={styles.nftCardBackTitle}>
                {slicingText(NFT_TEXT)}
            </div>
            <hr className={styles.hrTag}/>
            <div className={styles.nftCardBackDetail}>
                {NFT_DESCRIPTION}
            </div>
        </div>
    );
};

export default NftCardBack;