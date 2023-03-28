import React from "react";

import { Sidebar } from "primereact/sidebar";
import styles from "components/auction/main/list/SellerInfo.module.css";
import ProfilePage from "pages/ProfilePage";
import { Routes, Route } from "react-router";
import { Dialog } from "primereact/dialog";

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
      appendTo={document.getElementById("auction")}
      className={styles.sideBar}
      visible={sellerInfoVisible}
      position="bottom"
      onHide={() => sellerInfoHandlerFalse()}
      modal={false}
    >
      <Routes>
        <Route path=":nickname/*" element={<ProfilePage />} />
      </Routes>
    </Sidebar>
  );
};

export default SellerInfo;
