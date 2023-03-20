import React from "react";

import { Dialog } from "primereact/dialog";
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
    <Dialog
      className={styles.dialog}
      header="판매자 정보"
      visible={sellerInfoVisible}
      style={{ width: "50vw" }}
      onHide={() => sellerInfoHandlerFalse()}
    >
      <div>
        <div>dsfaasdkfkasndfknsdfk</div>
      </div>
    </Dialog>
  );
};

export default SellerInfo;
