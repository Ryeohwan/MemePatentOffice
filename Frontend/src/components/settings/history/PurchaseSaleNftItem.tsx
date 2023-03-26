import React from "react";
import { useNavigate } from "react-router-dom";

import { Avatar } from "primereact/avatar";
import { myHistoryList } from "store/nftHistory"; // type

import styles from "components/settings/history/PurchaseSaleNftItem.module.css";

interface PurchaseSaleNftItemProps {
  item: myHistoryList;
}

const PurchaseSaleNftItem: React.FC<PurchaseSaleNftItemProps> = ({ item }) => {
  const navigate = useNavigate()
  const clickHandler = () => {
    navigate(`/meme-detail/${item.id}`)
  }
  return (
    <div className={styles.wrapper} onClick={clickHandler}>
      <Avatar image={item.imgSrc} className={styles.avatar} />
      <div className={styles.textWrapper}>
        <p className={styles.memetitle}>{item.title}</p>
        <p>판매자: {item.seller}</p>
        <p>가격: {item.price} SSF</p>
      </div>
    </div>
  );
};

export default PurchaseSaleNftItem;
