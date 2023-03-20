import React from "react";

import { Dialog } from "primereact/dialog";
import styles from "components/auction/main/list/BiddingHistory.module.css";

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
      className={styles.dialog}
      header="입찰 내역"
      visible={biddingHistoryInfoVisible}
      style={{ width: "50vw" }}
      onHide={() => biddingHistoryInfoHandlerFalse()}
    >
      <div>
        <div>dsfaasdkfkasndfknsdfk</div>
      </div>
    </Dialog>
  );
};

export default BiddingHistory;
