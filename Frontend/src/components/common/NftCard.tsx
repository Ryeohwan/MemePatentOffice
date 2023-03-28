import React, { useState } from "react";
import NftCardFront from "components/common/NftCardFront";
import NftCardBack from "components/common/NftCardBack";
import styles from "./NftCard.module.css";

interface NftProps {
    items: {id: number, title: string, imgUrl: string, description: string, example: string};
};

const NftCard:React.FC<NftProps> = (nft) => {
    const [flipped, setFlipped] = useState<boolean>(false);             // 카드 클릭 시 뒤집기 애니메이션 주기 위한 useState
    const onClickHandler = (flipped:boolean) => {
        setFlipped(!flipped);
      };

    return (
        <div className={`${styles.nftCardContainer} ${flipped ? `${styles.nftCardFlipped}`: null}` } onClick={() => onClickHandler(flipped)}>
            <div className={styles.nftCardFront}>
                <NftCardFront items={nft.items} />
            </div>
            <div className={styles.nftCardBack}>
                <NftCardBack items={nft.items} />
            </div>
      </div>
    );
};

export default NftCard;