// home page (/home)
import React, { useState } from "react";
import NftCard from "components/common/NftCard";
import NftCardBack from "components/common/NftCardBack";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const onClickHandler = (click:boolean) => {
    setFlipped(!flipped);
  };

  return (
    <div className={`${styles.nftCardContainer} ${flipped ? `${styles.nftCardFlipped}`: null}` } onClick={() => onClickHandler(flipped)}>
      <div className={styles.nftCardFront}>
        <NftCard />
      </div>
      <div className={styles.nftCardBack}>
        <NftCardBack />
      </div>
    </div>
  );
};

export default HomePage;
