import React, {useEffect} from "react";
import {useLocation} from 'react-router-dom';
import DetailInfo from "components/meme/detail/DetailInfo";
import TabTradeComment from "components/meme/detail/TabTradeComment";

const MemeDetailPage: React.FC = () => {
  const location = useLocation();

  // 내가 작성한 댓글 or 알림에서 들어온 경우 댓글 탭까지 scroll
  useEffect(() => {
    if (location.state && location.state.from === "comment") {
      window.scrollTo(0, 600)
    }
  }, [])

  return (
    <>
      <DetailInfo/>
      <TabTradeComment/>
    </>
  );
};

export default MemeDetailPage;
