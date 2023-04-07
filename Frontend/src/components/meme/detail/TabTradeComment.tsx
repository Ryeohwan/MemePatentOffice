import React from "react";
import { Route, useParams } from "react-router-dom";
import TabComp from "components/common/tab/TabComp";
import ChartTradeComp from "./ChartTradeComp";
import CommentTab from "../comment/CommentTab";
import styles from "./TabTradeComment.module.css";


const TabTradeComment:React.FC = () => {
  const params = useParams();
  const MEME_ID = params.meme_id;

    const tabItems = [
        { name: "거래", path: `/meme-detail/${MEME_ID}/tab=trade` },    
        { name: "댓글", path: `/meme-detail/${MEME_ID}/tab=comment` },    
      ];
    
      return (
        <div className={styles.tabContainer}>
          <TabComp items={tabItems}>
            <Route path="/tab=trade" element={<ChartTradeComp/>} />             
            <Route path="/tab=comment" element={<CommentTab />} />
          </TabComp>
        </div>
      );
};

export default TabTradeComment;