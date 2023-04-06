import React from "react";

import { Sidebar } from "primereact/sidebar";
import styles from "components/auction/main/list/BiddingHistory.module.css";
import BiddingHistoryList from "./BiddingHistoryList";
import { Dialog } from "primereact/dialog";

interface BiddingHistoryProps {
  biddingHistoryInfoVisible: boolean;
  biddingHistoryInfoHandlerFalse: () => void;
}

const BiddingHistory: React.FC<BiddingHistoryProps> = ({
  biddingHistoryInfoVisible,
  biddingHistoryInfoHandlerFalse,
}) => {
  return (
    <Dialog
      appendTo={document.getElementById("auction")}
      className={styles.sideBar}
      headerClassName={styles.header}
      contentClassName={styles.content}
      visible={biddingHistoryInfoVisible}
      // position="bottom"
      onHide={() => biddingHistoryInfoHandlerFalse()}
      draggable={true}
      modal={false}
      closable={false}
      position="top-left"
    >
      <BiddingHistoryList />
    </Dialog>
  );
};

export default BiddingHistory;
