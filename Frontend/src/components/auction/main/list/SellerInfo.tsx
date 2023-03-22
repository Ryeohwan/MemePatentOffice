import React from "react";

import { Sidebar } from "primereact/sidebar";
import styles from "components/auction/main/list/SellerInfo.module.css";

interface SellerInfoProps {
  sellerInfoVisible: boolean;
  sellerInfoHandlerFalse: () => void;
}

const SellerInfo: React.FC<SellerInfoProps> = ({
  sellerInfoVisible,
  sellerInfoHandlerFalse,
}) => {
  return (
    <Sidebar
        className={styles.sideBar}
        visible={sellerInfoVisible}
        position="bottom"
        onHide={() => sellerInfoHandlerFalse()}
      >
      </Sidebar>
  );
};

export default SellerInfo;
