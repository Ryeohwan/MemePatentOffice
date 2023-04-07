import React from "react";

import styles from "components/auction/main/list/BiddingHistoryItem.module.css";

interface BiddingHistoryItemProps {
  history: {
    nickname: string;
    price: number;
    time: string;
  };
}

const BiddingHistoryItem: React.FC<BiddingHistoryItemProps> = ({ history }) => {
  return (
    <div className={styles.wraper}>
      <div className={styles.userInfo}>
        <p>{history.nickname}</p>
      </div>
      <div></div>
      <div className={styles.price}>{history.price}</div>
    </div>
  );
};

export default BiddingHistoryItem;
