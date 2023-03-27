import React from "react";
import NftChart from "components/meme/detail/NftChart";
import TradeList from "components/meme/detail/TradeList";
import styles from "./ChartTradeComp.module.css";

const ChartTradeComp: React.FC = () => {


  return (
    <div className={styles.chartTradeWrapper}>
      <div className={styles.nftChartWrapper}>
        <NftChart />
      </div>
      <TradeList />
    </div>
  );
};

export default ChartTradeComp;
