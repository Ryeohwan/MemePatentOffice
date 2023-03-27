import React from "react";
import NftChart from "components/meme/detail/NftChart";
import TransactionList from "components/meme/detail/TradeList";
import DetailInfo from "components/meme/detail/DetailInfo";
import styles from "./ChartTradeComp.module.css";

const ChartTradeComp: React.FC = () => {


  return (
    <div className={styles.chartTradeWrapper}>
      <div className={styles.nftChartWrapper}>
        <NftChart />
      </div>
      <TransactionList />
    </div>
  );
};

export default ChartTradeComp;
