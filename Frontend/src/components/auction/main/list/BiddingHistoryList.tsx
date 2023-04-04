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
    (state) => state.auction.biddingHistory
  );

  return (
    <section className={styles.wraper}>
      <header className={styles.container}>
        <p/>
        <p>입찰자</p>
        <p/>
        <p>
          금액 <span>(SSF)</span>
        </p>
        <p className={styles.time}>입찰 시간</p>
      </header>
      <Divider />
        {biddingHistory.map((history, index) => {
          return <BiddingHistoryItem key={index} history={history} />;
        })}
    </section>
  );
};

export default BiddingHistoryList;
