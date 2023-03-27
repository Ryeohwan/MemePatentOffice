import React from "react";
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
