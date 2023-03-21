import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';

import styles from "./NftCardBack.module.css";

interface NftProps {
    items: {id: number, title: string, imgUrl: string, description: string};
};

const NftCardBack:React.FC<NftProps> = nft => {

    // NFT 제목과 설명, 상세 페이지 url
    const NFT_TEXT = nft.items.title;
    const NFT_DESCRIPTION = nft.items.description;
    const NFT_DETAIL_URL = `/meme-detail/:${nft.items.id}`;

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
            <NavLink to={NFT_DETAIL_URL}>
                <Icon icon="uil:file-search-alt" className={styles.detailBtn}/>
            </NavLink>
        </div>
    );
};

export default NftCardBack;