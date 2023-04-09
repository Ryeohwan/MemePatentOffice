// 거래내역 page (/setting/auction-history)
import React from "react";
import { useNavigate } from "react-router-dom";

import { Divider } from "primereact/divider";
import "pages/setting/Setting.css";

const AuctionHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <p className="pageName">거래내역</p>
      <Divider className="divider" />
      <div>
        <div onClick={() => navigate("purchase")} className="router-wrapper">
          <i className="pi pi-download" />
          <p>내가 구매한 NFT</p>
        </div>

        <div onClick={() => navigate("sale")} className="router-wrapper">
          <i className="pi pi-upload" />
          <p>내가 판매한 NFT</p>
        </div>
      </div>
    </div>
  );
};

export default AuctionHistoryPage;
