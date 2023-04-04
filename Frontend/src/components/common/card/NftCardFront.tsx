import React from "react";
import {memeType} from 'store/memeList';
import styles from "./NftCardFront.module.css";

interface NftProps {
  items: memeType;
}

const NftCardFront: React.FC<NftProps> = (nft) => {
  // NFT
  const NFT_TEXT = nft.items.title;
  const NFT_imgUrl = nft.items.imgUrl;

  // NFT 제목 글자수 슬라이싱
  const slicingText = (NFT_TEXT: string) => {
    if (NFT_TEXT.length > 38) {
      return NFT_TEXT.substring(0, 38) + " ...";
    } else {
      return NFT_TEXT;
    }
  };

  return (
    <div className={styles.nftCardWrapper}>
      <div className={styles.nftOwner}>
        <img src={nft.items.userImg} alt="" className={styles.nftOwnerImg} />
        <div className={styles.nftOwnerName}>{nft.items.nickname}</div>
      </div>
      <img src={NFT_imgUrl} alt="" className={styles.nftImg} />
      <div className={styles.nftTxtWrapper}>
        <div className={styles.nftTxt}>{slicingText(NFT_TEXT)}</div>
      </div>
    </div>
  );
};

export default NftCardFront;
