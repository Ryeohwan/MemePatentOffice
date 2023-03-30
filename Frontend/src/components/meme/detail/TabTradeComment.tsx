import React from "react";
import TabComp from "components/common/tab/TabComp";
import { Route } from "react-router-dom";
import styles from "./TabTradeComment.module.css";
import ChartTradeComp from "./ChartTradeComp";
import CommentTab from "../comment/CommentTab";


const TabTradeComment:React.FC = () => {

    const MEME_ID = 1;

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