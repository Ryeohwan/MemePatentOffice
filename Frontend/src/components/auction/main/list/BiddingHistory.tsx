import React from "react";

import { Sidebar } from "primereact/sidebar";
import styles from "components/auction/main/list/BiddingHistory.module.css";
import BiddingHistoryList from "./BiddingHistoryList";

interface BiddingHistoryProps {
    biddingHistoryInfoVisible: boolean;
    biddingHistoryInfoHandlerFalse: () => void;
}

const BiddingHistory: React.FC<BiddingHistoryProps> = ({
  biddingHistoryInfoVisible,
  biddingHistoryInfoHandlerFalse,
}) => {
  return (
    <Sidebar
        className={styles.sideBar}
        visible={biddingHistoryInfoVisible}
        position="bottom"
        onHide={() => biddingHistoryInfoHandlerFalse()}
      >
        <BiddingHistoryList/>
      </Sidebar>
  );
};

export default BiddingHistory;
