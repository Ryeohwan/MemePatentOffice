import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';

import styles from "./NftCardBack.module.css";

const NftCardBack:React.FC = () => {

    // NFT 제목과 설명
    const NFT_TEXT = "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다"
    const NFT_DESCRIPTION = "나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. "
    
    // NFT 제목 글자수 슬라이싱
    const sliceTitleText = (NFT_TEXT:string) => {
        if (NFT_TEXT.length > 38) {
            return NFT_TEXT.substring(0, 38) + " ...";
        } else {
            return NFT_TEXT;
        }
    }

    // NFT 설명 글자수 슬라이싱
    const sliceDetailText = (NFT_DESCRIPTION:string) => {
        if (NFT_DESCRIPTION.length > 225) {
            return NFT_DESCRIPTION.substring(0, 225) + " ...";
        } else {
            return NFT_DESCRIPTION;
        }
    }

    return (
        <div className={styles.nftCardBack}>
            <div className={styles.nftCardBackTitle}>
                {sliceTitleText(NFT_TEXT)}
            </div>
            <hr className={styles.hrTag}/>
            <div className={styles.nftCardBackDetail}>
                {sliceDetailText(NFT_DESCRIPTION)}
            </div>
            
            {/* meme-id 받아서 넣기 */}
            <NavLink to="/meme-detail/:1">
                <Icon icon="uil:file-search-alt" className={styles.detailBtn}/>
            </NavLink>
        </div>
    );
};

export default NftCardBack;