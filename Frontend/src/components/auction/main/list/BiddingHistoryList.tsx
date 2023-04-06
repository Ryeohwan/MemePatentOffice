import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import BiddingHistoryItem from "./BiddingHistoryItem";

import { Divider } from "primereact/divider";

import styles from "components/auction/main/list/BiddingHistoryList.module.css";

type biddingHistory = {
  nickname: string;
  price: number;
  time: string;
};

const BiddingHistoryList: React.FC = () => {
  const biddingHistory = useSelector<RootState, biddingHistory[]>(
    (state) => state.auction.auctionInfo.biddingHistory
  );

  return (
    <>
      <section className={styles.wraper}>
        <header className={styles.container}>
          <p>입찰자</p>
          <p>(SSF)</p>
        </header>
        <Divider className={styles.divider} />
      </section>
      <div className={styles.historyWraper}>
        {biddingHistory.map((history, index) => {
          return <BiddingHistoryItem key={index} history={history} />;
        })}
      </div>
    </>
  );
};

export default BiddingHistoryList;
