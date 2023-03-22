import React from "react";
import styles from "./NftCardFront.module.css";
import haku from "assets/haku.png";

interface NftProps {
    items: {id: number, title: string, imgUrl: string, description: string};
};

const NftCardFront:React.FC<NftProps> = nft => {
    // NFT
    const NFT_TEXT = nft.items.title;
    const NFT_imgUrl = "http://localhost:3000/" + nft.items.imgUrl;
    
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
            <img src={NFT_imgUrl} alt="" className={styles.nftImg}/>
            <div className={styles.nftTxtWrapper}>
                <div className={styles.nftTxt}>
                    {slicingText(NFT_TEXT)}
                </div>
            </div>
        </div>
    );
};

export default NftCardFront;