import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "hooks/useAxios";

import NftChart from "components/meme/detail/NftChart";
import TradeList from "components/meme/detail/TradeList";
import styles from "./ChartTradeComp.module.css";

const ChartTradeComp: React.FC = () => {
  const params = useParams();
  const memeid = parseInt(params.meme_id!, 10);
  const { data: tradeData, sendRequest: getTradeDataRequest } = useAxios();

  useEffect(() => {
    console.log(memeid);
    getTradeDataRequest({
      url: `/api/mpoffice/meme/price?id=${memeid}`,
    });
  }, []);

  return (
    <div className={styles.chartTradeWrapper}>
      {tradeData && (
        <div className={styles.nftChartWrapper}>
          <NftChart tradeData={tradeData} />
        </div>
      )}
      <TradeList tradeData={tradeData} />
    </div>
  );
};

export default ChartTradeComp;
