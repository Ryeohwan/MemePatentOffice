import React from "react";
import styles from "./MemeDetailPage.module.css";
import NftChart from "components/meme/detail/NftChart";
import TransactionList from "components/meme/detail/TradeList";
import DetailInfo from "components/meme/detail/DetailInfo";
import TabTradeComment from "components/meme/detail/TabTradeComment";

const MemeDetailPage: React.FC = () => {

  return (
    <>
      <DetailInfo/>
      <TabTradeComment/>
    </>
  );
};

export default MemeDetailPage;
